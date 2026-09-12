import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_CONFIG } from '@core/config/app.config';
import { FestivalStat, Milestone } from '@core/models/content';
import { ContentService } from '@core/services/content.service';
import { PeopleService } from '@core/services/people.service';
import { PageHero } from '@shared/components/page-hero/page-hero';
import { PeopleGrid, PersonCard } from '@shared/components/people-grid/people-grid';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, PageHero, PeopleGrid, RevealOnScrollDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  private contentService = inject(ContentService);
  private peopleService = inject(PeopleService);
  private cdr = inject(ChangeDetectorRef);

  readonly mandapName = APP_CONFIG.mandapName;

  stats: FestivalStat[] = [];
  milestones: Milestone[] = [];
  committee: PersonCard[] = [];

  readonly pillars = [
    {
      icon: 'fa-solid fa-om',
      title: 'Devotion',
      text: 'Three aartis a day, performed the same way they have been for decades.',
    },
    {
      icon: 'fa-solid fa-people-roof',
      title: 'Community',
      text: 'A festival organised by the neighbourhood, for the neighbourhood.',
    },
    {
      icon: 'fa-solid fa-utensils',
      title: 'Seva',
      text: 'Mahaprasad for every visitor, cooked and served by volunteers.',
    },
    {
      icon: 'fa-solid fa-masks-theater',
      title: 'Culture',
      text: 'A stage for local artists, children and anyone who wants to take part.',
    },
  ];

  ngOnInit(): void {
    this.contentService.getStats().subscribe((stats) => {
      this.stats = stats;
      this.cdr.detectChanges();
    });

    this.contentService.getMilestones().subscribe((milestones) => {
      // The About page shows a short version; /history has the full timeline.
      this.milestones = milestones.slice(0, 3);
      this.cdr.detectChanges();
    });

    this.peopleService.getCommittee().subscribe((members) => {
      this.committee = members.slice(0, 4).map((m) => ({
        id: m.memberId,
        name: m.name,
        role: m.designation,
        imageUrl: m.imageUrl,
        description: m.description,
      }));
      this.cdr.detectChanges();
    });
  }
}
