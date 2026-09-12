import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Sponsor } from '@core/models/sponsors';
import { SponsorService } from '@core/services/sponsor.service';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

interface SponsorTier {
  name: string;
  sponsors: Sponsor[];
}

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [RouterLink, SafeImage, RevealOnScrollDirective],
  templateUrl: './sponsors.html',
  styleUrl: './sponsors.scss',
})
export class Sponsors implements OnInit {
  private sponsorService = inject(SponsorService);
  private cdr = inject(ChangeDetectorRef);

  tiers: SponsorTier[] = [];
  total = 0;

  readonly loading = signal(true);

  ngOnInit(): void {
    this.sponsorService.getPublished().subscribe({
      next: (sponsors) => {
        this.total = sponsors.length;
        this.tiers = this.groupByTier(sponsors);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading.set(false);
        this.cdr.detectChanges();
      },
    });
  }

  /** Groups sponsors into tiers, preserving the service's ordering. */
  private groupByTier(sponsors: Sponsor[]): SponsorTier[] {
    const map = new Map<string, Sponsor[]>();
    for (const sponsor of sponsors) {
      const tier = sponsor.sponsorTypeName || 'Supporter';
      const bucket = map.get(tier);
      bucket ? bucket.push(sponsor) : map.set(tier, [sponsor]);
    }
    return [...map.entries()].map(([name, list]) => ({ name, sponsors: list }));
  }

  /** Initials shown when a sponsor has no logo file yet. */
  initials(sponsor: Sponsor): string {
    return sponsor.sponsorName
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }
}
