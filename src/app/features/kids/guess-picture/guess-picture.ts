import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface GuessOption {
  id: number;
  name: string;
}

interface GuessQuestion {
  id: number;
  image: string;
  title: string;
  category: string;
  hint: string;
  funFact: string;
  correctAnswerId: number;
  options: GuessOption[];
}

@Component({
  selector: 'app-guess-picture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guess-picture.html',
  styleUrl: './guess-picture.scss',
})
export class GuessPicture implements OnInit, OnDestroy {
  /*=========================================================
                        QUESTIONS
  =========================================================*/

  questions: GuessQuestion[] = [
    {
      id: 1,
      image: 'images/puzzles/guess/ganesha.png',
      title: 'Who Is This?',
      category: 'Divine',
      hint: 'He is known as the remover of obstacles.',
      funFact: 'Lord Ganesha is worshipped before beginning important and auspicious activities.',
      correctAnswerId: 1,
      options: [
        {
          id: 1,
          name: 'Lord Ganesha',
        },
        {
          id: 2,
          name: 'Lord Krishna',
        },
        {
          id: 3,
          name: 'Lord Hanuman',
        },
        {
          id: 4,
          name: 'Lord Shiva',
        },
      ],
    },

    {
      id: 2,
      image: 'images/puzzles/guess/modak.png',
      title: 'What Is This?',
      category: 'Favorite Food',
      hint: 'It is one of Lord Ganesha’s favorite sweets.',
      funFact:
        'Modak is traditionally prepared during Ganesh Chaturthi and offered to Lord Ganesha.',
      correctAnswerId: 2,
      options: [
        {
          id: 1,
          name: 'Laddu',
        },
        {
          id: 2,
          name: 'Modak',
        },
        {
          id: 3,
          name: 'Jalebi',
        },
        {
          id: 4,
          name: 'Kaju Katli',
        },
      ],
    },

    {
      id: 3,
      image: 'images/puzzles/guess/mouse.png',
      title: 'Can You Identify This?',
      category: 'Ganesha',
      hint: 'This little animal is associated with Lord Ganesha.',
      funFact: 'Mushika, the mouse, is traditionally represented as the vehicle of Lord Ganesha.',
      correctAnswerId: 3,
      options: [
        {
          id: 1,
          name: 'Rabbit',
        },
        {
          id: 2,
          name: 'Squirrel',
        },
        {
          id: 3,
          name: 'Mouse',
        },
        {
          id: 4,
          name: 'Deer',
        },
      ],
    },

    {
      id: 4,
      image: 'images/puzzles/guess/lotus.png',
      title: 'Name This Flower',
      category: 'Nature',
      hint: 'It is a sacred flower often seen in Indian traditions.',
      funFact: 'The lotus is an important symbol of purity, beauty and spiritual growth.',
      correctAnswerId: 1,
      options: [
        {
          id: 1,
          name: 'Lotus',
        },
        {
          id: 2,
          name: 'Rose',
        },
        {
          id: 3,
          name: 'Jasmine',
        },
        {
          id: 4,
          name: 'Sunflower',
        },
      ],
    },

    {
      id: 5,
      image: 'images/puzzles/guess/diya.png',
      title: 'What Is This?',
      category: 'Festival',
      hint: 'We light this during puja and festivals.',
      funFact:
        'Lighting a diya is traditionally associated with light, positivity and auspiciousness.',
      correctAnswerId: 4,
      options: [
        {
          id: 1,
          name: 'Kalash',
        },
        {
          id: 2,
          name: 'Bell',
        },
        {
          id: 3,
          name: 'Incense Holder',
        },
        {
          id: 4,
          name: 'Diya',
        },
      ],
    },

    {
      id: 6,
      image: 'images/puzzles/guess/kalash.png',
      title: 'Guess This Object',
      category: 'Tradition',
      hint: 'It is a sacred pot used during many Hindu ceremonies.',
      funFact: 'A Kalash is commonly used during puja and other auspicious ceremonies.',
      correctAnswerId: 2,
      options: [
        {
          id: 1,
          name: 'Diya',
        },
        {
          id: 2,
          name: 'Kalash',
        },
        {
          id: 3,
          name: 'Temple Bell',
        },
        {
          id: 4,
          name: 'Coconut',
        },
      ],
    },

    {
      id: 7,
      image: 'images/puzzles/guess/coconut.png',
      title: 'Can You Guess?',
      category: 'Puja',
      hint: 'This fruit is commonly offered during puja.',
      funFact:
        'Coconut is widely used as an offering during religious ceremonies and auspicious occasions.',
      correctAnswerId: 3,
      options: [
        {
          id: 1,
          name: 'Mango',
        },
        {
          id: 2,
          name: 'Pomegranate',
        },
        {
          id: 3,
          name: 'Coconut',
        },
        {
          id: 4,
          name: 'Banana',
        },
      ],
    },

    {
      id: 8,
      image: 'images/puzzles/guess/bell.png',
      title: 'What Is This?',
      category: 'Temple',
      hint: 'You may hear its sound when entering or praying in a temple.',
      funFact: 'Temple bells are traditionally rung during worship and religious ceremonies.',
      correctAnswerId: 1,
      options: [
        {
          id: 1,
          name: 'Temple Bell',
        },
        {
          id: 2,
          name: 'Drum',
        },
        {
          id: 3,
          name: 'Kalash',
        },
        {
          id: 4,
          name: 'Lamp',
        },
      ],
    },
  ];

