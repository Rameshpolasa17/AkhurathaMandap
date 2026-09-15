import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MOCK_EVENTS } from '@core/mock-data/events.mock';
import { HARATHI_2026_PHOTOS } from '@core/mock-data/festival-photos.mock';
import { DAILY_HARATHI } from '@core/mock-data/schedule.mock';
import { AddToCalendar } from '@shared/components/add-to-calendar/add-to-calendar';
import { PhotoLightbox } from '@shared/components/photo-lightbox/photo-lightbox';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/** Home-page feature on the daily Ganga Harathi, with this year's photos. */
@Component({
  selector: 'app-ganga-harathi-showcase',
  standalone: true,
  imports: [RouterLink, SafeImage, PhotoLightbox, AddToCalendar, RevealOnScrollDirective],
  templateUrl: './ganga-harathi-showcase.html',
  styleUrl: './ganga-harathi-showcase.scss',
})
export class GangaHarathiShowcase {
  readonly photos = HARATHI_2026_PHOTOS;
  readonly harathi = DAILY_HARATHI;

  /** The programme entry, so "Add to Calendar" uses the same confirmed times. */
  readonly event = MOCK_EVENTS.find((e) => e.title === DAILY_HARATHI.name) ?? null;

  readonly openIndex = signal(-1);
}
