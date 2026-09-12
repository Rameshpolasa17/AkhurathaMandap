import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FestivalStat, Milestone } from '@core/models/content';
import { ContentService } from '@core/services/content.service';
import { PageHero } from '@shared/components/page-hero/page-hero';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterLink, PageHero, RevealOnScrollDirective],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History implements OnInit {
  private contentService = inject(ContentService);
  private cdr = inject(ChangeDetectorRef);

  milestones: Milestone[] = [];
  stats: FestivalStat[] = [];

  ngOnInit(): void {
    this.contentService.getMilestones().subscribe((milestones) => {
      this.milestones = milestones;
      this.cdr.detectChanges();
    });

    this.contentService.getStats().subscribe((stats) => {
      this.stats = stats;
      this.cdr.detectChanges();
    });
  }
}