  /*=========================================================
                    CURRENT GAME STATE
  =========================================================*/

  currentQuestionIndex = 0;

  selectedOption: GuessOption | null = null;

  shuffledOptions: GuessOption[] = [];

  answerChecked = false;

  isCorrect = false;

  gameCompleted = false;

  /*=========================================================
                      IMAGE REVEAL
  =========================================================*/

  revealLevel = 0;

  maxRevealLevel = 3;

  /*=========================================================
                          HINT
  =========================================================*/

  hintVisible = false;

  hintUsed = false;

  /*=========================================================
                        GAME STATS
  =========================================================*/

  score = 0;

  correctAnswers = 0;

  wrongAnswers = 0;

  attempts = 0;

  streak = 0;

  bestStreak = 0;

  /*=========================================================
                          TIMER
  =========================================================*/

  timer = 0;

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

  get currentQuestion(): GuessQuestion {
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

    this.gameCompleted = false;

    this.revealLevel = 0;

    this.hintVisible = false;

    this.hintUsed = false;

    this.score = 0;

    this.correctAnswers = 0;

    this.wrongAnswers = 0;

    this.attempts = 0;

    this.streak = 0;

    this.bestStreak = 0;

    this.timer = 0;

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

    this.revealLevel = 0;

    this.hintVisible = false;

    this.hintUsed = false;

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
                      SELECT OPTION
  =========================================================*/

  selectOption(option: GuessOption): void {
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
      this.showMessage('Please choose an answer first.', 'error');

      return;
    }

    if (this.answerChecked) {
      return;
    }

    this.answerChecked = true;

    this.attempts++;

    if (this.selectedOption.id === this.currentQuestion.correctAnswerId) {
      this.handleCorrectAnswer();
    } else {
      this.handleWrongAnswer();
    }

    /*
      Fully reveal image after answering.
    */

    this.revealLevel = this.maxRevealLevel;
  }

  /*=========================================================
                    CORRECT ANSWER
  =========================================================*/

