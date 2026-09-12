import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Sponsor } from '@core/models/sponsors';
import { SponsorService } from '@core/services/sponsor.service';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/** Home-page sponsor strip. "View all sponsors" routes to the full page. */
@Component({
  selector: 'app-sponsors-preview',
  standalone: true,
  imports: [RouterLink, SafeImage, RevealOnScrollDirective],
  templateUrl: './sponsors-preview.html',
  styleUrl: './sponsors-preview.scss',
})
export class SponsorsPreview implements OnInit {
  private sponsorService = inject(SponsorService);
  private cdr = inject(ChangeDetectorRef);

  sponsors: Sponsor[] = [];

  ngOnInit(): void {
    this.sponsorService.getFeatured(8).subscribe({
      next: (sponsors) => {
        this.sponsors = sponsors;
        this.cdr.detectChanges();
      },
    });
  }

  initials(sponsor: Sponsor): string {
    return sponsor.sponsorName
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }
}
