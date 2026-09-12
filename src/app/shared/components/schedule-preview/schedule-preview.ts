import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ScheduleDay } from '@core/models/schedule';
import { ScheduleService } from '@core/services/schedule.service';
import { DAILY_HARATHI } from '@core/mock-data/schedule.mock';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/** Home-page snapshot of the first few festival days. */
@Component({
  selector: 'app-schedule-preview',
  standalone: true,
  imports: [DatePipe, RouterLink, RevealOnScrollDirective],
  templateUrl: './schedule-preview.html',
  styleUrl: './schedule-preview.scss',
})
export class SchedulePreview implements OnInit {
  private scheduleService = inject(ScheduleService);
  private cdr = inject(ChangeDetectorRef);

  days: ScheduleDay[] = [];

  readonly dailyHarathi = DAILY_HARATHI;

  ngOnInit(): void {
    this.scheduleService.getPreview(4).subscribe({
      next: (days) => {
        this.days = days;
        this.cdr.detectChanges();
      },
    });
  }
}
