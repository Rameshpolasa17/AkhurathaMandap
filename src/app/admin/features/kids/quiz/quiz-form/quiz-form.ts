import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-form.html',
  styleUrl: './quiz-form.scss',
})
export class QuizForm implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  id = 0;
  loading = false;
  saving = false;

  form = {
    id: 0,
    title: '',
    description: '',
    level: '',
    thumbnailPath: '',
    timeLimitSeconds: 300,
    passingPercentage: 60,
    certificatePercentage: 80,
    displayOrder: 1,
    isActive: true,
    userId: 1,
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id > 0) {
      this.id = id;
      this.loadQuiz(id);
    }
  }

  loadQuiz(id: number): void {
    this.loading = true;

    this.kidsService.getQuizById(id).subscribe({
      next: (response) => {
        const quiz = response?.quiz ?? response;

        if (!quiz) {
          this.loading = false;
          return;
        }

        this.form = {
          id: quiz.id ?? 0,
          title: quiz.title ?? '',
          description: quiz.description ?? '',
          level: quiz.level ?? '',
          thumbnailPath: quiz.thumbnailPath ?? '',
          timeLimitSeconds: quiz.timeLimitSeconds ?? 300,
          passingPercentage: quiz.passingPercentage ?? 60,
          certificatePercentage: quiz.certificatePercentage ?? 80,
          displayOrder: quiz.displayOrder ?? 1,
          isActive: quiz.isActive ?? true,
          userId: 1,
        };

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Quiz',
          text: error?.error?.message ?? 'Something went wrong while loading the quiz.',
        });
      },
    });
  }

  save(): void {
    if (!this.form.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Title Required',
        text: 'Please enter a quiz title.',
      });
      return;
    }

    this.saving = true;

    const request = {
      id: this.form.id,
      title: this.form.title.trim(),
      description: this.form.description?.trim() || null,
      level: this.form.level?.trim() || null,
      thumbnailPath: this.form.thumbnailPath?.trim() || null,
      timeLimitSeconds: Number(this.form.timeLimitSeconds),
      passingPercentage: Number(this.form.passingPercentage),
      certificatePercentage: Number(this.form.certificatePercentage),
      displayOrder: Number(this.form.displayOrder),
      isActive: this.form.isActive,
      userId: this.form.userId,
    };

    this.kidsService.saveQuiz(request).subscribe({
      next: (response) => {
        this.saving = false;

        const savedId = Number(response?.id ?? response) || this.form.id;

        Swal.fire({
          icon: 'success',
          title: this.form.id > 0 ? 'Quiz Updated' : 'Quiz Created',
          text: response?.message ?? 'Quiz saved successfully.',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          if (savedId > 0) {
            this.router.navigate(['/admin/kids/quiz']);
          } else {
            this.router.navigate(['/admin/kids/quiz']);
          }
        });
      },
      error: (error) => {
        this.saving = false;

        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: error?.error?.message ?? 'Unable to save quiz.',
        });
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/kids/quiz']);
  }
}
