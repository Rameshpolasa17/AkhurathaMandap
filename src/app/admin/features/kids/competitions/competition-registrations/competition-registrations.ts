import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';
import { Competition } from '@core/models/kids.model';

@Component({
  selector: 'app-competition-registrations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './competition-registrations.html',
  styleUrl: './competition-registrations.scss',
})
export class CompetitionRegistrations implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  competitionId = 0;

  competition: Competition | null = null;

  registrations: any[] = [];

  filteredRegistrations: any[] = [];

  loading = false;

  searchText = '';

  statusFilter = 'all';

  categoryFilter = 0;

  ngOnInit(): void {
    this.competitionId = Number(this.route.snapshot.paramMap.get('competitionId'));

    if (this.competitionId <= 0) {
      this.backToCompetitions();
      return;
    }

    this.loadCompetition();
    this.loadRegistrations();
  }

  // =========================================================
  // LOAD COMPETITION
  // =========================================================

  loadCompetition(): void {
    this.kidsService.getCompetitionById(this.competitionId).subscribe({
      next: (response: any) => {
        this.competition = response?.data ?? response ?? null;

        this.cdr.detectChanges();
      },

      error: () => {
        this.competition = null;
        this.cdr.detectChanges();
      },
    });
  }

  // =========================================================
  // LOAD REGISTRATIONS
  // =========================================================

  loadRegistrations(): void {
    this.loading = true;

    this.kidsService.getCompetitionRegistrations(this.competitionId).subscribe({
      next: (response: any[]) => {
        this.registrations = response ?? [];

        this.applyFilters();

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error: any) => {
        this.registrations = [];
        this.filteredRegistrations = [];

        this.loading = false;

        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Registrations',
          text: error?.error?.message ?? 'Something went wrong while loading registrations.',
        });
      },
    });
  }

  // =========================================================
  // FILTERS
  // =========================================================

  applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredRegistrations = this.registrations.filter((registration) => {
      const matchesSearch =
        !search ||
        registration.name?.toLowerCase().includes(search) ||
        registration.childName?.toLowerCase().includes(search) ||
        registration.parentName?.toLowerCase().includes(search) ||
        registration.email?.toLowerCase().includes(search) ||
        registration.phone?.toLowerCase().includes(search) ||
        registration.registrationNumber?.toLowerCase().includes(search);

      const matchesStatus =
        this.statusFilter === 'all' ||
        registration.status?.toLowerCase() === this.statusFilter.toLowerCase();

      const matchesCategory =
        this.categoryFilter === 0 || registration.categoryId === this.categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchText = input.value;

    this.applyFilters();

    this.cdr.detectChanges();
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.statusFilter = select.value;

    this.applyFilters();

    this.cdr.detectChanges();
  }

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.categoryFilter = Number(select.value) || 0;

    this.applyFilters();

    this.cdr.detectChanges();
  }

  // =========================================================
  // COUNTS
  // =========================================================

  get totalCount(): number {
    return this.registrations.length;
  }

  get pendingCount(): number {
    return this.registrations.filter((item) => item.status?.toLowerCase() === 'pending').length;
  }

  get approvedCount(): number {
    return this.registrations.filter((item) => item.status?.toLowerCase() === 'approved').length;
  }

  get rejectedCount(): number {
    return this.registrations.filter((item) => item.status?.toLowerCase() === 'rejected').length;
  }

  // =========================================================
  // STATUS UPDATE
  // =========================================================

  updateStatus(registration: any, status: string): void {
    const statusText = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    Swal.fire({
      icon: 'question',
      title: `${statusText} Registration?`,
      text: registration.childName ?? registration.name ?? 'Registration',
      showCancelButton: true,
      confirmButtonText: `Yes, ${statusText}`,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      const request = {
        id: registration.id,
        status: status,
        userId: 1,
      };

      this.kidsService.updateCompetitionRegistrationStatus(request).subscribe({
        next: (response: any) => {
          if (response?.success === false) {
            Swal.fire({
              icon: 'warning',
              title: 'Not Updated',
              text: response?.message ?? 'Registration status could not be updated.',
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: response?.message ?? 'Registration status updated successfully.',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this.loadRegistrations();
          });
        },

        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: error?.error?.message ?? 'Unable to update registration status.',
          });
        },
      });
    });
  }

  // =========================================================
  // STATUS CLASS
  // =========================================================

  getStatusClass(status: string | null | undefined): string {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'approved';

      case 'rejected':
        return 'rejected';

      case 'cancelled':
        return 'cancelled';

      case 'pending':
      default:
        return 'pending';
    }
  }

  // =========================================================
  // BACK
  // =========================================================

  backToCompetitions(): void {
    this.router.navigate(['/admin/kids/competitions']);
  }
}
