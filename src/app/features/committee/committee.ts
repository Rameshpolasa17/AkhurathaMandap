import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PeopleService } from '@core/services/people.service';
import { PageHero } from '@shared/components/page-hero/page-hero';
import { PeopleGrid, PersonCard } from '@shared/components/people-grid/people-grid';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-committee-page',
  standalone: true,
  imports: [RouterLink, PageHero, PeopleGrid, RevealOnScrollDirective],
  templateUrl: './committee.html',
  styleUrl: './committee.scss',
})
export class CommitteePage implements OnInit {
  private peopleService = inject(PeopleService);
  private cdr = inject(ChangeDetectorRef);

  people: PersonCard[] = [];

  ngOnInit(): void {
    this.peopleService.getCommittee().subscribe({
      next: (members) => {
        this.people = members.map((m) => ({
          id: m.memberId,
          name: m.name,
          role: m.designation,
          imageUrl: m.imageUrl,
          description: m.description,
        }));
        this.cdr.detectChanges();
      },
    });
  }
}
