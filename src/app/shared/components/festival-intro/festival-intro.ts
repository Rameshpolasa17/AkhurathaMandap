import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { APP_CONFIG } from '@core/config/app.config';
import { Highlight } from '@core/models/content';
import { ContentService } from '@core/services/content.service';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * Home-page introduction plus the festival highlight tiles.
 * Every tile routes somewhere real — there are no decorative cards here.
 */
@Component({
  selector: 'app-festival-intro',
  standalone: true,
  imports: [RouterLink, RevealOnScrollDirective],
  templateUrl: './festival-intro.html',
  styleUrl: './festival-intro.scss',
})
export class FestivalIntro implements OnInit {
  private contentService = inject(ContentService);
  private cdr = inject(ChangeDetectorRef);

  readonly mandapName = APP_CONFIG.mandapName;

  highlights: Highlight[] = [];

  ngOnInit(): void {
    this.contentService.getHighlights().subscribe({
      next: (highlights) => {
        this.highlights = highlights;
        this.cdr.detectChanges();
      },
    });
  }
}
