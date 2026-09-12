import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Competition } from '@core/models/competition';
import { CompetitionService } from '@core/services/competition.service';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * Home-page competitions teaser. Registration lives on the Competitions page,
 * so the only action here is the link through to it.
 */
@Component({
  selector: 'app-competitions-preview',
  standalone: true,
  imports: [DatePipe, RouterLink, SafeImage, RevealOnScrollDirective],
  templateUrl: './competitions-preview.html',
  styleUrl: './competitions-preview.scss',
})
export class CompetitionsPreview implements OnInit {
  private competitionService = inject(CompetitionService);
  private cdr = inject(ChangeDetectorRef);

  competitions: Competition[] = [];

  ngOnInit(): void {
    this.competitionService.getAll().subscribe({
      next: (list) => {
        this.competitions = list.slice(0, 4);
        this.cdr.detectChanges();
      },
    });
  }
}
