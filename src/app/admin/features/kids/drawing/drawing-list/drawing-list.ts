import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { KidsContent } from '@core/models/kids.model';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-drawing-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawing-list.html',
  styleUrl: './drawing-list.scss',
})
export class DrawingList implements OnInit {
  private readonly kidsService = inject(KidsService);

  private readonly router = inject(Router);

  private readonly cdr = inject(ChangeDetectorRef);

  drawings: KidsContent[] = [];

  loading = false;

  searchText = '';

  statusFilter = 'all';

  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {
    this.loadDrawings();
  }

  // =========================================================
  // LOAD DRAWINGS
  // =========================================================

  loadDrawings(): void {
    this.loading = true;

    this.kidsService.getContents('Drawing').subscribe({
      next: (response) => {
        console.log('Drawing API Response:', response);

        this.drawings = response ?? [];

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading drawings:', error);

        this.loading = false;

        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to load drawings',
          text: error?.error?.message ?? 'Something went wrong while loading drawing content.',
        });
      },
    });
  }

  // =========================================================
  // FILTERED DRAWINGS
  // =========================================================

  get filteredDrawings(): KidsContent[] {
    let result = [...this.drawings];

    const search = this.searchText.trim().toLowerCase();

    if (search) {
      result = result.filter((item) => {
        const title = item.title?.toLowerCase() ?? '';

        const shortDescription = item.shortDescription?.toLowerCase() ?? '';

        const ageGroup = item.ageGroup?.toLowerCase() ?? '';

        return (
          title.includes(search) || shortDescription.includes(search) || ageGroup.includes(search)
        );
      });
    }

    if (this.statusFilter === 'active') {
      result = result.filter((item) => item.isActive);
    }

    if (this.statusFilter === 'inactive') {
      result = result.filter((item) => !item.isActive);
    }

    if (this.statusFilter === 'featured') {
      result = result.filter((item) => item.isFeatured);
    }

    return result.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }

  // =========================================================
  // COUNTS
  // =========================================================

  get activeCount(): number {
    return this.drawings.filter((item) => item.isActive).length;
  }

  get featuredCount(): number {
    return this.drawings.filter((item) => item.isFeatured).length;
  }

  // =========================================================
  // SEARCH
  // =========================================================

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchText = input.value;
  }

  // =========================================================
  // STATUS FILTER
  // =========================================================

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.statusFilter = select.value;
  }

  // =========================================================
  // ADD
  // =========================================================

  addDrawing(): void {
    this.router.navigate(['/admin/kids/drawing/add']);
  }

  // =========================================================
  // EDIT
  // =========================================================

  editDrawing(item: KidsContent): void {
    this.router.navigate(['/admin/kids/drawing/edit', item.id]);
  }

  // =========================================================
  // DELETE
  // =========================================================

  deleteDrawing(item: KidsContent): void {
    Swal.fire({
      icon: 'warning',

      title: 'Delete Drawing?',

      html: `
        Are you sure you want to delete
        <strong>${item.title}</strong>?
      `,

      showCancelButton: true,

      confirmButtonText: 'Yes, Delete',

      cancelButtonText: 'Cancel',

      reverseButtons: true,

      focusCancel: true,
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.kidsService.deleteContent(item.id).subscribe({
        next: (response) => {
          if (response?.success === false) {
            Swal.fire({
              icon: 'warning',
              title: 'Not Deleted',
              text: response?.message ?? 'Drawing could not be deleted.',
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: response?.message ?? 'Drawing deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadDrawings();
        },

        error: (error) => {
          console.error('Delete drawing error:', error);

          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete drawing.',
          });
        },
      });
    });
  }

  // =========================================================
  // IMAGE
  // =========================================================

  imageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.src = 'images/defaults/no-image.png';
  }
}
