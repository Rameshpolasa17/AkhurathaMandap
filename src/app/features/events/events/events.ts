import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Event } from '@core/models/event';
import { EventService } from '@core/services/event';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RegistrationDialog } from '@shared/components/registration-dialog/registration-dialog';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';
import { eventShareMessage, whatsAppShareUrl } from '@core/utils/festival-share';

const ALL = 'All';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterLink, SafeImage, RegistrationDialog, RevealOnScrollDirective],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  private eventService = inject(EventService);
  private cdr = inject(ChangeDetectorRef);

  readonly all = ALL;

  events: Event[] = [];
  filtered: Event[] = [];
  categories: string[] = [ALL];

  readonly activeCategory = signal(ALL);
  readonly loading = signal(true);

  /** eventId of the card whose details are expanded, or null. */
  readonly expandedId = signal<number | null>(null);

  /** The event currently being registered for, or null when the modal is closed. */
  readonly registering = signal<Event | null>(null);

  ngOnInit(): void {
    this.eventService.getPublished().subscribe({
      next: (events) => {
        this.events = events;
        this.categories = [ALL, ...new Set(events.map((e) => e.category ?? '').filter(Boolean))];
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
      category === ALL ? [...this.events] : this.events.filter((e) => e.category === category);
  }

  toggleDetails(event: Event): void {
    this.expandedId.set(this.expandedId() === event.eventId ? null : event.eventId);
  }

  openRegistration(event: Event): void {
    this.registering.set(event);
    document.body.style.overflow = 'hidden';
  }

  closeRegistration(): void {
    this.registering.set(null);
    document.body.style.overflow = '';
  }

  /** WhatsApp link with a ready-made invitation the devotee can forward. */
  shareUrl(event: Event): string {
    return whatsAppShareUrl(eventShareMessage(event));
  }

  /** Subtitle for the registration modal — venue only, no dates. */
  subtitleFor(event: Event): string {
    return event.location;
  }
}
