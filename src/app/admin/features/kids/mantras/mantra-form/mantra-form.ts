import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { KidsService } from '@core/services/kids.service';
import { SaveKidsContentRequest } from '@core/models/kids.model';

@Component({
  selector: 'app-mantra-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mantra-form.html',
  styleUrl: './mantra-form.scss',
})
export class MantraForm implements OnInit {
  private fb = inject(FormBuilder);
  private kidsService = inject(KidsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  mantraId = 0;
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
    this.mantraId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = this.mantraId > 0;
    if (this.isEditMode) this.loadMantra();
  }

  loadMantra(): void {
    this.kidsService.getContentById(this.mantraId).subscribe({
      next: (res: any) => this.form.patchValue(res.content ?? res),
      error: () => Swal.fire('Error', 'Unable to load mantra.', 'error'),
    });
  }

  saveMantra(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;

    const request: SaveKidsContentRequest = {
      id: this.mantraId,
      contentType: 'Mantra',
      title: this.form.value.title!,
      shortDescription: this.form.value.shortDescription!,
      description: this.form.value.description!,
      thumbnailPath: this.form.value.thumbnailPath!,
      mediaPath: this.form.value.mediaPath!,
      videoUrl: this.form.value.videoUrl!,
      ageGroup: this.form.value.ageGroup!,
      duration: this.form.value.duration!,
      displayOrder: Number(this.form.value.displayOrder),
      isFeatured: this.form.value.isFeatured!,
      isActive: this.form.value.isActive!,
    };

    this.kidsService.saveContent(request).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.isEditMode ? 'Mantra Updated' : 'Mantra Added',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => this.router.navigate(['/admin/kids/mantras']));
      },
      error: () => {
        this.saving = false;
        Swal.fire('Error', 'Unable to save mantra.', 'error');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/kids/mantras']);
  }
}
