import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Event } from '@core/models/event';
import { EventService } from '@core/services/event';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * Home-page teaser for the festival programme. Registration lives on the
 * Events page, so the only action here is "See all events".
 */
@Component({
  selector: 'app-events-preview',
  standalone: true,
  imports: [DatePipe, RouterLink, SafeImage, RevealOnScrollDirective],
  templateUrl: './events-preview.html',
  styleUrl: './events-preview.scss',
})
export class EventsPreview implements OnInit {
  private eventService = inject(EventService);
  private cdr = inject(ChangeDetectorRef);

  events: Event[] = [];

  ngOnInit(): void {
    this.eventService.getFeatured(3).subscribe({
      next: (events) => {
        this.events = events;
        this.cdr.detectChanges();
      },
    });
  }
}
