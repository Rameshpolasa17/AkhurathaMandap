import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { KidsContent } from '@core/models/kids.model';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-mantra-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mantra-list.html',
  styleUrl: './mantra-list.scss',
})
export class MantraList implements OnInit {
  private readonly kidsService = inject(KidsService);

  private readonly router = inject(Router);

  private readonly cdr = inject(ChangeDetectorRef);

  mantras: KidsContent[] = [];

  loading = false;

  searchText = '';

  statusFilter = 'all';

  ngOnInit(): void {
    this.loadMantras();
  }

  loadMantras(): void {
    this.loading = true;

    this.kidsService.getMantras().subscribe({
      next: (response) => {
        this.mantras = response ?? [];

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Unable to load mantras',
          text: error?.error?.message ?? 'Something went wrong.',
        });
      },
    });
  }

  get filteredMantras(): KidsContent[] {
    let result = [...this.mantras];

    const search = this.searchText.trim().toLowerCase();

    if (search) {
      result = result.filter((item) => {
        return (
          (item.title ?? '').toLowerCase().includes(search) ||
          (item.shortDescription ?? '').toLowerCase().includes(search)
        );
      });
    }

    switch (this.statusFilter) {
      case 'active':
        result = result.filter((x) => x.isActive);
        break;

      case 'inactive':
        result = result.filter((x) => !x.isActive);
        break;

      case 'featured':
        result = result.filter((x) => x.isFeatured);
        break;
    }

    return result.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }

  get activeCount(): number {
    return this.mantras.filter((x) => x.isActive).length;
  }

  get featuredCount(): number {
    return this.mantras.filter((x) => x.isFeatured).length;
  }

  onSearch(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value;
  }

  onStatusChange(event: Event): void {
    this.statusFilter = (event.target as HTMLSelectElement).value;
  }

  addMantra(): void {
    this.router.navigate(['/admin/kids/mantras/add']);
  }

  editMantra(item: KidsContent): void {
    this.router.navigate(['/admin/kids/mantras/edit', item.id]);
  }

  deleteMantra(item: KidsContent): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Mantra?',
      text: item.title,
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.kidsService.deleteContent(item.id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            timer: 1200,
            showConfirmButton: false,
          });

          this.loadMantras();
        },

        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
          });
        },
      });
    });
  }

  imageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'images/defaults/no-image.png';
  }
}
