import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';
import { KidsContent, SaveKidsContentRequest } from '@core/models/kids.model';

@Component({
  selector: 'app-bhajan-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bhajan-form.html',
  styleUrl: './bhajan-form.scss',
})
export class BhajanForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly kidsService = inject(KidsService);
  private cdr = inject(ChangeDetectorRef);
  bhajanForm!: FormGroup;

  id = 0;

  loading = false;
  saving = false;

  imagePreview = '';

  readonly ageGroups = ['All', 'Kids', '3 - 5 Years', '6 - 8 Years', '9 - 12 Years', '13+ Years'];

  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {
    this.createForm();

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id > 0) {
      this.id = id;
      this.loadBhajan();
    }
  }

  // =========================================================
  // FORM
  // =========================================================

  createForm(): void {
    this.bhajanForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(250)]],

      shortDescription: ['', Validators.maxLength(500)],

      singer: ['', Validators.maxLength(250)],

      duration: ['', Validators.maxLength(50)],

      ageGroup: ['All', Validators.maxLength(100)],

      description: [''],

      thumbnailPath: [''],

      mediaPath: [''],

      videoUrl: [''],

      displayOrder: [1, [Validators.required, Validators.min(0)]],

      isFeatured: [false],

      isActive: [true],
    });
  }

  // =========================================================
  // EDIT MODE
  // =========================================================

  get isEditMode(): boolean {
    return this.id > 0;
  }

  // =========================================================
  // LOAD BHAJAN
  // =========================================================

  loadBhajan(): void {
    this.loading = true;

    this.kidsService.getContentById(this.id).subscribe({
      next: (response: any) => {
        console.log('Bhajan API Response:', response);

        const item: KidsContent = response.content;

        console.log('Bhajan Item:', item);

        if (!item) {
          this.loading = false;
          this.cdr.detectChanges();

          Swal.fire({
            icon: 'warning',
            title: 'Bhajan Not Found',
            text: 'Unable to find the selected bhajan.',
          });

          return;
        }

        this.bhajanForm.patchValue({
          title: item.title ?? '',
          shortDescription: item.shortDescription ?? '',
          singer: item.singer ?? '',
          duration: item.duration ?? '',
          ageGroup: item.ageGroup ?? 'All',
          description: item.description ?? '',
          thumbnailPath: item.thumbnailPath ?? '',
          mediaPath: item.mediaPath ?? '',
          videoUrl: item.videoUrl ?? '',
          displayOrder: item.displayOrder ?? 1,
          isFeatured: item.isFeatured ?? false,
          isActive: item.isActive ?? true,
        });

        this.imagePreview = item.thumbnailPath ?? '';

        this.loading = false;

        this.cdr.detectChanges();

        console.log('Form After Patch:', this.bhajanForm.getRawValue());
      },

      error: (error) => {
        console.error('Load Bhajan Error:', error);

        this.loading = false;

        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Bhajan',
          text: error?.error?.message ?? 'Something went wrong.',
        });
      },
    });
  }

  // =========================================================
  // SAVE
  // =========================================================

  save(): void {
    if (this.bhajanForm.invalid) {
      this.bhajanForm.markAllAsTouched();

      Swal.fire({
        icon: 'warning',
        title: 'Required Fields',
        text: 'Please complete all required fields.',
      });

      return;
    }

    if (this.saving) {
      return;
    }

    const value = this.bhajanForm.getRawValue();

    const request: SaveKidsContentRequest = {
      id: this.id,

      contentType: 'Bhajan',

      title: value.title?.trim(),

      shortDescription: value.shortDescription?.trim() || null,

      description: value.description?.trim() || null,

      singer: value.singer?.trim() || null,

      thumbnailPath: value.thumbnailPath?.trim() || null,

      mediaPath: value.mediaPath?.trim() || null,

      videoUrl: value.videoUrl?.trim() || null,

      ageGroup: value.ageGroup || null,

      duration: value.duration?.trim() || null,

      displayOrder: Number(value.displayOrder) || 0,

      isFeatured: Boolean(value.isFeatured),

      isActive: Boolean(value.isActive),

      userId: 1,
    };

    this.saving = true;

    this.kidsService.saveContent(request).subscribe({
      next: (response) => {
        this.saving = false;

        Swal.fire({
          icon: 'success',

          title: this.isEditMode ? 'Bhajan Updated' : 'Bhajan Added',

          text:
            response?.message ??
            (this.isEditMode ? 'Bhajan updated successfully.' : 'Bhajan added successfully.'),

          timer: 1600,

          showConfirmButton: false,
        }).then(() => {
          this.goBack();
        });
      },

      error: (error) => {
        console.error('Save bhajan error:', error);

        this.saving = false;

        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: error?.error?.message ?? 'Unable to save bhajan.',
        });
      },
    });
  }

  // =========================================================
  // IMAGE PATH PREVIEW
  // =========================================================

  updateImagePreview(): void {
    const path = this.bhajanForm.get('thumbnailPath')?.value;

    this.imagePreview = path?.trim() ?? '';
  }

  // =========================================================
  // REMOVE IMAGE
  // =========================================================

  removeImage(): void {
    this.imagePreview = '';

    this.bhajanForm.patchValue({
      thumbnailPath: '',
    });
  }

  // =========================================================
  // IMAGE ERROR
  // =========================================================

  imageError(): void {
    this.imagePreview = '';
  }

  // =========================================================
  // BACK
  // =========================================================

  goBack(): void {
    this.router.navigate(['/admin/kids/bhajans']);
  }

  // =========================================================
  // VALIDATION
  // =========================================================

  isInvalid(controlName: string): boolean {
    const control = this.bhajanForm.get(controlName);

    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
