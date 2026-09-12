import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface ShadowOption {
  id: number;
  image: string;
  name: string;
}

interface ShadowQuestion {
  id: number;
  title: string;
  description: string;
  image: string;
  correctShadowId: number;
  options: ShadowOption[];
}

@Component({
  selector: 'app-match-shadow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-shadow.html',
  styleUrl: './match-shadow.scss',
})
export class MatchShadow implements OnInit, OnDestroy {
  /*=========================================================
                      GAME DATA
  =========================================================*/

  questions: ShadowQuestion[] = [
    {
      id: 1,
      title: 'Modak',
      description: 'Find the shadow that matches this delicious Modak.',
      image: 'images/puzzles/modak.png',
      correctShadowId: 1,

      options: [
        {
          id: 1,
          name: 'Modak',
          image: 'images/puzzles/shadows/modak-shadow.png',
        },
        {
          id: 2,
          name: 'Mouse',
          image: 'images/puzzles/shadows/mouse-shadow.png',
        },
        {
          id: 3,
          name: 'Lotus',
          image: 'images/puzzles/shadows/lotus-shadow.png',
        },
        {
          id: 4,
          name: 'Diya',
          image: 'images/puzzles/shadows/diya-shadow.png',
        },
      ],
    },

    {
      id: 2,
      title: 'Mushika',
      description: 'Can you find the correct shadow of Ganesha’s little mouse?',
      image: 'images/puzzles/mouse.png',
      correctShadowId: 2,

      options: [
        {
          id: 1,
          name: 'Modak',
          image: 'images/puzzles/shadows/modak-shadow.png',
        },
        {
          id: 2,
          name: 'Mouse',
          image: 'images/puzzles/shadows/mouse-shadow.png',
        },
        {
          id: 3,
          name: 'Lotus',
          image: 'images/puzzles/shadows/lotus-shadow.png',
        },
        {
          id: 4,
          name: 'Diya',
          image: 'images/puzzles/shadows/diya-shadow.png',
        },
      ],
    },

    {
      id: 3,
      title: 'Lotus',
      description: 'Look carefully and select the matching Lotus shadow.',
      image: 'images/puzzles/lotus.png',
      correctShadowId: 3,

      options: [
        {
          id: 1,
          name: 'Modak',
          image: 'images/puzzles/shadows/modak-shadow.png',
        },
        {
          id: 2,
          name: 'Mouse',
          image: 'images/puzzles/shadows/mouse-shadow.png',
        },
        {
          id: 3,
          name: 'Lotus',
          image: 'images/puzzles/shadows/lotus-shadow.png',
        },
        {
          id: 4,
          name: 'Diya',
          image: 'images/puzzles/shadows/diya-shadow.png',
        },
      ],
    },

    {
      id: 4,
      title: 'Diya',
      description: 'Which shadow belongs to this beautiful festival Diya?',
      image: 'images/puzzles/diya.png',
      correctShadowId: 4,

      options: [
        {
          id: 1,
          name: 'Modak',
          image: 'images/puzzles/shadows/modak-shadow.png',
        },
        {
          id: 2,
          name: 'Mouse',
          image: 'images/puzzles/shadows/mouse-shadow.png',
        },
        {
          id: 3,
          name: 'Lotus',
          image: 'images/puzzles/shadows/lotus-shadow.png',
        },
        {
          id: 4,
          name: 'Diya',
          image: 'images/puzzles/shadows/diya-shadow.png',
        },
      ],
    },

    {
      id: 5,
      title: 'Lord Ganesha',
      description: 'Find the shadow that perfectly matches Lord Ganesha.',
      image: 'images/puzzles/ganesha.png',
      correctShadowId: 5,

      options: [
        {
          id: 5,
          name: 'Ganesha',
          image: 'images/puzzles/shadows/ganesha-shadow.png',
        },
        {
          id: 3,
          name: 'Lotus',
          image: 'images/puzzles/shadows/lotus-shadow.png',
        },
        {
          id: 2,
          name: 'Mouse',
          image: 'images/puzzles/shadows/mouse-shadow.png',
        },
        {
          id: 6,
          name: 'Kalash',
          image: 'images/puzzles/shadows/kalash-shadow.png',
        },
      ],
    },

    {
      id: 6,
      title: 'Kalash',
      description: 'Choose the correct shadow for this traditional Kalash.',
      image: 'images/puzzles/kalash.png',
      correctShadowId: 6,

      options: [
        {
          id: 6,
          name: 'Kalash',
          image: 'images/puzzles/shadows/kalash-shadow.png',
        },
        {
          id: 4,
          name: 'Diya',
          image: 'images/puzzles/shadows/diya-shadow.png',
        },
        {
          id: 1,
          name: 'Modak',
          image: 'images/puzzles/shadows/modak-shadow.png',
        },
        {
          id: 3,
          name: 'Lotus',
          image: 'images/puzzles/shadows/lotus-shadow.png',
        },
      ],
    },
  ];

