import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';
import { Competition } from '@core/models/kids.model';

@Component({
  selector: 'app-competition-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competition-list.html',
  styleUrl: './competition-list.scss',
})
export class CompetitionList implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  competitions: Competition[] = [];

  loading = false;

  searchText = '';

  yearFilter = 'all';

  statusFilter = 'all';

  registrationFilter = 'all';

  ngOnInit(): void {
    this.loadCompetitions();
  }

  // =========================================================
  // LOAD
  // =========================================================

  loadCompetitions(): void {
    this.loading = true;

    this.kidsService.getCompetitions().subscribe({
      next: (response: Competition[]) => {
        this.competitions = response ?? [];
        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error: any) => {
        this.loading = false;

        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Competitions',
          text: error?.error?.message ?? 'Something went wrong while loading competitions.',
        });
      },
    });
  }

  // =========================================================
  // FILTERED DATA
  // =========================================================

  get filteredCompetitions(): Competition[] {
    const search = this.searchText.trim().toLowerCase();

    return this.competitions.filter((competition) => {
      const matchesSearch =
        !search ||
        competition.title?.toLowerCase().includes(search) ||
        competition.description?.toLowerCase().includes(search);

      const matchesYear = this.yearFilter === 'all' || String(competition.year) === this.yearFilter;

      const matchesStatus =
        this.statusFilter === 'all' ||
        (this.statusFilter === 'active' && competition.isActive) ||
        (this.statusFilter === 'inactive' && !competition.isActive);

      const matchesRegistration =
        this.registrationFilter === 'all' ||
        (this.registrationFilter === 'open' && competition.isRegistrationOpen) ||
        (this.registrationFilter === 'closed' && !competition.isRegistrationOpen);

      return matchesSearch && matchesYear && matchesStatus && matchesRegistration;
    });
  }

  // =========================================================
  // COUNTS
  // =========================================================

  get activeCount(): number {
    return this.competitions.filter((competition) => competition.isActive).length;
  }

  get registrationOpenCount(): number {
    return this.competitions.filter((competition) => competition.isRegistrationOpen).length;
  }

  get years(): number[] {
    return [
      ...new Set(
        this.competitions.map((competition) => competition.year).filter((year) => year != null),
      ),
    ].sort((a, b) => b - a);
  }

  // =========================================================
  // SEARCH
  // =========================================================

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchText = input.value;

    this.cdr.detectChanges();
  }

  // =========================================================
  // YEAR
  // =========================================================

  onYearChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.yearFilter = select.value;

    this.cdr.detectChanges();
  }

  // =========================================================
  // STATUS
  // =========================================================

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.statusFilter = select.value;

    this.cdr.detectChanges();
  }

  // =========================================================
  // REGISTRATION
  // =========================================================

  onRegistrationChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.registrationFilter = select.value;

    this.cdr.detectChanges();
  }

  // =========================================================
  // ADD
  // =========================================================

  addCompetition(): void {
    this.router.navigate(['/admin/kids/competitions/add']);
  }

  // =========================================================
  // EDIT
  // =========================================================

  editCompetition(id: number): void {
    this.router.navigate(['/admin/kids/competitions/edit', id]);
  }

  // =========================================================
  // CATEGORIES
  // =========================================================

  manageCategories(id: number): void {
    this.router.navigate(['/admin/kids/competitions', id, 'categories']);
  }

  // =========================================================
  // REGISTRATIONS
  // =========================================================

  manageRegistrations(id: number): void {
    this.router.navigate(['/admin/kids/competitions', id, 'registrations']);
  }

  // =========================================================
  // RESULTS
  // =========================================================

  viewResults(id: number): void {
    this.router.navigate(['/admin/kids/competitions', id, 'results']);
  }

  // =========================================================
  // DELETE
  // =========================================================

  deleteCompetition(competition: Competition): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Competition?',
      text: competition.title,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.kidsService.deleteCompetition(competition.id).subscribe({
        next: (response: any) => {
          if (response?.success === false) {
            Swal.fire({
              icon: 'warning',
              title: 'Not Deleted',
              text: response?.message ?? 'Competition could not be deleted.',
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: response?.message ?? 'Competition deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this.loadCompetitions();
          });
        },

        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete competition.',
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

    if (!image.src.endsWith('images/defaults/no-image.png')) {
      image.src = 'images/defaults/no-image.png';
    }
  }
}
