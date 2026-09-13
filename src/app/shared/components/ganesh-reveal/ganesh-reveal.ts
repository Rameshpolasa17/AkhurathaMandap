import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  inject,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_CONFIG, GANESH_REVEAL, GaneshRevealConfig } from '@core/config/app.config';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/** What the section is showing right now. */
export type RevealPhase = 'off' | 'teaser' | 'revealed';

/** Absolute instants (epoch ms) that bound each phase. */
export interface RevealTimeline {
  /** 00:00 IST on the reveal day — the teaser starts here. */
  dayStart: number;
  /** The reveal moment itself. */
  reveal: number;
  /** The first millisecond after `showUntilDate` ends in India. */
  end: number;
}

/** India Standard Time. Fixed all year — India observes no daylight saving. */
const IST_OFFSET = '+05:30';
const IST_ZONE = 'Asia/Kolkata';

/** Warm the image cache this long before the reveal, so it paints instantly. */
const WARM_UP_MS = 15 * 60 * 1000;
/** setTimeout overflows above this (~24.8 days); longer waits re-sync later. */
const MAX_TIMER_MS = 2_147_483_647;
/** Play the reveal anyway if the observer never reports (throttled tab). */
const PLAY_FAILSAFE_MS = 1200;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Builds the phase boundaries from the config, anchored to India time. */
export function revealTimeline(config: GaneshRevealConfig): RevealTimeline {
  const at = (date: string, time: string) => Date.parse(`${date}T${time}:00${IST_OFFSET}`);
  return {
    dayStart: at(config.revealDate, '00:00'),
    reveal: at(config.revealDate, config.revealTime),
    end: at(config.showUntilDate, '00:00') + DAY_MS,
  };
}

/** The phase for a given instant. An unparseable config shows nothing. */
export function revealPhaseAt(now: number, t: RevealTimeline): RevealPhase {
  if ([t.dayStart, t.reveal, t.end].some(Number.isNaN)) return 'off';
  if (now < t.dayStart) return 'off';
  if (now < t.reveal) return 'teaser';
  if (now < t.end) return 'revealed';
  return 'off';
}

interface CountdownUnit {
  value: string;
  label: string;
}

/**
 * The 6 PM Ganesh Darshan reveal on the home page.
 *
 * On the reveal day it shows a veiled teaser with a live countdown, then swaps
 * itself for the darshan at the exact moment — one timer aimed at the reveal
 * instant does the switch; a once-a-second tick only drives the digits. All the
 * motion is CSS, started once the section is actually on screen.
 */
