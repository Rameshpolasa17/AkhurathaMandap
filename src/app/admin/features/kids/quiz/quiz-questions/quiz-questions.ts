import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';
import { QuizQuestion } from '@core/models/kids.model';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-questions.html',
  styleUrl: './quiz-questions.scss',
})
export class QuizQuestions implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  quizId = 0;
  questions: QuizQuestion[] = [];
  loading = false;

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));

    if (this.quizId <= 0) {
      this.backToQuizzes();
      return;
    }

    this.loadQuestions();
  }

  loadQuestions(): void {
    this.loading = true;

    this.kidsService.getQuizQuestions(this.quizId).subscribe({
      next: (response) => {
        this.questions = response ?? [];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Questions',
          text: error?.error?.message ?? 'Something went wrong while loading questions.',
        });
      },
    });
  }

  addQuestion(): void {
    this.router.navigate(['/admin/kids/quiz', this.quizId, 'questions', 'add']);
  }

  editQuestion(id: number): void {
    this.router.navigate(['/admin/kids/quiz', this.quizId, 'questions', 'edit', id]);
  }

  deleteQuestion(question: QuizQuestion): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Question?',
      text: question.question,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.kidsService.deleteQuizQuestion(question.id).subscribe({
        next: (response) => {
          if (response?.success === false) {
            Swal.fire({
              icon: 'warning',
              title: 'Not Deleted',
              text: response?.message ?? 'Question could not be deleted.',
            });

            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: response?.message ?? 'Question deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadQuestions();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete question.',
          });
        },
      });
    });
  }

  backToQuizzes(): void {
    this.router.navigate(['/admin/kids/quiz']);
  }
}
