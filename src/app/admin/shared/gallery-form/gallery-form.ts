import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
import { environment } from '@env/environment';
import { GalleryService } from '@core/services/gallery';
import { Gallery } from '@core/models/gallery';
import { SaveGalleryRequest } from '@core/models/save-gallery-request';

@Component({
  selector: 'app-gallery-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery-form.html',
  styleUrl: './gallery-form.scss',
})
export class GalleryFormComponent {
  private galleryService = inject(GalleryService);

  @Input() gallery?: Gallery;

  @Output() close = new EventEmitter<boolean>();
  isDragging = false;

  selectedFiles: File[] = [];

  bulkPreviews: string[] = [];
  selectedFile: File | null = null;

  imagePreview: string | null = null;
  model: SaveGalleryRequest = {
    galleryId: 0,
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    displayOrder: 1,
    isActive: true,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gallery'] && this.gallery) {
      this.model = {
        galleryId: this.gallery.galleryId,
        title: this.gallery.title,
        description: this.gallery.description,
        imageUrl: this.gallery.imageUrl,
        category: this.gallery.category,
        displayOrder: this.gallery.displayOrder,
        isActive: this.gallery.isActive,
      };

      if (this.gallery.imageUrl) {
        this.imagePreview = this.gallery.imageUrl.startsWith('http')
          ? this.gallery.imageUrl
          : `${environment.fileUrl}${this.gallery.imageUrl}`;
      } else {
        this.imagePreview = null;
      }
    }
  }
  onMultipleFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.processFiles(Array.from(input.files));
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();

    this.isDragging = true;
  }
  private processFiles(files: File[]): void {
    files.forEach((file) => {
      this.selectedFiles.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        this.bulkPreviews.push(reader.result as string);
      };

      reader.readAsDataURL(file);
    });
  }
  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);

    this.bulkPreviews.splice(index, 1);
  }
  onDragLeave(event: DragEvent): void {
    event.preventDefault();

    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();

    this.isDragging = false;

    if (!event.dataTransfer?.files.length) return;

    this.processFiles(Array.from(event.dataTransfer.files));
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(this.selectedFile);
  }
  uploadAll(): void {
    if (this.selectedFiles.length === 0) {
      Swal.fire('Validation', 'Please select one or more images.', 'warning');

      return;
    }

    this.galleryService.uploadMultiple(this.selectedFiles).subscribe({
      next: (res: any) => {
        Swal.fire('Success', res.message ?? 'Images uploaded successfully.', 'success');

        this.close.emit(true);
      },

      error: () => {
        Swal.fire('Error', 'Bulk upload failed.', 'error');
      },
    });
  }
  save(): void {
    if (!this.model.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation',
        text: 'Please enter Title',
      });

      return;
    }

    Swal.fire({
      title: 'Saving...',
      text: 'Please wait',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (this.selectedFile) {
      this.galleryService.upload(this.selectedFile).subscribe({
        next: (response: any) => {
          console.log('Upload Response', response);

          this.model.imageUrl = response.imageUrl;

          this.saveGallery();
        },

        error: (err) => {
          console.error(err);

          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'Unable to upload image.',
          });
        },
      });
    } else {
      this.saveGallery();
    }
  }

  private saveGallery(): void {
    this.galleryService.save(this.model).subscribe({
      next: (res: any) => {
        // Close the popup first
        this.close.emit(true);

        // Then show the success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res?.message ?? 'Gallery Saved Successfully',
        });
      },

      error: (err) => {
        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.error?.message ?? 'Unable to save gallery.',
        });
      },
    });
  }

  cancel(): void {
    this.close.emit(false);
  }
}
