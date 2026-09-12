import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { APP_CONFIG } from '@core/config/app.config';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-live',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './live.html',
  styleUrl: './live.scss',
})
export class Live {
  private sanitizer = inject(DomSanitizer);

  readonly config = APP_CONFIG;

  /**
   * No stream URL is invented here. Until a real one is set in
   * `APP_CONFIG.live.streamUrl`, the page says so plainly instead of
   * embedding a placeholder player.
   */
  readonly hasStream = APP_CONFIG.live.streamUrl.trim().length > 0;

  readonly streamUrl: SafeResourceUrl | null = this.hasStream
    ? this.sanitizer.bypassSecurityTrustResourceUrl(APP_CONFIG.live.streamUrl)
    : null;

  readonly aartiTimes = [
    { time: '6:30 AM', name: 'Kakad Aarti' },
    { time: '12:00 PM', name: 'Madhyan Aarti' },
    { time: '7:30 PM', name: 'Sandhya Aarti' },
  ];
}
