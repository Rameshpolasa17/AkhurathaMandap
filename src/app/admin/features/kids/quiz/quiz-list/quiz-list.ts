import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';
import { Quiz } from '@core/models/kids.model';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.scss',
})
export class QuizList implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  quizzes: Quiz[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.loading = true;

    this.kidsService.getQuizzes().subscribe({
      next: (response: Quiz[]) => {
        this.quizzes = response ?? [];
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.loading = false;

        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Quizzes',
          text: error?.error?.message ?? 'Something went wrong while loading quizzes.',
        });
      },
    });
  }

  addQuiz(): void {
    this.router.navigate(['/admin/kids/quiz/add']);
  }

  editQuiz(id: number): void {
    this.router.navigate(['/admin/kids/quiz/edit', id]);
  }

  manageQuestions(id: number): void {
    this.router.navigate(['/admin/kids/quiz', id, 'questions']);
  }

  deleteQuiz(quiz: Quiz): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Quiz?',
      text: quiz.title,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.kidsService.deleteQuiz(quiz.id).subscribe({
        next: (response: any) => {
          if (response?.success === false) {
            Swal.fire({
              icon: 'warning',
              title: 'Not Deleted',
              text: response?.message ?? 'Quiz could not be deleted.',
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: response?.message ?? 'Quiz deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this.loadQuizzes();
          });
        },

        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete quiz.',
          });
        },
      });
    });
  }

  getStatusText(isActive: boolean): string {
    return isActive ? 'Active' : 'Inactive';
  }
}
