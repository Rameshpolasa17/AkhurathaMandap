import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Gallery } from '@core/models/gallery';
import { GalleryService } from '@core/services/gallery';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * Home-page gallery teaser: six featured photographs in an editorial grid,
 * with the only call to action pointing at the full gallery.
 */
@Component({
  selector: 'app-gallery-preview',
  standalone: true,
  imports: [RouterLink, SafeImage, RevealOnScrollDirective],
  templateUrl: './gallery-preview.html',
  styleUrl: './gallery-preview.scss',
})
export class GalleryPreview implements OnInit {
  private galleryService = inject(GalleryService);
  private cdr = inject(ChangeDetectorRef);

  photos: Gallery[] = [];

  ngOnInit(): void {
    this.galleryService.getFeatured(6).subscribe({
      next: (photos) => {
        this.photos = photos;
        this.cdr.detectChanges();
      },
    });
  }
}
