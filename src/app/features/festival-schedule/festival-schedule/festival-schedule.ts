import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ScheduleDay } from '@core/models/schedule';
import { ScheduleService } from '@core/services/schedule.service';
import { DAILY_HARATHI } from '@core/mock-data/schedule.mock';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-festival-schedule',
  standalone: true,
  imports: [DatePipe, RouterLink, RevealOnScrollDirective],
  templateUrl: './festival-schedule.html',
  styleUrl: './festival-schedule.scss',
})
export class FestivalSchedule implements OnInit {
  private scheduleService = inject(ScheduleService);
  private cdr = inject(ChangeDetectorRef);

  days: ScheduleDay[] = [];
  readonly loading = signal(true);

  /** Ganga Harathi, shown as a standing daily reference above the timeline. */
  readonly dailyHarathi = DAILY_HARATHI;

  ngOnInit(): void {
    this.scheduleService.getAll().subscribe({
      next: (days) => {
        this.days = days;
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading.set(false);
        this.cdr.detectChanges();
      },
    });
  }
}
