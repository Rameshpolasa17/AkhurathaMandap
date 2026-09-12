import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';
import { SaveKidsContentRequest } from '@core/models/kids.model';

@Component({
  selector: 'app-story-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './story-form.html',
  styleUrl: './story-form.scss',
})
export class StoryForm implements OnInit {
  private fb = inject(FormBuilder);

  private kidsService = inject(KidsService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  isEditMode = false;

  storyId = 0;

  saving = false;

  submitted = false;

  storyForm = this.fb.group({
    title: ['', Validators.required],

    shortDescription: [''],

    description: ['', Validators.required],

    thumbnailPath: [''],

    mediaPath: [''],

    videoUrl: [''],

    ageGroup: ['All'],

    duration: [''],

    displayOrder: [1, Validators.required],

    isFeatured: [false],

    isActive: [true],
  });

  ngOnInit(): void {
    this.storyId = Number(this.route.snapshot.paramMap.get('id'));

    this.isEditMode = this.storyId > 0;

    if (this.isEditMode) {
      this.loadStory();
    }
  }

  loadStory(): void {
    this.kidsService.getContentById(this.storyId).subscribe({
      next: (response: any) => {
        const story = response.content ?? response;

        this.storyForm.patchValue(story);
      },

      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Unable to load Story',
        });
      },
    });
  }

  saveStory(): void {
    this.submitted = true;

    if (this.storyForm.invalid || this.saving) {
      this.storyForm.markAllAsTouched();

      return;
    }

    this.saving = true;

    const form = this.storyForm.getRawValue();

    const request: SaveKidsContentRequest = {
      id: this.isEditMode ? this.storyId : 0,

      contentType: 'Story',

      title: form.title ?? '',

      shortDescription: form.shortDescription ?? '',

      description: form.description ?? '',

      thumbnailPath: form.thumbnailPath ?? '',

      mediaPath: form.mediaPath ?? '',

      videoUrl: form.videoUrl ?? '',

      ageGroup: form.ageGroup ?? 'All',

      duration: form.duration ?? '',

      displayOrder: Number(form.displayOrder ?? 1),

      isFeatured: form.isFeatured ?? false,

      isActive: form.isActive ?? true,
    };

    this.kidsService.saveContent(request).subscribe({
      next: (response: any) => {
        this.saving = false;

        if (response?.success === false) {
          Swal.fire({
            icon: 'warning',
            title: 'Not Saved',
            text: response.message,
          });

          return;
        }

        Swal.fire({
          icon: 'success',

          title: this.isEditMode ? 'Story Updated' : 'Story Added',

          timer: 1500,

          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/admin/kids/stories']);
        });
      },

      error: (error: any) => {
        this.saving = false;

        Swal.fire({
          icon: 'error',

          title: 'Save Failed',

          text: error?.error?.message ?? 'Unable to save story.',
        });
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/kids/stories']);
  }
}
