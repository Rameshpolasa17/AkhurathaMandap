import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { KidsContent } from '@core/models/kids.model';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-drawing-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './drawing-form.html',
  styleUrl: './drawing-form.scss',
})
export class DrawingForm implements OnInit {
  private readonly fb = inject(FormBuilder);

  private readonly kidsService = inject(KidsService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  private readonly cdr = inject(ChangeDetectorRef);

  drawingId = 0;

  loading = false;

  saving = false;

  submitted = false;

  isEditMode = false;

  drawingForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id > 0) {
      this.drawingId = id;

      this.isEditMode = true;

      this.loadDrawing();
    }
  }

  createForm(): void {
    this.drawingForm = this.fb.group({
      id: [0],

      contentType: ['Drawing'],

      title: ['', [Validators.required, Validators.maxLength(250)]],

      shortDescription: ['', Validators.maxLength(500)],

      description: [''],

      thumbnailPath: [''],

      mediaPath: [''],

      videoUrl: [''],

      ageGroup: ['All'],

      duration: [''],

      displayOrder: [1, [Validators.required, Validators.min(1)]],

      isFeatured: [false],

      isActive: [true],

      createdBy: [1],

      modifiedBy: [null],
    });
  }

  get f() {
    return this.drawingForm.controls;
  }

  loadDrawing(): void {
    this.loading = true;

    this.kidsService.getContentById(this.drawingId).subscribe({
      next: (response: any) => {
        /*
            API currently returns:

            {
              content: { ... },
              pages: []
            }
          */

        const drawing = response?.content ?? response;

        if (!drawing) {
          this.loading = false;

          Swal.fire({
            icon: 'warning',
            title: 'Drawing Not Found',
            text: 'The requested drawing could not be found.',
          });

          this.goBack();

          return;
        }

        this.drawingForm.patchValue({
          id: drawing.id ?? 0,

          contentType: drawing.contentType ?? 'Drawing',

          title: drawing.title ?? '',

          shortDescription: drawing.shortDescription ?? '',

          description: drawing.description ?? '',

          thumbnailPath: drawing.thumbnailPath ?? '',

          mediaPath: drawing.mediaPath ?? '',

          videoUrl: drawing.videoUrl ?? '',

          ageGroup: drawing.ageGroup ?? 'All',

          duration: drawing.duration ?? '',

          displayOrder: drawing.displayOrder ?? 1,

          isFeatured: drawing.isFeatured ?? false,

          isActive: drawing.isActive ?? true,

          createdBy: drawing.createdBy ?? 1,

          modifiedBy: 1,
        });

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Load Drawing Error:', error);

        this.loading = false;

        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Drawing',
          text: error?.error?.message ?? 'Something went wrong while loading the drawing.',
        });
      },
    });
  }

  saveDrawing(): void {
    this.submitted = true;

    if (this.drawingForm.invalid || this.saving) {
      this.drawingForm.markAllAsTouched();
      return;
    }

    this.saving = true;

    const formValue = this.drawingForm.getRawValue();

    const request: any = {
      ...formValue,

      id: this.isEditMode ? this.drawingId : 0,

      contentType: 'Drawing',

      displayOrder: Number(formValue.displayOrder),

      createdBy: formValue.createdBy ?? 1,

      modifiedBy: this.isEditMode ? 1 : null,
    };

    this.kidsService.saveContent(request).subscribe({
      next: (response: any) => {
        console.log('Save Drawing Response:', response);

        this.saving = false;

        if (response?.success === false) {
          Swal.fire({
            icon: 'warning',
            title: 'Not Saved',
            text: response?.message ?? 'Drawing could not be saved.',
          });

          return;
        }

        Swal.fire({
          icon: 'success',

          title: this.isEditMode ? 'Drawing Updated' : 'Drawing Added',

          text:
            response?.message ??
            (this.isEditMode ? 'Drawing updated successfully.' : 'Drawing added successfully.'),

          timer: 1500,

          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/admin/kids/drawing']);
        });
      },

      error: (error: any) => {
        console.error('Save Drawing Error:', error);

        this.saving = false;

        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: error?.error?.message ?? 'Unable to save drawing.',
        });
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/kids/drawing']);
  }

  imageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    image.src = 'images/defaults/no-image.png';
  }
}
