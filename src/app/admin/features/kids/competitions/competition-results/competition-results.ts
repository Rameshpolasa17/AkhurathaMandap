import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-competition-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competition-results.html',
  styleUrl: './competition-results.scss',
})
export class CompetitionResults implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  competitionId = 0;
  categoryId = 0;
  results: any[] = [];
  filteredResults: any[] = [];
  loading = false;
  searchText = '';

  ngOnInit(): void {
    this.competitionId = Number(this.route.snapshot.paramMap.get('competitionId'));
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId')) || 0;

    if (this.competitionId <= 0) {
      this.backToCompetitions();
      return;
    }

    this.loadResults();
  }

  loadResults(): void {
    this.loading = true;

    this.kidsService
      .getCompetitionResults(this.competitionId, this.categoryId || undefined)
      .subscribe({
        next: (response: any[]) => {
          this.results = response ?? [];
          this.applyFilter();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          this.results = [];
          this.filteredResults = [];
          this.loading = false;
          this.cdr.detectChanges();

          Swal.fire({
            icon: 'error',
            title: 'Unable to Load Results',
            text: error?.error?.message ?? 'Unable to load competition results.',
          });
        },
      });
  }

  applyFilter(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredResults = this.results.filter(
      (item) =>
        !search ||
        item.childName?.toLowerCase().includes(search) ||
        item.name?.toLowerCase().includes(search) ||
        item.registrationNumber?.toLowerCase().includes(search),
    );
  }

  onSearch(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value;
    this.applyFilter();
    this.cdr.detectChanges();
  }

  deleteResult(result: any): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Result?',
      text: result.childName || result.name || 'Competition result',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((response) => {
      if (!response.isConfirmed) return;

      this.kidsService.deleteCompetitionResult(result.id).subscribe({
        next: (res: any) => {
          if (res?.success === false) {
            Swal.fire('Not Deleted', res.message ?? 'Result could not be deleted.', 'warning');
            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: res?.message ?? 'Result deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadResults();
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete result.',
          });
        },
      });
    });
  }

  backToCompetitions(): void {
    this.router.navigate(['/admin/kids/competitions']);
  }
}
