import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Gallery as GalleryItem } from '@core/models/gallery';
import { GalleryService } from '@core/services/gallery';
import { SafeImage } from '@shared/components/safe-image/safe-image';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

const ALL = 'All';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [DatePipe, RouterLink, SafeImage, RevealOnScrollDirective],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnInit {
  private galleryService = inject(GalleryService);
  private cdr = inject(ChangeDetectorRef);

  readonly all = ALL;

  photos: GalleryItem[] = [];
  filtered: GalleryItem[] = [];
  categories: string[] = [ALL];

  readonly activeCategory = signal(ALL);
  readonly loading = signal(true);

  /** Lightbox state. `-1` means closed. */
  readonly lightboxIndex = signal(-1);

  ngOnInit(): void {
    this.galleryService.getPublished().subscribe({
      next: (photos) => {
        this.photos = photos;
        this.categories = [ALL, ...new Set(photos.map((p) => p.category).filter(Boolean))];
        this.applyFilter();
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading.set(false);
        this.cdr.detectChanges();
      },
    });
  }

  selectCategory(category: string): void {
    this.activeCategory.set(category);
    this.applyFilter();
  }

  private applyFilter(): void {
    const category = this.activeCategory();
    this.filtered =
      category === ALL ? [...this.photos] : this.photos.filter((p) => p.category === category);
  }

  /**
   * Editorial rhythm for the masonry grid: featured photos take a large
   * 2x2 tile, every fourth remaining photo takes a wide 2x1 tile, and the
   * rest fill the gaps. `grid-auto-flow: dense` closes any holes.
   */
  tileClass(photo: GalleryItem, index: number): string {
    if (photo.featured && index < 8) {
      return 'tile--large';
    }
    if (index % 4 === 3) {
      return 'tile--wide';
    }
    if (index % 7 === 5) {
      return 'tile--tall';
    }
    return '';
  }

  /* ------------------------------------------------------------ lightbox */

  get activePhoto(): GalleryItem | null {
    const i = this.lightboxIndex();
    return i >= 0 && i < this.filtered.length ? this.filtered[i] : null;
  }

  openLightbox(index: number): void {
    this.lightboxIndex.set(index);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxIndex.set(-1);
    document.body.style.overflow = '';
  }

  next(): void {
    if (!this.filtered.length) return;
    this.lightboxIndex.set((this.lightboxIndex() + 1) % this.filtered.length);
  }

  previous(): void {
    if (!this.filtered.length) return;
    const i = this.lightboxIndex() - 1;
    this.lightboxIndex.set(i < 0 ? this.filtered.length - 1 : i);
  }

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeLightbox();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.lightboxIndex() < 0) return;

    switch (event.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.previous();
        break;
    }
  }

  /* --------------------------------------------------------------- touch */

  private touchStartX = 0;

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const delta = this.touchStartX - event.changedTouches[0].clientX;
    if (Math.abs(delta) < 55) return;
    delta > 0 ? this.next() : this.previous();
  }
}
