import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';
import {
  QuizQuestion,
  QuizOption,
  SaveQuizQuestionRequest,
  SaveQuizOptionRequest,
} from '@core/models/kids.model';

@Component({
  selector: 'app-question-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-form.html',
  styleUrl: './question-form.scss',
})
export class QuestionForm implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  quizId = 0;
  id = 0;
  loading = false;
  saving = false;

  form: SaveQuizQuestionRequest = {
    id: 0,
    quizId: 0,
    question: '',
    imagePath: null,
    explanation: null,
    points: 1,
    displayOrder: 1,
    isActive: true,
    userId: 1,
  };

  options: QuizOption[] = [
    {
      id: 0,
      questionId: 0,
      optionText: '',
      imagePath: null,
      isCorrect: true,
      displayOrder: 1,
      isActive: true,
    },
    {
      id: 0,
      questionId: 0,
      optionText: '',
      imagePath: null,
      isCorrect: false,
      displayOrder: 2,
      isActive: true,
    },
    {
      id: 0,
      questionId: 0,
      optionText: '',
      imagePath: null,
      isCorrect: false,
      displayOrder: 3,
      isActive: true,
    },
    {
      id: 0,
      questionId: 0,
      optionText: '',
      imagePath: null,
      isCorrect: false,
      displayOrder: 4,
      isActive: true,
    },
  ];

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form.quizId = this.quizId;

    if (this.quizId <= 0) {
      this.backToQuestions();
      return;
    }

    if (this.id > 0) {
      this.loadQuestion();
    }
  }

  loadQuestion(): void {
    this.loading = true;

    this.kidsService.getQuizById(this.quizId).subscribe({
      next: (response) => {
        const questions: QuizQuestion[] = response?.questions ?? [];

        const question = questions.find((item) => item.id === this.id);

        if (!question) {
          this.loading = false;

          Swal.fire({
            icon: 'warning',
            title: 'Question Not Found',
            text: 'The requested question could not be found.',
          }).then(() => {
            this.backToQuestions();
          });

          return;
        }

        this.form = {
          id: question.id,
          quizId: question.quizId || this.quizId,
          question: question.question ?? '',
          imagePath: question.imagePath ?? null,
          explanation: question.explanation ?? null,
          points: question.points ?? 1,
          displayOrder: question.displayOrder ?? 1,
          isActive: question.isActive ?? true,
          userId: 1,
        };

        this.options = (question.options ?? []).map((option) => ({
          id: option.id,
          questionId: option.questionId,
          optionText: option.optionText ?? '',
          imagePath: option.imagePath ?? null,
          isCorrect: option.isCorrect ?? false,
          displayOrder: option.displayOrder ?? 1,
          isActive: option.isActive ?? true,
        }));

        if (this.options.length === 0) {
          this.addDefaultOptions();
        }

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Question',
          text: error?.error?.message ?? 'Something went wrong while loading the question.',
        });
      },
    });
  }

  addDefaultOptions(): void {
    this.options = [
      this.createOption(1, true),
      this.createOption(2, false),
      this.createOption(3, false),
      this.createOption(4, false),
    ];
  }

  createOption(displayOrder: number, isCorrect: boolean): QuizOption {
    return {
      id: 0,
      questionId: this.id,
      optionText: '',
      imagePath: null,
      isCorrect,
      displayOrder,
      isActive: true,
    };
  }

  addOption(): void {
    this.options.push(this.createOption(this.options.length + 1, false));
  }

  removeOption(index: number): void {
    if (this.options.length <= 2) {
      Swal.fire({
        icon: 'warning',
        title: 'Minimum Options Required',
        text: 'A question must have at least two options.',
      });

      return;
    }

    this.options.splice(index, 1);

    this.options.forEach((option, i) => {
      option.displayOrder = i + 1;
    });
  }

  setCorrectOption(index: number): void {
    this.options.forEach((option, i) => {
      option.isCorrect = i === index;
    });
  }

  save(): void {
    if (!this.form.question.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Question Required',
        text: 'Please enter the question.',
      });

      return;
    }

    if (this.options.length < 2) {
      Swal.fire({
        icon: 'warning',
        title: 'Options Required',
        text: 'Please add at least two options.',
      });

      return;
    }

    const emptyOption = this.options.some((option) => !option.optionText.trim());

    if (emptyOption) {
      Swal.fire({
        icon: 'warning',
        title: 'Option Required',
        text: 'Please enter text for every option.',
      });

      return;
    }

    const correctCount = this.options.filter((option) => option.isCorrect).length;

    if (correctCount !== 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Correct Answer Required',
        text: 'Please select exactly one correct answer.',
      });

      return;
    }

    this.saving = true;

    const questionRequest: SaveQuizQuestionRequest = {
      id: this.form.id,
      quizId: this.quizId,
      question: this.form.question.trim(),
      imagePath: this.form.imagePath?.trim() || null,
      explanation: this.form.explanation?.trim() || null,
      points: Number(this.form.points),
      displayOrder: Number(this.form.displayOrder),
      isActive: this.form.isActive,
      userId: this.form.userId,
    };

    this.kidsService.saveQuizQuestion(questionRequest).subscribe({
      next: (response) => {
        const questionId = Number(response?.id ?? response?.Id ?? response);

        if (questionId <= 0 && this.form.id <= 0) {
          this.saving = false;

          Swal.fire({
            icon: 'error',
            title: 'Save Failed',
            text: 'Question ID was not returned.',
          });

          return;
        }

        const savedQuestionId = questionId > 0 ? questionId : this.form.id;

        this.saveOptions(savedQuestionId);
      },
      error: (error) => {
        this.saving = false;

        Swal.fire({
          icon: 'error',
          title: 'Save Failed',
          text: error?.error?.message ?? 'Unable to save question.',
        });
      },
    });
  }

  saveOptions(questionId: number): void {
    let completed = 0;

    const total = this.options.length;

    this.options.forEach((option) => {
      const request: SaveQuizOptionRequest = {
        id: option.id ?? 0,
        questionId,
        optionText: option.optionText.trim(),
        imagePath: option.imagePath?.trim() || null,
        isCorrect: option.isCorrect,
        displayOrder: option.displayOrder,
        isActive: option.isActive,
        userId: this.form.userId,
      };

      this.kidsService.saveQuizOption(request).subscribe({
        next: () => {
          completed++;

          if (completed === total) {
            this.saving = false;

            Swal.fire({
              icon: 'success',
              title: this.form.id > 0 ? 'Question Updated' : 'Question Added',
              text: 'Question and options saved successfully.',
              timer: 1500,
              showConfirmButton: false,
            }).then(() => {
              this.backToQuestions();
            });
          }
        },
        error: (error) => {
          this.saving = false;

          Swal.fire({
            icon: 'error',
            title: 'Option Save Failed',
            text: error?.error?.message ?? 'Question was saved, but an option could not be saved.',
          });
        },
      });
    });
  }

  backToQuestions(): void {
    this.router.navigate(['/admin/kids/quiz', this.quizId, 'questions']);
  }
}
