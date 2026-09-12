import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Competition } from '@core/models/competition';
import { CompetitionService } from '@core/services/competition.service';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RegistrationDialog } from '@shared/components/registration-dialog/registration-dialog';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

const ALL = 'All';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [DatePipe, RouterLink, SafeImage, RegistrationDialog, RevealOnScrollDirective],
  templateUrl: './competitions.html',
  styleUrl: './competitions.scss',
})
export class Competitions implements OnInit {
  private competitionService = inject(CompetitionService);
  private cdr = inject(ChangeDetectorRef);

  readonly all = ALL;

  competitions: Competition[] = [];
  filtered: Competition[] = [];
  categories: string[] = [ALL];

  readonly activeCategory = signal(ALL);
  readonly loading = signal(true);
  readonly registering = signal<Competition | null>(null);

  /** How registration works — rendered as a numbered walkthrough. */
  readonly steps = [
    {
      icon: 'fa-solid fa-list-check',
      title: 'Pick a competition',
      text: 'Browse the list below and read what the competition involves.',
    },
    {
      icon: 'fa-solid fa-pen-to-square',
      title: 'Fill in the form',
      text: 'Participant name, age and a contact number — that is all we need.',
    },
    {
      icon: 'fa-brands fa-whatsapp',
      title: 'Send on WhatsApp',
      text: 'Your details open in WhatsApp, ready to send to the committee.',
    },
    {
      icon: 'fa-solid fa-circle-check',
      title: 'Get confirmed',
      text: 'The committee replies with your slot and any last instructions.',
    },
  ];

  ngOnInit(): void {
    this.competitionService.getAll().subscribe({
      next: (list) => {
        this.competitions = list;
        this.categories = [ALL, ...new Set(list.map((c) => c.category))];
        this.applyFilter();
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading.set(false);
        this.cdr.detectChanges();
      },
    });
  }

  selectCategory(category: string): void {
    this.activeCategory.set(category);
    this.applyFilter();
  }

  private applyFilter(): void {
    const category = this.activeCategory();
    this.filtered =
      category === ALL
        ? [...this.competitions]
        : this.competitions.filter((c) => c.category === category);
  }

  openRegistration(competition: Competition): void {
    this.registering.set(competition);
    document.body.style.overflow = 'hidden';
  }

  closeRegistration(): void {
    this.registering.set(null);
    document.body.style.overflow = '';
  }

  /** Only includes the parts that have actually been announced. */
  subtitleFor(competition: Competition): string {
    const date = competition.date
      ? new Date(competition.date).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'short',
        })
      : '';
    return [date, competition.time, competition.location].filter(Boolean).join(' · ');
  }
}
