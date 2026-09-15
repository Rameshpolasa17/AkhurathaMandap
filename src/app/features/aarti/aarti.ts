import { Component, OnInit, inject, signal } from '@angular/core';

import { Aarti } from '@core/models/aarti';
import { ContentService } from '@core/services/content.service';
import { PageHero } from '@shared/components/page-hero/page-hero';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

export type ScriptMode = 'both' | 'telugu' | 'english';

const SCRIPT_KEY = 'akm-aarti-script';
const SIZE_KEY = 'akm-aarti-size';
const SIZES = [1, 1.18, 1.36];

/**
 * Aarti & Mantras — lyrics devotees can follow on their phone at the mandap.
 * The chosen script and text size are remembered on the device.
 */
@Component({
  selector: 'app-aarti',
  standalone: true,
  imports: [PageHero, RevealOnScrollDirective],
  templateUrl: './aarti.html',
  styleUrl: './aarti.scss',
})
export class AartiPage implements OnInit {
  private contentService = inject(ContentService);

  readonly aartis = signal<Aarti[]>([]);
  readonly script = signal<ScriptMode>(this.read(SCRIPT_KEY, ['both', 'telugu', 'english'], 'both'));
  readonly sizeStep = signal<number>(Number(this.read(SIZE_KEY, ['0', '1', '2'], '0')));

  readonly scripts: { value: ScriptMode; label: string }[] = [
    { value: 'both', label: 'Both' },
    { value: 'telugu', label: 'తెలుగు' },
    { value: 'english', label: 'English' },
  ];

  ngOnInit(): void {
    this.contentService.getAartis().subscribe((list) => this.aartis.set(list));
  }

  get fontScale(): number {
    return SIZES[this.sizeStep()];
  }

  setScript(mode: ScriptMode): void {
    this.script.set(mode);
    this.write(SCRIPT_KEY, mode);
  }

  changeSize(delta: number): void {
    const next = Math.min(SIZES.length - 1, Math.max(0, this.sizeStep() + delta));
    this.sizeStep.set(next);
    this.write(SIZE_KEY, String(next));
  }

  jumpTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private read<T extends string>(key: string, allowed: string[], fallback: T): T {
    try {
      const value = localStorage.getItem(key);
      return (value && allowed.includes(value) ? value : fallback) as T;
    } catch {
      return fallback;
    }
  }

  private write(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable — the choice just isn't remembered */
    }
  }
}
