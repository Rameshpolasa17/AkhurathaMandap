import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { KidsContent } from '@core/models/kids.model';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-rhyme-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rhyme-list.html',
  styleUrl: './rhyme-list.scss',
})
export class RhymeList implements OnInit {
  private kidsService = inject(KidsService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  rhymes: KidsContent[] = [];
  loading = false;
  searchText = '';
  statusFilter = 'all';

  ngOnInit(): void {
    this.loadRhymes();
  }

  loadRhymes(): void {
    this.loading = true;

    this.kidsService.getRhymes().subscribe({
      next: (response) => {
        this.rhymes = response ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Unable to load Rhymes',
          text: error?.error?.message ?? 'Something went wrong.',
        });
      },
    });
  }

  get filteredRhymes(): KidsContent[] {
    let result = [...this.rhymes];
    const search = this.searchText.trim().toLowerCase();

    if (search) {
      result = result.filter(
        (x) =>
          (x.title ?? '').toLowerCase().includes(search) ||
          (x.shortDescription ?? '').toLowerCase().includes(search),
      );
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
    return this.rhymes.filter((x) => x.isActive).length;
  }

  get featuredCount(): number {
    return this.rhymes.filter((x) => x.isFeatured).length;
  }

  onSearch(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value;
  }

  onStatusChange(event: Event): void {
    this.statusFilter = (event.target as HTMLSelectElement).value;
  }

  addRhyme(): void {
    this.router.navigate(['/admin/kids/rhymes/add']);
  }

  editRhyme(item: KidsContent): void {
    this.router.navigate(['/admin/kids/rhymes/edit', item.id]);
  }

  deleteRhyme(item: KidsContent): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Rhyme?',
      html: `Are you sure you want to delete <strong>${item.title}</strong>?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
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

          this.loadRhymes();
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
