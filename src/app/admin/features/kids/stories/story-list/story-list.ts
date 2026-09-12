import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { KidsContent } from '@core/models/kids.model';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-list.html',
  styleUrl: './story-list.scss',
})
export class StoryList implements OnInit {
  private readonly kidsService = inject(KidsService);

  private readonly router = inject(Router);

  private readonly cdr = inject(ChangeDetectorRef);

  // =========================================================
  // VARIABLES
  // =========================================================

  stories: KidsContent[] = [];

  loading = false;

  searchText = '';

  statusFilter = 'all';

  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {
    this.loadStories();
  }

  // =========================================================
  // LOAD STORIES
  // =========================================================

  loadStories(): void {
    this.loading = true;

    this.kidsService.getStories().subscribe({
      next: (response) => {
        console.log('Stories API Response:', response);

        this.stories = response ?? [];

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.error('Error loading stories:', error);

        this.loading = false;

        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Stories',
          text: error?.error?.message ?? 'Something went wrong while loading stories.',
        });
      },
    });
  }

  // =========================================================
  // FILTERED STORIES
  // =========================================================

  get filteredStories(): KidsContent[] {
    let result = [...this.stories];

    const search = this.searchText.trim().toLowerCase();

    if (search) {
      result = result.filter((item) => {
        const title = item.title?.toLowerCase() ?? '';

        const shortDescription = item.shortDescription?.toLowerCase() ?? '';

        const description = item.description?.toLowerCase() ?? '';

        const ageGroup = item.ageGroup?.toLowerCase() ?? '';

        return (
          title.includes(search) ||
          shortDescription.includes(search) ||
          description.includes(search) ||
          ageGroup.includes(search)
        );
      });
    }

    // =======================================================
    // STATUS FILTER
    // =======================================================

    if (this.statusFilter === 'active') {
      result = result.filter((item) => item.isActive);
    }

    if (this.statusFilter === 'inactive') {
      result = result.filter((item) => !item.isActive);
    }

    if (this.statusFilter === 'featured') {
      result = result.filter((item) => item.isFeatured);
    }

    // =======================================================
    // DISPLAY ORDER
    // =======================================================

    return result.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }

  // =========================================================
  // COUNTS
  // =========================================================

  get activeCount(): number {
    return this.stories.filter((item) => item.isActive).length;
  }

  get featuredCount(): number {
    return this.stories.filter((item) => item.isFeatured).length;
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
  // ADD STORY
  // =========================================================

  addStory(): void {
    this.router.navigate(['/admin/kids/stories/add']);
  }

  // =========================================================
  // EDIT STORY
  // =========================================================

  editStory(item: KidsContent): void {
    this.router.navigate(['/admin/kids/stories/edit', item.id]);
  }

  // =========================================================
  // MANAGE STORY PAGES
  // =========================================================

  managePages(item: KidsContent): void {
    this.router.navigate(['/admin/kids/stories', item.id, 'pages']);
  }

  // =========================================================
  // DELETE STORY
  // =========================================================

  deleteStory(item: KidsContent): void {
    Swal.fire({
      icon: 'warning',

      title: 'Delete Story?',

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
        next: (response: any) => {
          if (response?.success === false) {
            Swal.fire({
              icon: 'warning',
              title: 'Not Deleted',
              text: response?.message ?? 'Story could not be deleted.',
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: response?.message ?? 'Story deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadStories();
        },

        error: (error: any) => {
          console.error('Delete Story Error:', error);

          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete story.',
          });
        },
      });
    });
  }

  // =========================================================
  // IMAGE ERROR
  // =========================================================

  imageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.src = 'images/defaults/no-image.png';
  }
}
