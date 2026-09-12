import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_CONFIG } from '@core/config/app.config';

interface CountdownUnit {
  value: string;
  label: string;
}

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.scss',
})
export class HeroBanner implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  readonly mandapName = APP_CONFIG.mandapName;
  readonly festivalName = APP_CONFIG.festivalName;

  /** Shown in place of the countdown once the timer reaches zero. */
  readonly rajaTitle = APP_CONFIG.rajaTitle;

  private readonly targetDate = new Date(APP_CONFIG.festivalStartDate);

  /** Year shown on the badge, derived from the configured start date. */
  readonly festivalYear = this.targetDate.getFullYear();

  /** False once the festival has started — the countdown is then hidden. */
  hasCountdown = true;

  units: CountdownUnit[] = [
    { value: '00', label: 'Days' },
    { value: '00', label: 'Hours' },
    { value: '00', label: 'Minutes' },
    { value: '00', label: 'Seconds' },
  ];

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : String(value);
  }

  private tick(): void {
    const distance = this.targetDate.getTime() - Date.now();

    if (Number.isNaN(distance) || distance <= 0) {
      this.hasCountdown = false;
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.cdr.markForCheck();
      return;
    }

    const day = 1000 * 60 * 60 * 24;

    this.units = [
      { value: this.pad(Math.floor(distance / day)), label: 'Days' },
      { value: this.pad(Math.floor((distance % day) / (1000 * 60 * 60))), label: 'Hours' },
      { value: this.pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))), label: 'Minutes' },
      { value: this.pad(Math.floor((distance % (1000 * 60)) / 1000)), label: 'Seconds' },
    ];

    this.cdr.detectChanges();
  }
}
