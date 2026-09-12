import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PeopleService } from '@core/services/people.service';
import { PageHero } from '@shared/components/page-hero/page-hero';
import { PeopleGrid, PersonCard } from '@shared/components/people-grid/people-grid';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  imports: [RouterLink, PageHero, PeopleGrid, RevealOnScrollDirective],
  templateUrl: './volunteers.html',
  styleUrl: './volunteers.scss',
})
export class Volunteers implements OnInit {
  private peopleService = inject(PeopleService);
  private cdr = inject(ChangeDetectorRef);

  people: PersonCard[] = [];

  ngOnInit(): void {
    this.peopleService.getVolunteers().subscribe({
      next: (volunteers) => {
        this.people = volunteers.map((v) => ({
          id: v.volunteerId,
          name: v.name,
          role: v.role,
          imageUrl: v.imageUrl,
          description: v.description,
        }));
        this.cdr.detectChanges();
      },
    });
  }
}
