import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_CONFIG } from '@core/config/app.config';
import { RAJA_FEATURE_PHOTO } from '@core/mock-data/festival-photos.mock';
import { PhotoLightbox } from '@shared/components/photo-lightbox/photo-lightbox';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * The home page's single feature photograph of this year's idol.
 * Swap the photo in one place: `RAJA_FEATURE_PHOTO`.
 */
@Component({
  selector: 'app-raja-feature',
  standalone: true,
  imports: [RouterLink, SafeImage, PhotoLightbox, RevealOnScrollDirective],
  templateUrl: './raja-feature.html',
  styleUrl: './raja-feature.scss',
})
export class RajaFeature {
  readonly photo = RAJA_FEATURE_PHOTO;
  readonly rajaTitle = APP_CONFIG.rajaTitle;
  readonly mandapName = APP_CONFIG.mandapName;
  readonly festivalName = APP_CONFIG.festivalName;
  readonly year = APP_CONFIG.festivalStartDate.slice(0, 4);

  readonly open = signal(false);

  /** The lightbox takes a list, so hand it this one photo. */
  readonly photos = [RAJA_FEATURE_PHOTO];
}
