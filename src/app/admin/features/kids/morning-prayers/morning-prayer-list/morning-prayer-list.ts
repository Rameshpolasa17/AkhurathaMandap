import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { KidsContent } from '@core/models/kids.model';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-morning-prayer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './morning-prayer-list.html',
  styleUrl: './morning-prayer-list.scss',
})
export class MorningPrayerList implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  prayers: KidsContent[] = [];
  loading = false;
  searchText = '';
  statusFilter = 'all';

  ngOnInit(): void {
    this.loadPrayers();
  }

  loadPrayers(): void {
    this.loading = true;

    this.kidsService.getMorningPrayers().subscribe({
      next: (response) => {
        this.prayers = response ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Unable to load Morning Prayers',
          text: error?.error?.message ?? 'Something went wrong.',
        });
      },
    });
  }

  get filteredPrayers(): KidsContent[] {
    let result = [...this.prayers];
    const search = this.searchText.trim().toLowerCase();

    if (search) {
      result = result.filter((item) => {
        const title = item.title?.toLowerCase() ?? '';
        const shortDescription = item.shortDescription?.toLowerCase() ?? '';
        const description = item.description?.toLowerCase() ?? '';

        return (
          title.includes(search) ||
          shortDescription.includes(search) ||
          description.includes(search)
        );
      });
    }

    if (this.statusFilter === 'active') {
      result = result.filter((x) => x.isActive);
    }

    if (this.statusFilter === 'inactive') {
      result = result.filter((x) => !x.isActive);
    }

    if (this.statusFilter === 'featured') {
      result = result.filter((x) => x.isFeatured);
    }

    return result.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }

  get activeCount(): number {
    return this.prayers.filter((x) => x.isActive).length;
  }

  get featuredCount(): number {
    return this.prayers.filter((x) => x.isFeatured).length;
  }

  onSearch(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value;
  }

  onStatusChange(event: Event): void {
    this.statusFilter = (event.target as HTMLSelectElement).value;
  }

  addPrayer(): void {
    this.router.navigate(['/admin/kids/morning-prayers/add']);
  }

  editPrayer(item: KidsContent): void {
    this.router.navigate(['/admin/kids/morning-prayers/edit', item.id]);
  }

  deletePrayer(item: KidsContent): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Morning Prayer?',
      html: `Are you sure you want to delete <strong>${item.title}</strong>?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
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
              text: response?.message ?? 'Unable to delete.',
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: response?.message ?? 'Morning Prayer deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadPrayers();
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete.',
          });
        },
      });
    });
  }

  imageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'images/defaults/no-image.png';
  }
}