  handleCorrectAnswer(): void {
    this.isCorrect = true;

    this.correctAnswers++;

    this.streak++;

    if (this.streak > this.bestStreak) {
      this.bestStreak = this.streak;
    }

    /*
      Base Score
    */

    let points = 100;

    /*
      Reward children for guessing
      before revealing too much.
    */

    if (this.revealLevel === 0) {
      points += 75;
    } else if (this.revealLevel === 1) {
      points += 50;
    } else if (this.revealLevel === 2) {
      points += 25;
    }

    /*
      Hint penalty.
    */

    if (this.hintUsed) {
      points -= 20;
    }

    /*
      Streak bonus.
    */

    if (this.streak >= 2) {
      points += this.streak * 10;
    }

    this.score += Math.max(points, 50);

    this.showMessage(`🎉 Correct! The answer is ${this.getCorrectAnswerName()}.`, 'success');
  }

  /*=========================================================
                      WRONG ANSWER
  =========================================================*/

  handleWrongAnswer(): void {
    this.isCorrect = false;

    this.wrongAnswers++;

    this.streak = 0;

    this.showMessage(`Nice try! The correct answer is ${this.getCorrectAnswerName()}.`, 'error');
  }

  /*=========================================================
                    CORRECT ANSWER NAME
  =========================================================*/

  getCorrectAnswerName(): string {
    const answer = this.currentQuestion.options.find(
      (option) => option.id === this.currentQuestion.correctAnswerId,
    );

    return answer?.name ?? '';
  }

  /*=========================================================
                      OPTION STATES
  =========================================================*/

  isSelected(option: GuessOption): boolean {
    return this.selectedOption?.id === option.id;
  }

  isCorrectOption(option: GuessOption): boolean {
    return this.answerChecked && option.id === this.currentQuestion.correctAnswerId;
  }

  isWrongOption(option: GuessOption): boolean {
    return (
      this.answerChecked &&
      this.selectedOption?.id === option.id &&
      option.id !== this.currentQuestion.correctAnswerId
    );
  }

  /*=========================================================
                        SHOW HINT
  =========================================================*/

  showHint(): void {
    if (this.answerChecked) {
      return;
    }

    this.hintVisible = true;

    this.hintUsed = true;
  }

  /*=========================================================
                      REVEAL IMAGE
  =========================================================*/

  revealMore(): void {
    if (this.answerChecked || this.revealLevel >= this.maxRevealLevel) {
      return;
    }

    this.revealLevel++;
  }

  /*=========================================================
                    IMAGE BLUR VALUE
  =========================================================*/

  get imageBlur(): number {
    switch (this.revealLevel) {
      case 0:
        return 20;

      case 1:
        return 13;

      case 2:
        return 6;

      default:
        return 0;
    }
  }

  /*=========================================================
                    IMAGE SCALE VALUE
  =========================================================*/

  get imageScale(): number {
    switch (this.revealLevel) {
      case 0:
        return 1.35;

      case 1:
        return 1.2;

      case 2:
        return 1.08;

      default:
        return 1;
    }
  }

  /*=========================================================
                      REVEAL TEXT
  =========================================================*/

  get revealText(): string {
    switch (this.revealLevel) {
      case 0:
        return 'Very Hidden';

      case 1:
        return 'Little Clearer';

      case 2:
        return 'Almost Visible';

      default:
        return 'Fully Revealed';
    }
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
      Perfect score bonus.
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
                      FORMATTED TIME
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
      return 'Picture Master!';
    }

    if (percentage >= 80) {
      return 'Amazing Detective!';
    }

    if (percentage >= 60) {
      return 'Great Guessing!';
    }

    return 'Good Try!';
  }

  /*=========================================================
                    RESULT MESSAGE
  =========================================================*/

  get resultMessage(): string {
    const percentage = (this.correctAnswers / this.questions.length) * 100;

    if (percentage === 100) {
      return 'Fantastic! You identified every picture correctly.';
    }

    if (percentage >= 80) {
      return 'Excellent observation skills! You guessed almost every picture.';
    }

    if (percentage >= 60) {
      return 'Great work! Play again and try to become a Picture Master.';
    }

    return 'Keep observing, learning and playing. Try again for a higher score!';
  }

  /*=========================================================
                        MESSAGE
  =========================================================*/

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;

    this.messageType = type;
  }
}
