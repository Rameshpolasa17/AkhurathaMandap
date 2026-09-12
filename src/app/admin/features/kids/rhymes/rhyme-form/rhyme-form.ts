import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { KidsService } from '@core/services/kids.service';
import { SaveKidsContentRequest } from '@core/models/kids.model';

@Component({
  selector: 'app-rhyme-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rhyme-form.html',
  styleUrl: './rhyme-form.scss',
})
export class RhymeForm implements OnInit {
  private fb = inject(FormBuilder);
  private kidsService = inject(KidsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  rhymeId = 0;
  isEditMode = false;
  saving = false;

  form = this.fb.nonNullable.group({
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
    this.rhymeId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = this.rhymeId > 0;

    if (this.isEditMode) {
      this.loadRhyme();
    }
  }

  loadRhyme(): void {
    this.kidsService.getContentById(this.rhymeId).subscribe({
      next: (response: any) => {
        this.form.patchValue(response.content ?? response);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Unable to load rhyme',
        });
      },
    });
  }

  saveRhyme(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const value = this.form.getRawValue();

    const request: SaveKidsContentRequest = {
      id: this.rhymeId,
      contentType: 'Rhyme',
      title: value.title,
      shortDescription: value.shortDescription,
      description: value.description,
      thumbnailPath: value.thumbnailPath,
      mediaPath: value.mediaPath,
      videoUrl: value.videoUrl,
      ageGroup: value.ageGroup,
      duration: value.duration,
      displayOrder: Number(value.displayOrder),
      isFeatured: value.isFeatured,
      isActive: value.isActive,
    };

    this.kidsService.saveContent(request).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.isEditMode ? 'Rhyme Updated' : 'Rhyme Added',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/admin/kids/rhymes']);
        });
      },
      error: () => {
        this.saving = false;

        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: 'Unable to save rhyme.',
        });
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/kids/rhymes']);
  }
}
