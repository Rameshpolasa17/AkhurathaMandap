import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  icon: string;
}

interface QuizLevel {
  name: 'Easy' | 'Medium' | 'Hard';
  title: string;
  description: string;
  icon: string;
  color: string;
  questions: number;
  time: number;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz implements OnInit {
  /*=========================================================
                          HERO
  =========================================================*/

  heroTitle = 'Ganesh Quiz Challenge';

  heroSubtitle =
    'Test your knowledge about Lord Ganesha, Indian culture, festivals and traditions through a fun interactive quiz.';

  heroStats = [
    {
      number: '30+',
      label: 'Questions',
    },
    {
      number: '3',
      label: 'Levels',
    },
    {
      number: '100',
      label: 'Max Score',
    },
    {
      number: '🏆',
      label: 'Certificate',
    },
  ];

  /*=========================================================
                        QUIZ LEVELS
  =========================================================*/

  levels: QuizLevel[] = [
    {
      name: 'Easy',
      title: 'Little Explorer',
      description: 'Perfect for beginners and young learners.',
      icon: '🌱',
      color: '#4caf50',
      questions: 10,
      time: 30,
    },
    {
      name: 'Medium',
      title: 'Knowledge Seeker',
      description: 'A little more challenging for curious minds.',
      icon: '⭐',
      color: '#ff9800',
      questions: 10,
      time: 25,
    },
    {
      name: 'Hard',
      title: 'Quiz Champion',
      description: 'Test your complete Ganesh knowledge.',
      icon: '🏆',
      color: '#e65100',
      questions: 10,
      time: 20,
    },
  ];

  /*=========================================================
                      QUIZ QUESTIONS
  =========================================================*/

  questions: QuizQuestion[] = [
    /*=======================================================
                          EASY
    =======================================================*/

    {
      id: 1,
      question: 'Who is the mother of Lord Ganesha?',
      options: ['Goddess Lakshmi', 'Goddess Parvati', 'Goddess Saraswati', 'Goddess Sita'],
      correctAnswer: 1,
      explanation: 'Goddess Parvati is the mother of Lord Ganesha.',
      difficulty: 'Easy',
      category: 'Lord Ganesha',
      icon: '🙏',
    },
    {
      id: 2,
      question: 'Who is the father of Lord Ganesha?',
      options: ['Lord Vishnu', 'Lord Brahma', 'Lord Shiva', 'Lord Indra'],
      correctAnswer: 2,
      explanation: 'Lord Shiva is the father of Lord Ganesha.',
      difficulty: 'Easy',
      category: 'Lord Ganesha',
      icon: '🕉️',
    },
    {
      id: 3,
      question: 'What type of head does Lord Ganesha have?',
      options: ['Lion', 'Elephant', 'Horse', 'Tiger'],
      correctAnswer: 1,
      explanation: 'Lord Ganesha is easily recognized by his elephant head.',
      difficulty: 'Easy',
      category: 'Lord Ganesha',
      icon: '🐘',
    },
    {
      id: 4,
      question: 'What is Lord Ganesha traditionally known as the remover of?',
      options: ['Flowers', 'Obstacles', 'Rivers', 'Mountains'],
      correctAnswer: 1,
      explanation: 'Lord Ganesha is widely worshipped as the remover of obstacles.',
      difficulty: 'Easy',
      category: 'Knowledge',
      icon: '✨',
    },
    {
      id: 5,
      question: 'Which sweet is commonly associated with Lord Ganesha?',
      options: ['Jalebi', 'Modak', 'Mysore Pak', 'Gulab Jamun'],
      correctAnswer: 1,
      explanation: 'Modak is traditionally considered one of Lord Ganesha’s favourite sweets.',
      difficulty: 'Easy',
      category: 'Festival',
      icon: '🍬',
    },
    {
      id: 6,
      question: 'What is Lord Ganesha’s vehicle traditionally represented as?',
      options: ['Mouse', 'Peacock', 'Lion', 'Horse'],
      correctAnswer: 0,
      explanation: 'The mouse is traditionally represented as Lord Ganesha’s vehicle.',
      difficulty: 'Easy',
      category: 'Lord Ganesha',
      icon: '🐭',
    },
    {
      id: 7,
      question: 'Which festival celebrates the birth of Lord Ganesha?',
      options: ['Holi', 'Ganesh Chaturthi', 'Diwali', 'Janmashtami'],
      correctAnswer: 1,
      explanation: 'Ganesh Chaturthi celebrates Lord Ganesha.',
      difficulty: 'Easy',
      category: 'Festival',
      icon: '🎉',
    },
    {
      id: 8,
      question: 'Which flower is commonly offered during Hindu worship?',
      options: ['Lotus', 'Plastic Flower', 'Paper Flower', 'None'],
      correctAnswer: 0,
      explanation: 'The lotus is one of the flowers commonly used in Hindu worship.',
      difficulty: 'Easy',
      category: 'Tradition',
      icon: '🌸',
    },
    {
      id: 9,
      question: 'What do devotees commonly light during puja?',
      options: ['Diya', 'Torch', 'Lamp Post', 'Street Light'],
      correctAnswer: 0,
      explanation: 'A diya is traditionally lit during puja and devotional ceremonies.',
      difficulty: 'Easy',
      category: 'Tradition',
      icon: '🪔',
    },
    {
      id: 10,
      question: 'What do we commonly say when praying to Lord Ganesha?',
      options: ['Ganapati Bappa Morya', 'Good Morning', 'Happy Birthday', 'Good Night'],
      correctAnswer: 0,
      explanation:
        '“Ganapati Bappa Morya” is a popular devotional chant associated with Lord Ganesha.',
      difficulty: 'Easy',
      category: 'Festival',
      icon: '🙏',
    },

    /*=======================================================
                        MEDIUM
    =======================================================*/

    {
      id: 11,
      question: 'Who is traditionally described as Lord Ganesha’s brother?',
      options: ['Kartikeya', 'Krishna', 'Hanuman', 'Rama'],
      correctAnswer: 0,
      explanation: 'Lord Kartikeya is traditionally described as the brother of Lord Ganesha.',
      difficulty: 'Medium',
      category: 'Mythology',
      icon: '📖',
    },
    {
      id: 12,
      question: 'According to a famous story, what did Ganesha circle to win a race?',
      options: ['The Earth', 'A Temple', 'His Parents', 'A Mountain'],
      correctAnswer: 2,
      explanation:
        'Ganesha circled his parents, explaining that they represented the whole world to him.',
      difficulty: 'Medium',
      category: 'Stories',
      icon: '🌍',
    },
    {
      id: 13,
      question: 'Who challenged Ganesha to the famous race around the world?',
      options: ['Kartikeya', 'Hanuman', 'Krishna', 'Indra'],
      correctAnswer: 0,
      explanation:
        'The famous story describes a contest between Ganesha and his brother Kartikeya.',
      difficulty: 'Medium',
      category: 'Stories',
      icon: '🏁',
    },
    {
      id: 14,
      question: 'Which epic is Ganesha traditionally believed to have written down?',
      options: ['Mahabharata', 'Ramayana', 'Panchatantra', 'Bhagavata'],
      correctAnswer: 0,
      explanation: 'Tradition describes Lord Ganesha as the scribe who wrote down the Mahabharata.',
      difficulty: 'Medium',
      category: 'Mythology',
      icon: '📜',
    },
    {
      id: 15,
      question: 'Who traditionally dictated the Mahabharata to Lord Ganesha?',
      options: ['Valmiki', 'Vyasa', 'Kalidasa', 'Tulsidas'],
      correctAnswer: 1,
      explanation:
        'Sage Vyasa is traditionally said to have dictated the Mahabharata to Lord Ganesha.',
      difficulty: 'Medium',
      category: 'Mythology',
      icon: '📚',
    },
    {
      id: 16,
      question: 'What does the large head of Ganesha commonly symbolize?',
      options: ['Wisdom', 'Anger', 'Sleep', 'Speed'],
      correctAnswer: 0,
      explanation:
        'The large head is commonly interpreted as a symbol of wisdom and thoughtful understanding.',
      difficulty: 'Medium',
      category: 'Symbolism',
      icon: '🧠',
    },
    {
      id: 17,
      question: 'What do Ganesha’s large ears commonly symbolize?',
      options: ['Listen carefully', 'Run quickly', 'Sleep longer', 'Speak loudly'],
      correctAnswer: 0,
      explanation: 'The large ears are commonly interpreted as a reminder to listen carefully.',
      difficulty: 'Medium',
      category: 'Symbolism',
      icon: '👂',
    },
    {
      id: 18,
      question: 'What is the final immersion ceremony of Ganesh Chaturthi commonly called?',
      options: ['Visarjan', 'Aarti', 'Bhajan', 'Prasadam'],
      correctAnswer: 0,
      explanation:
        'The ceremonial immersion of the Ganesha idol is commonly called Ganesh Visarjan.',
      difficulty: 'Medium',
      category: 'Festival',
      icon: '🌊',
    },
    {
      id: 19,
      question: 'What is another widely used name for Lord Ganesha?',
      options: ['Vinayaka', 'Govinda', 'Madhava', 'Raghava'],
      correctAnswer: 0,
      explanation: 'Vinayaka is one of the widely used names of Lord Ganesha.',
      difficulty: 'Medium',
      category: 'Lord Ganesha',
      icon: '🕉️',
    },
    {
      id: 20,
      question: 'Lord Ganesha is traditionally worshipped before beginning what?',
      options: ['An auspicious activity', 'Sleeping', 'Playing outside', 'Eating every meal'],
      correctAnswer: 0,
      explanation:
        'Lord Ganesha is traditionally invoked at the beginning of auspicious activities.',
      difficulty: 'Medium',
      category: 'Tradition',
      icon: '🌟',
    },

    /*=======================================================
                          HARD
    =======================================================*/

    {
      id: 21,
      question: 'What does the name “Ganesha” commonly mean?',
      options: ['Lord of the Ganas', 'Lord of Water', 'Lord of Fire', 'Lord of Wind'],
      correctAnswer: 0,
      explanation: 'The name Ganesha is commonly understood as “Lord of the Ganas.”',
      difficulty: 'Hard',
      category: 'Knowledge',
      icon: '👑',
    },
    {
      id: 22,
      question: 'Which name of Ganesha refers to having one tusk?',
      options: ['Ekadanta', 'Lambodara', 'Vinayaka', 'Ganapati'],
      correctAnswer: 0,
      explanation: 'Ekadanta means “one-tusked” and is a well-known name of Lord Ganesha.',
      difficulty: 'Hard',
      category: 'Names',
      icon: '🐘',
    },
    {
      id: 23,
      question: 'Which name of Lord Ganesha refers to his large belly?',
      options: ['Lambodara', 'Ekadanta', 'Vakratunda', 'Vighnaraja'],
      correctAnswer: 0,
      explanation: 'Lambodara is a traditional name associated with Lord Ganesha’s large belly.',
      difficulty: 'Hard',
      category: 'Names',
      icon: '📖',
    },
    {
      id: 24,
      question: 'Which name of Ganesha means “curved trunk”?',
      options: ['Vakratunda', 'Ekadanta', 'Ganapati', 'Siddhivinayaka'],
      correctAnswer: 0,
      explanation: 'Vakratunda is commonly translated as “one with a curved trunk.”',
      difficulty: 'Hard',
      category: 'Names',
      icon: '🐘',
    },
    {
      id: 25,
      question: 'Which Sanskrit word is commonly associated with an obstacle?',
      options: ['Vighna', 'Deepa', 'Pushpa', 'Jala'],
      correctAnswer: 0,
      explanation: '“Vighna” is commonly associated with an obstacle or hindrance.',
      difficulty: 'Hard',
      category: 'Knowledge',
      icon: '📚',
    },
    {
      id: 26,
      question: 'Which title of Ganesha is associated with removing obstacles?',
      options: ['Vighnaharta', 'Dhanvantari', 'Nataraja', 'Madhava'],
      correctAnswer: 0,
      explanation: 'Vighnaharta is a popular title describing Ganesha as the remover of obstacles.',
      difficulty: 'Hard',
      category: 'Names',
      icon: '✨',
    },
    {
      id: 27,
      question: 'Which symbol is frequently placed before Hindu prayers and sacred writings?',
      options: ['Om', 'Star', 'Arrow', 'Circle'],
      correctAnswer: 0,
      explanation:
        'Om is a sacred syllable frequently used at the beginning of Hindu prayers and spiritual practices.',
      difficulty: 'Hard',
      category: 'Tradition',
      icon: '🕉️',
    },
    {
      id: 28,
      question:
        'Which quality is strongly represented in the story of Ganesha circling his parents?',
      options: ['Wisdom', 'Jealousy', 'Anger', 'Fear'],
      correctAnswer: 0,
      explanation: 'The story emphasizes Ganesha’s wisdom and devotion to his parents.',
      difficulty: 'Hard',
      category: 'Stories',
      icon: '💡',
    },
    {
      id: 29,
      question: 'Why is Ganesha traditionally invoked at the beginning of important work?',
      options: [
        'For auspicious beginnings and removal of obstacles',
        'To make the day longer',
        'To change the weather',
        'To stop celebrations',
      ],
      correctAnswer: 0,
      explanation:
        'Ganesha is traditionally invoked for auspicious beginnings and the removal of obstacles.',
      difficulty: 'Hard',
      category: 'Tradition',
      icon: '🙏',
    },
    {
      id: 30,
      question: 'Which value is commonly associated with Lord Ganesha?',
      options: ['Wisdom', 'Carelessness', 'Pride', 'Impatience'],
      correctAnswer: 0,
      explanation:
        'Lord Ganesha is strongly associated with wisdom, intelligence and good judgement.',
      difficulty: 'Hard',
      category: 'Values',
      icon: '🧠',
    },
  ];

  /*=========================================================
                      QUIZ STATE
  =========================================================*/

  selectedLevel: 'Easy' | 'Medium' | 'Hard' = 'Easy';

  currentQuestions: QuizQuestion[] = [];

  currentQuestionIndex = 0;

  selectedAnswer: number | null = null;

  score = 0;

  correctAnswers = 0;

  wrongAnswers = 0;

  quizStarted = false;

  quizCompleted = false;

  answerSubmitted = false;

  isCorrect = false;

  /*=========================================================
                          TIMER
  =========================================================*/

  timeLeft = 20;

  timerInterval: ReturnType<typeof setInterval> | null = null;

  /*=========================================================
                        HIGH SCORE
  =========================================================*/

  highScore = 0;

  /*=========================================================
                        CONSTRUCTOR
  =========================================================*/

  constructor(private router: Router) {}

  /*=========================================================
                          INIT
  =========================================================*/

  ngOnInit(): void {
    this.loadHighScore();
  }

  /*=========================================================
                      SELECT LEVEL
  =========================================================*/

  selectLevel(level: 'Easy' | 'Medium' | 'Hard'): void {
    if (this.quizStarted) {
      return;
    }

    this.selectedLevel = level;
  }

  /*=========================================================
                        START QUIZ
  =========================================================*/

  startQuiz(): void {
    this.stopTimer();

    this.currentQuestions = this.questions.filter(
      (question) => question.difficulty === this.selectedLevel,
    );

    this.currentQuestionIndex = 0;

    this.selectedAnswer = null;

    this.score = 0;

    this.correctAnswers = 0;

    this.wrongAnswers = 0;

    this.quizStarted = true;

    this.quizCompleted = false;

    this.answerSubmitted = false;

    this.isCorrect = false;

    this.startTimer();
  }

  /*=========================================================
                      CURRENT QUESTION
  =========================================================*/

  get currentQuestion(): QuizQuestion | null {
    if (!this.currentQuestions.length) {
      return null;
    }

    return this.currentQuestions[this.currentQuestionIndex];
  }

  /*=========================================================
                      SELECT ANSWER
  =========================================================*/

  selectAnswer(index: number): void {
    if (this.answerSubmitted) {
      return;
    }

    this.selectedAnswer = index;
  }

  /*=========================================================
                      SUBMIT ANSWER
  =========================================================*/

  submitAnswer(): void {
    if (this.selectedAnswer === null || !this.currentQuestion || this.answerSubmitted) {
      return;
    }

    this.stopTimer();

    this.answerSubmitted = true;

    this.isCorrect = this.selectedAnswer === this.currentQuestion.correctAnswer;

    if (this.isCorrect) {
      this.correctAnswers++;

      this.score += 10;
    } else {
      this.wrongAnswers++;
    }
  }

  /*=========================================================
                        NEXT QUESTION
  =========================================================*/

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
      this.currentQuestionIndex++;

      this.selectedAnswer = null;

      this.answerSubmitted = false;

      this.isCorrect = false;

      this.startTimer();
    } else {
      this.completeQuiz();
    }
  }

  /*=========================================================
                        COMPLETE QUIZ
  =========================================================*/

  completeQuiz(): void {
    this.stopTimer();

    this.quizStarted = false;

    this.quizCompleted = true;

    this.saveHighScore();
  }

  /*=========================================================
                        RESTART QUIZ
  =========================================================*/

  restartQuiz(): void {
    this.quizCompleted = false;

    this.startQuiz();
  }

  /*=========================================================
                          TIMER
  =========================================================*/

  startTimer(): void {
    this.stopTimer();

    const selectedLevelData = this.levels.find((level) => level.name === this.selectedLevel);

    this.timeLeft = selectedLevelData?.time ?? 20;

    this.timerInterval = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        this.stopTimer();

        this.handleTimeUp();
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);

      this.timerInterval = null;
    }
  }

  /*=========================================================
                        TIME UP
  =========================================================*/

  handleTimeUp(): void {
    if (this.answerSubmitted) {
      return;
    }

    this.answerSubmitted = true;

    this.isCorrect = false;

    this.wrongAnswers++;
  }

  /*=========================================================
                    QUESTION PROGRESS
  =========================================================*/

  get progressPercentage(): number {
    if (!this.currentQuestions.length) {
      return 0;
    }

    return ((this.currentQuestionIndex + 1) / this.currentQuestions.length) * 100;
  }

  /*=========================================================
                    RESULT PERCENTAGE
  =========================================================*/

  get resultPercentage(): number {
    if (!this.currentQuestions.length) {
      return 0;
    }

    return Math.round((this.correctAnswers / this.currentQuestions.length) * 100);
  }

  /*=========================================================
                      RESULT MESSAGE
  =========================================================*/

  get resultTitle(): string {
    const percentage = this.resultPercentage;

    if (percentage >= 90) {
      return 'Ganesh Quiz Champion!';
    }

    if (percentage >= 70) {
      return 'Excellent Work!';
    }

    if (percentage >= 50) {
      return 'Great Attempt!';
    }

    return 'Keep Learning!';
  }

  get resultMessage(): string {
    const percentage = this.resultPercentage;

    if (percentage >= 90) {
      return 'Outstanding! You have excellent knowledge about Lord Ganesha and our traditions.';
    }

    if (percentage >= 70) {
      return 'Wonderful performance! You are becoming a true Ganesh scholar.';
    }

    if (percentage >= 50) {
      return 'Good job! Keep exploring the stories and traditions of Lord Ganesha.';
    }

    return 'Every quiz helps you learn something new. Try again and improve your score!';
  }

  /*=========================================================
                    OPTION STATE
  =========================================================*/

  isSelectedOption(index: number): boolean {
    return this.selectedAnswer === index;
  }

  isCorrectOption(index: number): boolean {
    if (!this.answerSubmitted || !this.currentQuestion) {
      return false;
    }

    return this.currentQuestion.correctAnswer === index;
  }

  isWrongOption(index: number): boolean {
    if (!this.answerSubmitted || this.selectedAnswer === null || !this.currentQuestion) {
      return false;
    }

    return (
      this.selectedAnswer === index && this.selectedAnswer !== this.currentQuestion.correctAnswer
    );
  }

  /*=========================================================
                        HIGH SCORE
  =========================================================*/

  loadHighScore(): void {
    const storedScore = localStorage.getItem('akhurathaQuizHighScore');

    this.highScore = storedScore ? Number(storedScore) : 0;
  }

  saveHighScore(): void {
    if (this.score > this.highScore) {
      this.highScore = this.score;

      localStorage.setItem('akhurathaQuizHighScore', this.highScore.toString());
    }
  }

  /*=========================================================
                      CERTIFICATE
  =========================================================*/

  canDownloadCertificate(): boolean {
    return this.resultPercentage >= 70;
  }

  downloadCertificate(): void {
    if (!this.canDownloadCertificate()) {
      return;
    }

    /*
      Later we will connect this with the
      Kids Certificate component and generate
      a downloadable PDF certificate.
    */

    this.router.navigate(['/kids/certificate'], {
      queryParams: {
        type: 'quiz',
        score: this.score,
        percentage: this.resultPercentage,
        level: this.selectedLevel,
      },
    });
  }

  /*=========================================================
                        BACK TO KIDS
  =========================================================*/

  goToKidsZone(): void {
    this.stopTimer();

    this.router.navigate(['/kids']);
  }
}