  /*=========================================================
                    CURRENT GAME
  =========================================================*/

  currentQuestionIndex = 0;

  selectedOption: ShadowOption | null = null;

  shuffledOptions: ShadowOption[] = [];

  answerChecked = false;

  isCorrect = false;

  /*=========================================================
                      GAME STATS
  =========================================================*/

  score = 0;

  correctAnswers = 0;

  wrongAnswers = 0;

  attempts = 0;

  timer = 0;

  gameCompleted = false;

  intervalId: ReturnType<typeof setInterval> | null = null;

  /*=========================================================
                      MESSAGE
  =========================================================*/

  message = '';

  messageType: 'success' | 'error' | '' = '';

  /*=========================================================
                      INIT
  =========================================================*/

  ngOnInit(): void {
    this.startGame();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  /*=========================================================
                    CURRENT QUESTION
  =========================================================*/

  get currentQuestion(): ShadowQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  /*=========================================================
                      START GAME
  =========================================================*/

  startGame(): void {
    this.stopTimer();

    this.currentQuestionIndex = 0;

    this.selectedOption = null;

    this.answerChecked = false;

    this.isCorrect = false;

    this.score = 0;

    this.correctAnswers = 0;

    this.wrongAnswers = 0;

    this.attempts = 0;

    this.timer = 0;

    this.gameCompleted = false;

    this.message = '';

    this.messageType = '';

    this.prepareQuestion();

    this.startTimer();
  }

  /*=========================================================
                  PREPARE QUESTION
  =========================================================*/

  prepareQuestion(): void {
    this.selectedOption = null;

    this.answerChecked = false;

    this.isCorrect = false;

    this.message = '';

    this.messageType = '';

    this.shuffledOptions = this.shuffleArray(this.currentQuestion.options);
  }

  /*=========================================================
                      SHUFFLE
  =========================================================*/

  shuffleArray<T>(items: T[]): T[] {
    const array = [...items];

    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
  }

  /*=========================================================
                    SELECT SHADOW
  =========================================================*/

  selectShadow(option: ShadowOption): void {
    if (this.answerChecked || this.gameCompleted) {
      return;
    }

    this.selectedOption = option;

    this.message = '';

    this.messageType = '';
  }

  /*=========================================================
                    CHECK ANSWER
  =========================================================*/

  checkAnswer(): void {
    if (!this.selectedOption) {
      this.showMessage('Please select a shadow first.', 'error');

      return;
    }

    if (this.answerChecked) {
      return;
    }

    this.answerChecked = true;

    this.attempts++;

    if (this.selectedOption.id === this.currentQuestion.correctShadowId) {
      this.handleCorrectAnswer();
    } else {
      this.handleWrongAnswer();
    }
  }

  /*=========================================================
                    CORRECT ANSWER
  =========================================================*/

  handleCorrectAnswer(): void {
    this.isCorrect = true;

    this.correctAnswers++;

    /*
      Base score for every correct answer
    */

    this.score += 100;

    /*
      Small speed bonus
    */

    if (this.timer <= 30) {
      this.score += 50;
    } else if (this.timer <= 60) {
      this.score += 25;
    }

    this.showMessage(
      `🎉 Excellent! You found the ${this.currentQuestion.title} shadow.`,
      'success',
    );
  }

  /*=========================================================
                    WRONG ANSWER
  =========================================================*/

  handleWrongAnswer(): void {
    this.isCorrect = false;

    this.wrongAnswers++;

    this.showMessage('Not quite! Look carefully at the shape.', 'error');
  }

  /*=========================================================
                    OPTION STATUS
  =========================================================*/

  isSelected(option: ShadowOption): boolean {
    return this.selectedOption?.id === option.id;
  }

  isCorrectOption(option: ShadowOption): boolean {
    return this.answerChecked && option.id === this.currentQuestion.correctShadowId;
  }

  isWrongOption(option: ShadowOption): boolean {
    return (
      this.answerChecked &&
      this.selectedOption?.id === option.id &&
      option.id !== this.currentQuestion.correctShadowId
    );
  }

  /*=========================================================
                    NEXT QUESTION
  =========================================================*/

  nextQuestion(): void {
    if (!this.answerChecked) {
      return;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;

      this.prepareQuestion();

      return;
    }

    this.completeGame();
  }

  /*=========================================================
                    COMPLETE GAME
  =========================================================*/

  completeGame(): void {
    this.gameCompleted = true;

    this.stopTimer();

    /*
      Perfect game bonus
    */

    if (this.correctAnswers === this.questions.length) {
      this.score += 500;
    }
  }

  /*=========================================================
                      RESTART
  =========================================================*/

  restartGame(): void {
    this.startGame();
  }

  /*=========================================================
                      TIMER
  =========================================================*/

  startTimer(): void {
    this.stopTimer();

    this.intervalId = setInterval(() => {
      if (!this.gameCompleted) {
        this.timer++;
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);

      this.intervalId = null;
    }
  }

  /*=========================================================
                    FORMAT TIME
  =========================================================*/

  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60)
      .toString()
      .padStart(2, '0');

    const seconds = (this.timer % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  /*=========================================================
                      PROGRESS
  =========================================================*/

  get progress(): number {
    if (this.questions.length === 0) {
      return 0;
    }

    /*
      If current answer is checked, include the
      current question in progress.
    */

    const completed = this.currentQuestionIndex + (this.answerChecked ? 1 : 0);

    return Math.round((completed / this.questions.length) * 100);
  }

  /*=========================================================
                  QUESTION NUMBER
  =========================================================*/

  get currentQuestionNumber(): number {
    return this.currentQuestionIndex + 1;
  }

  /*=========================================================
                    ACCURACY
  =========================================================*/

  get accuracy(): number {
    if (this.attempts === 0) {
      return 0;
    }

    return Math.round((this.correctAnswers / this.attempts) * 100);
  }

  /*=========================================================
                      RESULT TITLE
  =========================================================*/

  get resultTitle(): string {
    const percentage = (this.correctAnswers / this.questions.length) * 100;

    if (percentage === 100) {
      return 'Shadow Master!';
    }

    if (percentage >= 80) {
      return 'Amazing Work!';
    }

    if (percentage >= 60) {
      return 'Great Job!';
    }

    return 'Good Try!';
  }

  /*=========================================================
                    RESULT MESSAGE
  =========================================================*/

  get resultMessage(): string {
    const percentage = (this.correctAnswers / this.questions.length) * 100;

    if (percentage === 100) {
      return 'Perfect! You matched every object with its correct shadow.';
    }

    if (percentage >= 80) {
      return 'Excellent observation skills. You matched almost every shadow!';
    }

    if (percentage >= 60) {
      return 'You did very well. Play again and try for a perfect score!';
    }

    return 'Keep practicing your observation skills and try the challenge again.';
  }

  /*=========================================================
                      MESSAGE
  =========================================================*/

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;

    this.messageType = type;
  }
}
