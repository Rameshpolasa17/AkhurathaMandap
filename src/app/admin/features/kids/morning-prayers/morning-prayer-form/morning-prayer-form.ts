import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { KidsService } from '@core/services/kids.service';
import { SaveKidsContentRequest } from '@core/models/kids.model';

@Component({
  selector: 'app-morning-prayer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './morning-prayer-form.html',
  styleUrl: './morning-prayer-form.scss',
})
export class MorningPrayerForm implements OnInit {
  private fb = inject(FormBuilder);
  private kidsService = inject(KidsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  prayerId = 0;
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
    this.prayerId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = this.prayerId > 0;

    if (this.isEditMode) {
      this.loadPrayer();
    }
  }

  loadPrayer(): void {
    this.kidsService.getContentById(this.prayerId).subscribe({
      next: (res: any) => {
        this.form.patchValue(res.content ?? res);
      },
      error: () => {
        Swal.fire('Error', 'Unable to load prayer.', 'error');
      },
    });
  }

  savePrayer(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const value = this.form.getRawValue();

    const request: SaveKidsContentRequest = {
      id: this.prayerId,
      contentType: 'MorningPrayer',
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
          title: this.isEditMode ? 'Prayer Updated' : 'Prayer Added',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/admin/kids/morning-prayers']);
        });
      },
      error: () => {
        this.saving = false;

        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: 'Unable to save Morning Prayer.',
        });
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/kids/morning-prayers']);
  }
}
