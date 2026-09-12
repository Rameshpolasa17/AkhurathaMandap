import { Component, Input } from '@angular/core';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/** Normalised shape so committee members and volunteers share one card. */
export interface PersonCard {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  description: string;
}

/**
 * Presentational grid of people cards, used by both the Committee and
 * Volunteers pages and by the home-page preview — one card design, one place.
 */
@Component({
  selector: 'app-people-grid',
  standalone: true,
  imports: [SafeImage, RevealOnScrollDirective],
  templateUrl: './people-grid.html',
  styleUrl: './people-grid.scss',
})
export class PeopleGrid {
  @Input() people: PersonCard[] = [];
  /** Message shown when the list is empty. */
  @Input() emptyText = 'This list is being finalised.';
  /** Fallback icon for missing photographs. */
  @Input() icon = 'fa-solid fa-user';

  initials(person: PersonCard): string {
    return person.name
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }
}
