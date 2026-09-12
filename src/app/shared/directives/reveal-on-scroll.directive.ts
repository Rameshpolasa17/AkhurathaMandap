import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';

/** Direction the element travels from as it reveals. */
export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'fade';

/**
 * Reveals an element as it scrolls into view: adds `.akm-reveal` (plus a
 * variant class) on init, then `.is-visible` once it intersects. The motion
 * itself is defined in `styles.scss`.
 *
 * Usage:
 *   <div akmReveal>                        fade + rise (default)
 *   <div akmReveal="left" [revealDelay]="120">
 *   <div akmReveal="scale">
 *
 * Content must never be stranded invisible, so there are three safeguards:
 * without IntersectionObserver it shows immediately; anything already in view
 * is revealed by the observer's first callback; and if no callback has arrived
 * at all within `FAILSAFE_MS` the element is shown regardless. That last one
 * matters because a browser that is not producing rendering opportunities
 * (a throttled background tab, for instance) never runs intersection
 * observations — the animation is a nicety, the content is not.
 */
const FAILSAFE_MS = 1200;
@Directive({
  selector: '[akmReveal]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  /** Direction to travel from. Bound to the selector: `akmReveal="left"`. */
  @Input('akmReveal') variant: RevealVariant | '' = '';

  /** Stagger in milliseconds, for lists of cards. */
  @Input() revealDelay = 0;

  private host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private failsafe?: ReturnType<typeof setTimeout>;
  /** Set once the observer has reported at least once. */
  private observed = false;

  ngOnInit(): void {
    const el = this.host.nativeElement;
    el.classList.add('akm-reveal');

    if (this.variant && this.variant !== 'up') {
      el.classList.add(`akm-reveal--${this.variant}`);
    }

    if (this.revealDelay > 0) {
      el.style.transitionDelay = `${this.revealDelay}ms`;
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        this.observed = true;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.reveal();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    );

    this.observer.observe(el);

    // If observations are never delivered, show the content anyway.
    this.failsafe = setTimeout(() => {
      if (!this.observed) {
        this.reveal();
      }
    }, FAILSAFE_MS);
  }

  private reveal(): void {
    this.host.nativeElement.classList.add('is-visible');
    this.cleanUp();
  }

  private cleanUp(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    if (this.failsafe) {
      clearTimeout(this.failsafe);
      this.failsafe = undefined;
    }
  }

  ngOnDestroy(): void {
    this.cleanUp();
  }
}
