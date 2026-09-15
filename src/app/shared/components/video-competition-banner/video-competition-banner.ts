import { Component } from '@angular/core';

import { activeSocialLinks } from '@core/config/app.config';
import { GANESH_2026_PHOTOS, HARATHI_2026_PHOTOS } from '@core/mock-data/festival-photos.mock';

/**
 * VIDEO EDITING COMPETITION — the big home-page banner.
 *
 * Only confirmed facts appear here: the competition itself and the ₹5,000
 * prize. Everything else is "Details will be announced soon". When the
 * committee confirms rules, dates or registration, update this banner and
 * `competitions.mock.ts` together.
 */
export const VIDEO_COMPETITION = {
  prize: '₹5,000',
  status: 'Details will be announced soon',
};

@Component({
  selector: 'app-video-competition-banner',
  standalone: true,
  imports: [],
  templateUrl: './video-competition-banner.html',
  styleUrl: './video-competition-banner.scss',
})
export class VideoCompetitionBanner {
  readonly info = VIDEO_COMPETITION;
  readonly instagram = activeSocialLinks().find((s) => s.label === 'Instagram') ?? null;

  /** Real photos from this year, reused (already cached) for the editor mock-up. */
  readonly preview = GANESH_2026_PHOTOS[1];
  readonly clips = [HARATHI_2026_PHOTOS[0], GANESH_2026_PHOTOS[0], GANESH_2026_PHOTOS[3]];

  /** Fixed particle count — positions live in the stylesheet. */
  readonly particles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  readonly words = ['Create.', 'Edit.', 'Celebrate.'];
}