@Component({
  selector: 'app-ganesh-reveal',
  standalone: true,
  imports: [RouterLink, SafeImage, RevealOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ganesh-reveal.html',
  styleUrl: './ganesh-reveal.scss',
})
export class GaneshReveal implements OnDestroy {
  private doc = inject(DOCUMENT);

  readonly image = GANESH_REVEAL.image;
  readonly festivalName = APP_CONFIG.festivalName;
  readonly rajaTitle = APP_CONFIG.rajaTitle;
  readonly festivalYear = GANESH_REVEAL.revealDate.slice(0, 4);

  /** The frame never renders wider than 440 CSS px. */
  readonly imageSizes = '(max-width: 488px) calc(100vw - 48px), 440px';

  /** Fixed particle count — positions and timings live in the stylesheet. */
  readonly particles = Array.from({ length: 14 }, (_, i) => i);

  private readonly timeline = revealTimeline(GANESH_REVEAL);

  private readonly now = signal(Date.now());

  readonly phase = computed<RevealPhase>(() =>
    GANESH_REVEAL.enabled ? revealPhaseAt(this.now(), this.timeline) : 'off',
  );

  /** Hours / minutes / seconds left. Rounded up so 00:00:00 means "now". */
  readonly countdown = computed<CountdownUnit[]>(() => {
    const total = Math.max(0, Math.ceil((this.timeline.reveal - this.now()) / 1000));
    const pad = (n: number) => String(n).padStart(2, '0');
    return [
      { value: pad(Math.floor(total / 3600)), label: 'Hours' },
      { value: pad(Math.floor((total % 3600) / 60)), label: 'Minutes' },
      { value: pad(total % 60), label: 'Seconds' },
    ];
  });

  /** A spoken form of the countdown for assistive technology. */
  readonly countdownLabel = computed(() => {
    const [h, m, s] = this.countdown();
    return `Darshan begins in ${+h.value} hours, ${+m.value} minutes and ${+s.value} seconds`;
  });

  /** e.g. "6:00 PM" — formatted in India time, from the config. */
  readonly revealTimeLabel = this.formatTime(IST_ZONE);

  /** The same moment on the visitor's clock, only when their zone differs. */
  readonly localTimeLabel = this.isVisitorInIst() ? '' : this.formatTime(undefined);

  /** Becomes true once the revealed section scrolls into view. */
  readonly playing = signal(false);

  /** Announced to screen readers when the darshan opens while they watch. */
  readonly announcement = signal('');

  private readonly revealStage = viewChild<ElementRef<HTMLElement>>('revealStage');

  private tickTimer?: ReturnType<typeof setTimeout>;
  private boundaryTimer?: ReturnType<typeof setTimeout>;
  private warmedUp = false;

  private readonly onVisibility = () => {
    if (this.doc.visibilityState === 'visible') this.sync();
  };

  constructor() {
    this.sync();
    this.doc.addEventListener('visibilitychange', this.onVisibility);

    // Start the reveal animation when the section is actually on screen.
    effect((onCleanup) => {
      const el = this.revealStage()?.nativeElement;
      if (!el || untracked(this.playing)) return;

      if (typeof IntersectionObserver === 'undefined') {
        this.playing.set(true);
        return;
      }

      let observed = false;
      const observer = new IntersectionObserver(
        (entries) => {
          observed = true;
          if (entries.some((e) => e.isIntersecting)) {
            this.playing.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(el);

      const failsafe = setTimeout(() => {
        if (!observed) this.playing.set(true);
      }, PLAY_FAILSAFE_MS);

      onCleanup(() => {
        observer.disconnect();
        clearTimeout(failsafe);
      });
    });

    // Fetch the photo shortly before the reveal so it is ready at the moment.
    effect(() => {
      const phase = this.phase();
      const left = this.timeline.reveal - this.now();
      if (phase === 'teaser' && left <= WARM_UP_MS) this.warmUpImage();
    });
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.doc.removeEventListener('visibilitychange', this.onVisibility);
  }

  /** Re-reads the clock and arms exactly the timers the current phase needs. */
  private sync = (): void => {
    const before = untracked(this.phase);
    const now = Date.now();
    this.now.set(now);
    this.clearTimers();

    const phase = untracked(this.phase);
    if (before === 'teaser' && phase === 'revealed') {
      this.announcement.set('Ganesh Darshan is now open. Ganpati Bappa Morya.');
    }

    if (phase === 'teaser') {
      // Tick on whole seconds of the remaining time so the digits land on
      // 00:00:00 together with the switch.
      const remainder = (this.timeline.reveal - now) % 1000 || 1000;
      this.tickTimer = setTimeout(this.sync, remainder);
    }

    const next = [this.timeline.dayStart, this.timeline.reveal, this.timeline.end].find(
      (t) => t > now,
    );
    if (next !== undefined) {
      this.boundaryTimer = setTimeout(this.sync, Math.min(next - now, MAX_TIMER_MS));
    }
  };

  private clearTimers(): void {
    clearTimeout(this.tickTimer);
    clearTimeout(this.boundaryTimer);
  }

  private warmUpImage(): void {
    if (this.warmedUp || typeof Image === 'undefined') return;
    this.warmedUp = true;
    const img = new Image();
    img.decoding = 'async';
    if (this.image.srcset) {
      img.sizes = this.imageSizes;
      img.srcset = this.image.srcset;
    }
    img.src = this.image.src;
  }

  private formatTime(timeZone: string | undefined): string {
    const at = this.timeline.reveal;
    if (Number.isNaN(at)) return '';
    return new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone })
      .format(at)
      .toUpperCase();
  }

  private isVisitorInIst(): boolean {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (zone === IST_ZONE || zone === 'Asia/Calcutta') return true;
    } catch {
      /* fall through to the offset check */
    }
    return new Date(this.timeline.reveal).getTimezoneOffset() === -330;
  }
}
