import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';
import { Competition } from '@core/models/kids.model';

@Component({
  selector: 'app-competition-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './competition-form.html',
  styleUrl: './competition-form.scss',
})
export class CompetitionForm implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  id = 0;
  loading = false;
  saving = false;

  form: Competition = {
    id: 0,
    title: '',
    description: '',
    year: new Date().getFullYear(),
    thumbnailPath: null,
    registrationStartDate: null,
    registrationEndDate: null,
    startDate: null,
    endDate: null,
    maxParticipants: null,
    displayOrder: 1,
    isActive: true,
    isRegistrationOpen: false,
    createdBy: null,
    createdDate: null,
    modifiedBy: null,
    modifiedDate: null,
  };

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id > 0) {
      this.loadCompetition();
    }
  }

  // =========================================================
  // LOAD
  // =========================================================

  loadCompetition(): void {
    this.loading = true;

    this.kidsService.getCompetitionById(this.id).subscribe({
      next: (response: any) => {
        const data: Competition = response?.data ?? response;

        if (!data) {
          this.loading = false;

          Swal.fire({
            icon: 'warning',
            title: 'Competition Not Found',
            text: 'The requested competition could not be found.',
          }).then(() => {
            this.backToList();
          });

          return;
        }

        this.form = {
          id: data.id ?? this.id,
          title: data.title ?? '',
          description: data.description ?? '',
          year: data.year ?? new Date().getFullYear(),
          thumbnailPath: data.thumbnailPath ?? null,
          registrationStartDate: this.toDateTimeLocal(data.registrationStartDate),
          registrationEndDate: this.toDateTimeLocal(data.registrationEndDate),
          startDate: this.toDateTimeLocal(data.startDate),
          endDate: this.toDateTimeLocal(data.endDate),
          maxParticipants: data.maxParticipants ?? null,
          displayOrder: data.displayOrder ?? 1,
          isActive: data.isActive ?? true,
          isRegistrationOpen: data.isRegistrationOpen ?? false,
          createdBy: data.createdBy ?? null,
          createdDate: data.createdDate ?? null,
          modifiedBy: data.modifiedBy ?? null,
          modifiedDate: data.modifiedDate ?? null,
        };

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error: any) => {
        this.loading = false;
        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Competition',
          text: error?.error?.message ?? 'Something went wrong while loading the competition.',
        });
      },
    });
  }

  // =========================================================
  // DATE FORMAT
  // =========================================================

  private toDateTimeLocal(value: string | null | undefined): string | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');

    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // =========================================================
  // SAVE
  // =========================================================

  save(): void {
    if (!this.form.title?.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Title Required',
        text: 'Please enter the competition title.',
      });

      return;
    }

    if (!this.form.year) {
      Swal.fire({
        icon: 'warning',
        title: 'Year Required',
        text: 'Please enter the competition year.',
      });

      return;
    }

    if (
      this.form.registrationStartDate &&
      this.form.registrationEndDate &&
      new Date(this.form.registrationStartDate) > new Date(this.form.registrationEndDate)
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Registration Dates',
        text: 'Registration start date cannot be after the registration end date.',
      });

      return;
    }

    if (
      this.form.startDate &&
      this.form.endDate &&
      new Date(this.form.startDate) > new Date(this.form.endDate)
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Competition Dates',
        text: 'Competition start date cannot be after the competition end date.',
      });

      return;
    }

    this.saving = true;

    const request = {
      id: this.form.id,
      title: this.form.title.trim(),
      description: this.form.description?.trim() || null,
      year: Number(this.form.year),
      thumbnailPath: this.form.thumbnailPath?.trim() || null,
      registrationStartDate: this.form.registrationStartDate || null,
      registrationEndDate: this.form.registrationEndDate || null,
      startDate: this.form.startDate || null,
      endDate: this.form.endDate || null,
      maxParticipants: this.form.maxParticipants ? Number(this.form.maxParticipants) : null,
      displayOrder: Number(this.form.displayOrder) || 1,
      isActive: this.form.isActive,
      isRegistrationOpen: this.form.isRegistrationOpen,
      userId: 1,
    };

    this.kidsService.saveCompetition(request).subscribe({
      next: (response: any) => {
        this.saving = false;

        if (response?.success === false) {
          Swal.fire({
            icon: 'warning',
            title: 'Not Saved',
            text: response?.message ?? 'Competition could not be saved.',
          });

          return;
        }

        Swal.fire({
          icon: 'success',
          title: this.id > 0 ? 'Competition Updated' : 'Competition Added',
          text: response?.message ?? 'Competition saved successfully.',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          this.backToList();
        });
      },

      error: (error: any) => {
        this.saving = false;

        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: error?.error?.message ?? 'Unable to save competition.',
        });
      },
    });
  }

  // =========================================================
  // CANCEL / BACK
  // =========================================================

  backToList(): void {
    this.router.navigate(['/admin/kids/competitions']);
  }
}
