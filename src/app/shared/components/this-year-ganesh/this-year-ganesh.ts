import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_CONFIG } from '@core/config/app.config';
import { GANESH_2026_PHOTOS } from '@core/mock-data/festival-photos.mock';
import { PhotoLightbox } from '@shared/components/photo-lightbox/photo-lightbox';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/** Home-page gallery of this year's Ganesh idol, with a full-screen preview. */
@Component({
  selector: 'app-this-year-ganesh',
  standalone: true,
  imports: [RouterLink, SafeImage, PhotoLightbox, RevealOnScrollDirective],
  templateUrl: './this-year-ganesh.html',
  styleUrl: './this-year-ganesh.scss',
})
export class ThisYearGanesh {
  readonly photos = GANESH_2026_PHOTOS;
  readonly rajaTitle = APP_CONFIG.rajaTitle;
  readonly year = APP_CONFIG.festivalStartDate.slice(0, 4);

  /** Index of the photo open in the preview, or -1. */
  readonly openIndex = signal(-1);
}
