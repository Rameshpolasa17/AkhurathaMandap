import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { KidsService } from '@core/services/kids.service';
import { Competition } from '@core/models/kids.model';

@Component({
  selector: 'app-competition-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './competition-categories.html',
  styleUrl: './competition-categories.scss',
})
export class CompetitionCategories implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  competitionId = 0;

  competition: Competition | null = null;

  categories: any[] = [];

  loading = false;
  saving = false;

  showForm = false;

  editingId = 0;

  searchText = '';

  form = {
    id: 0,
    competitionId: 0,
    name: '',
    description: '',
    ageGroup: '',
    displayOrder: 1,
    maxParticipants: null as number | null,
    isActive: true,
  };

  ngOnInit(): void {
    this.competitionId = Number(this.route.snapshot.paramMap.get('competitionId'));

    if (this.competitionId <= 0) {
      this.backToCompetitions();
      return;
    }

    this.form.competitionId = this.competitionId;

    this.loadCompetition();
    this.loadCategories();
  }

  // =========================================================
  // COMPETITION
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
  // CATEGORIES
  // =========================================================

  loadCategories(): void {
    this.loading = true;

    this.kidsService.getCompetitionCategories(this.competitionId).subscribe({
      next: (response: any[]) => {
        this.categories = response ?? [];
        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error: any) => {
        this.categories = [];
        this.loading = false;

        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Categories',
          text: error?.error?.message ?? 'Something went wrong while loading categories.',
        });
      },
    });
  }

  // =========================================================
  // FILTER
  // =========================================================

  get filteredCategories(): any[] {
    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      return this.categories;
    }

    return this.categories.filter(
      (category) =>
        category.name?.toLowerCase().includes(search) ||
        category.description?.toLowerCase().includes(search) ||
        category.ageGroup?.toLowerCase().includes(search),
    );
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchText = input.value;

    this.cdr.detectChanges();
  }

  // =========================================================
  // COUNTS
  // =========================================================

  get activeCount(): number {
    return this.categories.filter((category) => category.isActive).length;
  }

  // =========================================================
  // ADD
  // =========================================================

  addCategory(): void {
    this.editingId = 0;

    this.form = {
      id: 0,
      competitionId: this.competitionId,
      name: '',
      description: '',
      ageGroup: '',
      displayOrder: this.categories.length + 1,
      maxParticipants: null,
      isActive: true,
    };

    this.showForm = true;

    this.cdr.detectChanges();
  }

  // =========================================================
  // EDIT
  // =========================================================

  editCategory(category: any): void {
    this.editingId = category.id;

    this.form = {
      id: category.id,
      competitionId: category.competitionId ?? this.competitionId,
      name: category.name ?? '',
      description: category.description ?? '',
      ageGroup: category.ageGroup ?? '',
      displayOrder: category.displayOrder ?? 1,
      maxParticipants: category.maxParticipants ?? null,
      isActive: category.isActive ?? true,
    };

    this.showForm = true;

    this.cdr.detectChanges();
  }

  // =========================================================
  // CANCEL FORM
  // =========================================================

  cancelForm(): void {
    this.showForm = false;
    this.editingId = 0;

    this.cdr.detectChanges();
  }

  // =========================================================
  // SAVE
  // =========================================================

  saveCategory(): void {
    if (!this.form.name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Name Required',
        text: 'Please enter the category name.',
      });

      return;
    }

    this.saving = true;

    const request = {
      id: this.form.id,
      competitionId: this.competitionId,
      name: this.form.name.trim(),
      description: this.form.description?.trim() || null,
      ageGroup: this.form.ageGroup?.trim() || null,
      displayOrder: Number(this.form.displayOrder) || 1,
      maxParticipants: this.form.maxParticipants ? Number(this.form.maxParticipants) : null,
      isActive: this.form.isActive,
      userId: 1,
    };

    this.kidsService.saveCompetitionCategory(request).subscribe({
      next: (response: any) => {
        this.saving = false;

        if (response?.success === false) {
          Swal.fire({
            icon: 'warning',
            title: 'Not Saved',
            text: response?.message ?? 'Category could not be saved.',
          });

          return;
        }

        Swal.fire({
          icon: 'success',
          title: this.editingId > 0 ? 'Category Updated' : 'Category Added',
          text: response?.message ?? 'Category saved successfully.',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          this.showForm = false;
          this.editingId = 0;
          this.loadCategories();
        });
      },

      error: (error: any) => {
        this.saving = false;

        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: error?.error?.message ?? 'Unable to save category.',
        });
      },
    });
  }

  // =========================================================
  // DELETE
  // =========================================================

  deleteCategory(category: any): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Category?',
      text: category.name,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.kidsService.deleteCompetitionCategory(category.id).subscribe({
        next: (response: any) => {
          if (response?.success === false) {
            Swal.fire({
              icon: 'warning',
              title: 'Not Deleted',
              text: response?.message ?? 'Category could not be deleted.',
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: response?.message ?? 'Category deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this.loadCategories();
          });
        },

        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete category.',
          });
        },
      });
    });
  }

  // =========================================================
  // BACK
  // =========================================================

  backToCompetitions(): void {
    this.router.navigate(['/admin/kids/competitions']);
  }
}
