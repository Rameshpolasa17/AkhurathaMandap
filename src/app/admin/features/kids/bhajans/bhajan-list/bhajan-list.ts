import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { KidsContent } from '@core/models/kids.model';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-bhajan-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bhajan-list.html',
  styleUrl: './bhajan-list.scss',
})
export class BhajanList implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  bhajans: KidsContent[] = [];

  loading = false;

  searchText = '';

  statusFilter = 'all';

  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {
    this.loadBhajans();
  }

  // =========================================================
  // LOAD BHAJANS
  // =========================================================

  loadBhajans(): void {
    this.loading = true;

    this.kidsService.getBhajans().subscribe({
      next: (response) => {
        this.bhajans = response ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading bhajans:', error);

        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Unable to load bhajans',
          text: error?.error?.message ?? 'Something went wrong while loading bhajans.',
        });
      },
    });
  }

  // =========================================================
  // FILTERED BHAJANS
  // =========================================================

  get filteredBhajans(): KidsContent[] {
    let result = [...this.bhajans];

    const search = this.searchText.trim().toLowerCase();

    if (search) {
      result = result.filter((item) => {
        const title = item.title?.toLowerCase() ?? '';

        const englishTitle = item.shortDescription?.toLowerCase() ?? '';

        const singer = item.singer?.toLowerCase() ?? '';

        return title.includes(search) || englishTitle.includes(search) || singer.includes(search);
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

  addBhajan(): void {
    this.router.navigate(['/admin/kids/bhajans/add']);
  }

  // =========================================================
  // EDIT
  // =========================================================

  editBhajan(item: KidsContent): void {
    this.router.navigate(['/admin/kids/bhajans/edit', item.id]);
  }

  // =========================================================
  // DELETE
  // =========================================================

  deleteBhajan(item: KidsContent): void {
    Swal.fire({
      icon: 'warning',

      title: 'Delete Bhajan?',

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
              text: response?.message ?? 'Bhajan could not be deleted.',
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: response?.message ?? 'Bhajan deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadBhajans();
        },

        error: (error) => {
          console.error('Delete bhajan error:', error);

          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete bhajan.',
          });
        },
      });
    });
  }
  get activeCount(): number {
    return this.bhajans.filter((item) => item.isActive).length;
  }

  get featuredCount(): number {
    return this.bhajans.filter((item) => item.isFeatured).length;
  }
  // =========================================================
  // IMAGE ERROR
  // =========================================================

  imageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.src = 'images/defaults/no-image.png';
  }
}
