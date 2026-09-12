import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';
import { environment } from '@env/environment';
import { GalleryService } from '@core/services/gallery';
import { Gallery } from '@core/models/gallery';
import { GalleryFormComponent } from '../../../shared/gallery-form/gallery-form';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, GalleryFormComponent],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class GalleryComponent implements OnInit {
  private galleryService = inject(GalleryService);
  private cdr = inject(ChangeDetectorRef);
  galleryList: Gallery[] = [];

  selectedGallery?: Gallery;

  showPopup = false;

  ngOnInit(): void {
    this.loadGallery();
  }

  loadGallery(): void {
    this.galleryService.getAll().subscribe({
      next: (response) => {
        this.galleryList = response;
        this.cdr.detectChanges();
      },
    });
  }

  addGallery(): void {
    this.selectedGallery = undefined;

    this.showPopup = true;
  }

  editGallery(gallery: Gallery): void {
    this.selectedGallery = gallery;

    this.showPopup = true;
  }

  closePopup(refresh = false): void {
    this.showPopup = false;

    this.selectedGallery = undefined;

    if (refresh) {
      this.loadGallery();
    }
  }
  getImageUrl(imageUrl: string): string {
    if (!imageUrl) {
      return 'images/no-image.png';
    }

    if (imageUrl.startsWith('http') || imageUrl.startsWith('blob:')) {
      return imageUrl;
    }

    return `${environment.fileUrl}${imageUrl}`;
  }
  deleteGallery(id: number): void {
    Swal.fire({
      title: 'Delete Gallery?',
      text: 'This record will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.galleryService.delete(id).subscribe({
        next: (res: any) => {
          Swal.fire('Deleted!', res.message, 'success');

          this.loadGallery();
        },
      });
    });
  }
}
