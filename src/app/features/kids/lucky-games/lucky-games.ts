import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface LuckyGame {
  id: number;
  icon: string;
  title: string;
  description: string;
  tag: string;
  reward: string;
}

interface WheelItem {
  label: string;
  icon: string;
  points: number;
}

interface MysteryBox {
  id: number;
  icon: string;
  opened: boolean;
  reward: string;
  points: number;
}

interface ModakItem {
  id: number;
  icon: string;
  selected: boolean;
  points: number;
  message: string;
}

interface ScratchCard {
  id: number;
  icon: string;
  title: string;
  points: number;
  revealed: boolean;
}

@Component({
  selector: 'app-lucky-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lucky-games.html',
  styleUrl: './lucky-games.scss',
})
export class LuckyGames implements OnInit, OnDestroy {
  /*=========================================================
                          HERO
  =========================================================*/

  heroTitle = 'Ganesh Lucky Games';

  heroSubtitle =
    'Spin, pick, reveal and play fun Ganesh-themed lucky games while collecting stars and joyful rewards.';

  /*=========================================================
                       GAME CATEGORIES
  =========================================================*/

  games: LuckyGame[] = [
    {
      id: 1,
      icon: '🎡',
      title: 'Spin The Wheel',
      description: 'Spin the magical wheel and discover your lucky reward.',
      tag: 'Popular',
      reward: 'Up to 50 Stars',
    },
    {
      id: 2,
      icon: '🔢',
      title: 'Lucky Number',
      description: 'Choose your lucky number and see what surprise is waiting.',
      tag: 'Quick Game',
      reward: 'Up to 30 Stars',
    },
    {
      id: 3,
      icon: '🎁',
      title: 'Mystery Box',
      description: 'Pick one mystery box and reveal the hidden blessing inside.',
      tag: 'Surprise',
      reward: 'Mystery Reward',
    },
    {
      id: 4,
      icon: '🍬',
      title: 'Pick A Modak',
      description: 'Choose your favourite modak and discover hidden stars.',
      tag: 'Kids Favourite',
      reward: 'Up to 40 Stars',
    },
    {
      id: 5,
      icon: '✨',
      title: 'Lucky Reveal',
      description: 'Choose a lucky card and reveal your hidden reward.',
      tag: 'Lucky',
      reward: 'Bonus Stars',
    },
    {
      id: 6,
      icon: '🏆',
      title: 'Daily Challenge',
      description: 'Complete the lucky games and become today’s Lucky Champion.',
      tag: 'Challenge',
      reward: 'Champion Badge',
    },
  ];

  selectedGame = 0;

  /*=========================================================
                        PLAYER STATS
  =========================================================*/

  totalStars = 0;

  gamesPlayed = 0;

  bestReward = 0;

  achievements = 0;

  /*=========================================================
                        CELEBRATION
  =========================================================*/

  showCelebration = false;

  celebrationTitle = '';

  celebrationMessage = '';

  celebrationIcon = '🎉';

  celebrationPoints = 0;

  private celebrationTimer: ReturnType<typeof setTimeout> | null = null;

  /*=========================================================
                      SPIN THE WHEEL
  =========================================================*/

  wheelItems: WheelItem[] = [
    {
      label: '10 Stars',
      icon: '⭐',
      points: 10,
    },
    {
      label: 'Blessing',
      icon: '🙏',
      points: 15,
    },
    {
      label: '25 Stars',
      icon: '🌟',
      points: 25,
    },
    {
      label: 'Modak',
      icon: '🍬',
      points: 20,
    },
    {
      label: '50 Stars',
      icon: '🏆',
      points: 50,
    },
    {
      label: 'Flower',
      icon: '🌸',
      points: 10,
    },
    {
      label: 'Lucky Star',
      icon: '✨',
      points: 30,
    },
    {
      label: 'Diya',
      icon: '🪔',
      points: 20,
    },
  ];

  wheelRotation = 0;

  isSpinning = false;

  wheelResult: WheelItem | null = null;

  /*=========================================================
                       LUCKY NUMBER
  =========================================================*/

  luckyNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  selectedNumber: number | null = null;

  luckyNumberResult = '';

  luckyNumberPoints = 0;

  numberPlayed = false;

  /*=========================================================
                       MYSTERY BOX
  =========================================================*/

  mysteryBoxes: MysteryBox[] = [
    {
      id: 1,
      icon: '🎁',
      opened: false,
      reward: 'Golden Star',
      points: 30,
    },
    {
      id: 2,
      icon: '🎁',
      opened: false,
      reward: 'Ganesh Blessing',
      points: 20,
    },
    {
      id: 3,
      icon: '🎁',
      opened: false,
      reward: 'Lucky Modak',
      points: 40,
    },
    {
      id: 4,
      icon: '🎁',
      opened: false,
      reward: 'Festival Star',
      points: 25,
    },
    {
      id: 5,
      icon: '🎁',
      opened: false,
      reward: 'Divine Flower',
      points: 15,
    },
    {
      id: 6,
      icon: '🎁',
      opened: false,
      reward: 'Super Lucky Star',
      points: 50,
    },
  ];

  mysteryBoxSelected = false;

  selectedMysteryBox: MysteryBox | null = null;

  /*=========================================================
                        PICK A MODAK
  =========================================================*/

  modaks: ModakItem[] = [
    {
      id: 1,
      icon: '🍬',
      selected: false,
      points: 10,
      message: 'Sweet Start!',
    },
    {
      id: 2,
      icon: '🍬',
      selected: false,
      points: 20,
      message: 'Lucky Modak!',
    },
    {
      id: 3,
      icon: '🍬',
      selected: false,
      points: 40,
      message: 'Golden Modak!',
    },
    {
      id: 4,
      icon: '🍬',
      selected: false,
      points: 15,
      message: 'Ganesh Blessing!',
    },
    {
      id: 5,
      icon: '🍬',
      selected: false,
      points: 30,
      message: 'Super Sweet!',
    },
    {
      id: 6,
      icon: '🍬',
      selected: false,
      points: 25,
      message: 'Festival Lucky!',
    },
  ];

  modakSelected = false;

  selectedModak: ModakItem | null = null;

  /*=========================================================
                        LUCKY REVEAL
  =========================================================*/

  scratchCards: ScratchCard[] = [
    {
      id: 1,
      icon: '⭐',
      title: 'Lucky Star',
      points: 10,
      revealed: false,
    },
    {
      id: 2,
      icon: '🌸',
      title: 'Divine Flower',
      points: 15,
      revealed: false,
    },
    {
      id: 3,
      icon: '🍬',
      title: 'Golden Modak',
      points: 30,
      revealed: false,
    },
    {
      id: 4,
      icon: '🪔',
      title: 'Festival Diya',
      points: 20,
      revealed: false,
    },
    {
      id: 5,
      icon: '🏆',
      title: 'Champion Reward',
      points: 50,
      revealed: false,
    },
    {
      id: 6,
      icon: '🙏',
      title: 'Ganesh Blessing',
      points: 25,
      revealed: false,
    },
  ];

  scratchCardSelected = false;

  selectedScratchCard: ScratchCard | null = null;

  /*=========================================================
                       DAILY CHALLENGE
  =========================================================*/

  dailyGamesRequired = 5;

  dailyChallengeCompleted = false;

  championRewardClaimed = false;

  /*=========================================================
                         CONSTRUCTOR
  =========================================================*/

  constructor(private router: Router) {}

  /*=========================================================
                            INIT
  =========================================================*/

  ngOnInit(): void {
    this.loadProgress();
    this.checkDailyChallenge();
  }

  ngOnDestroy(): void {
    if (this.celebrationTimer) {
      clearTimeout(this.celebrationTimer);
    }
  }

  /*=========================================================
                       SELECT GAME
  =========================================================*/

  selectGame(index: number): void {
    this.selectedGame = index;

    setTimeout(() => {
      const gameSection = document.getElementById('activeLuckyGame');

      gameSection?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  }

  /*=========================================================
                      SPIN THE WHEEL
  =========================================================*/

  spinWheel(): void {
    if (this.isSpinning) {
      return;
    }

    this.isSpinning = true;
    this.wheelResult = null;

    const winningIndex = Math.floor(Math.random() * this.wheelItems.length);

    const segmentAngle = 360 / this.wheelItems.length;

    const currentRotation = this.wheelRotation % 360;

    const winningAngle = 360 - winningIndex * segmentAngle - segmentAngle / 2;

    const extraRotations = 5 * 360;

    this.wheelRotation += extraRotations + winningAngle - currentRotation;

    setTimeout(() => {
      this.isSpinning = false;

      this.wheelResult = this.wheelItems[winningIndex];

      this.addReward(
        this.wheelResult.points,
        'Wheel Reward',
        `You won ${this.wheelResult.label}!`,
        this.wheelResult.icon,
      );
    }, 4200);
  }

  /*=========================================================
                       LUCKY NUMBER
  =========================================================*/

  chooseLuckyNumber(number: number): void {
    if (this.numberPlayed) {
      return;
    }

    this.selectedNumber = number;
  }

  revealLuckyNumber(): void {
    if (this.selectedNumber === null || this.numberPlayed) {
      return;
    }

    const luckyNumber = Math.floor(Math.random() * 9) + 1;

    this.numberPlayed = true;

    if (this.selectedNumber === luckyNumber) {
      this.luckyNumberPoints = 30;

      this.luckyNumberResult = `Amazing! ${this.selectedNumber} was today's lucky number.`;

      this.addReward(30, 'Perfect Lucky Number!', this.luckyNumberResult, '🎯');
    } else {
      this.luckyNumberPoints = 10;

      this.luckyNumberResult = `Today's lucky number was ${luckyNumber}. You still earned bonus stars!`;

      this.addReward(10, 'Nice Try!', this.luckyNumberResult, '⭐');
    }
  }

  resetLuckyNumber(): void {
    this.selectedNumber = null;
    this.numberPlayed = false;
    this.luckyNumberResult = '';
    this.luckyNumberPoints = 0;
  }

  /*=========================================================
                       MYSTERY BOX
  =========================================================*/

  openMysteryBox(box: MysteryBox): void {
    if (this.mysteryBoxSelected) {
      return;
    }

    this.mysteryBoxSelected = true;

    box.opened = true;

    this.selectedMysteryBox = box;

    this.addReward(
      box.points,
      box.reward,
      `Your mystery box contained ${box.points} lucky stars!`,
      '🎁',
    );
  }

  resetMysteryBoxes(): void {
    this.mysteryBoxes.forEach((box) => (box.opened = false));

    this.mysteryBoxSelected = false;
    this.selectedMysteryBox = null;

    this.shuffleArray(this.mysteryBoxes);
  }

  /*=========================================================
                        PICK MODAK
  =========================================================*/

  selectModak(modak: ModakItem): void {
    if (this.modakSelected) {
      return;
    }

    this.modakSelected = true;

    modak.selected = true;

    this.selectedModak = modak;

    this.addReward(
      modak.points,
      modak.message,
      `Your lucky modak contained ${modak.points} stars!`,
      '🍬',
    );
  }

  resetModaks(): void {
    this.modaks.forEach((modak) => (modak.selected = false));

    this.modakSelected = false;
    this.selectedModak = null;

    this.shuffleArray(this.modaks);
  }

  /*=========================================================
                        LUCKY REVEAL
  =========================================================*/

  revealScratchCard(card: ScratchCard): void {
    if (this.scratchCardSelected) {
      return;
    }

    this.scratchCardSelected = true;

    card.revealed = true;

    this.selectedScratchCard = card;

    this.addReward(card.points, card.title, `You revealed ${card.points} lucky stars!`, card.icon);
  }

  resetScratchCards(): void {
    this.scratchCards.forEach((card) => (card.revealed = false));

    this.scratchCardSelected = false;
    this.selectedScratchCard = null;

    this.shuffleArray(this.scratchCards);
  }

  /*=========================================================
                      ADD REWARD
  =========================================================*/

  addReward(points: number, title: string, message: string, icon: string): void {
    this.totalStars += points;

    this.gamesPlayed++;

    if (points > this.bestReward) {
      this.bestReward = points;
    }

    this.showRewardCelebration(points, title, message, icon);

    this.checkAchievements();

    this.checkDailyChallenge();

    this.saveProgress();
  }

  /*=========================================================
                       CELEBRATION
  =========================================================*/

  showRewardCelebration(points: number, title: string, message: string, icon: string): void {
    this.celebrationPoints = points;

    this.celebrationTitle = title;

    this.celebrationMessage = message;

    this.celebrationIcon = icon;

    this.showCelebration = true;

    if (this.celebrationTimer) {
      clearTimeout(this.celebrationTimer);
    }

    this.celebrationTimer = setTimeout(() => {
      this.showCelebration = false;
    }, 3500);
  }

  closeCelebration(): void {
    this.showCelebration = false;

    if (this.celebrationTimer) {
      clearTimeout(this.celebrationTimer);
      this.celebrationTimer = null;
    }
  }

  /*=========================================================
                       ACHIEVEMENTS
  =========================================================*/

  checkAchievements(): void {
    let count = 0;

    if (this.gamesPlayed >= 1) {
      count++;
    }

    if (this.gamesPlayed >= 5) {
      count++;
    }

    if (this.totalStars >= 100) {
      count++;
    }

    if (this.totalStars >= 250) {
      count++;
    }

    if (this.bestReward >= 50) {
      count++;
    }

    this.achievements = count;
  }

  /*=========================================================
                     DAILY CHALLENGE
  =========================================================*/

  checkDailyChallenge(): void {
    this.dailyChallengeCompleted = this.gamesPlayed >= this.dailyGamesRequired;
  }

  get dailyProgress(): number {
    return Math.min((this.gamesPlayed / this.dailyGamesRequired) * 100, 100);
  }

  claimChampionReward(): void {
    if (!this.dailyChallengeCompleted || this.championRewardClaimed) {
      return;
    }

    const bonusPoints = 100;

    this.championRewardClaimed = true;

    this.totalStars += bonusPoints;

    if (bonusPoints > this.bestReward) {
      this.bestReward = bonusPoints;
    }

    this.checkAchievements();

    this.showRewardCelebration(
      bonusPoints,
      'Lucky Champion!',
      'You completed the Daily Lucky Challenge and earned 100 bonus stars!',
      '🏆',
    );

    this.saveProgress();
  }

  /*=========================================================
                      RESET ALL GAMES
  =========================================================*/

  resetAllGames(): void {
    this.resetLuckyNumber();

    this.resetMysteryBoxes();

    this.resetModaks();

    this.resetScratchCards();

    this.wheelResult = null;

    this.selectedGame = 0;
  }

  /*=========================================================
                       LOCAL STORAGE
  =========================================================*/

  saveProgress(): void {
    const progress = {
      totalStars: this.totalStars,
      gamesPlayed: this.gamesPlayed,
      bestReward: this.bestReward,
      achievements: this.achievements,
      championRewardClaimed: this.championRewardClaimed,
    };

    localStorage.setItem('akhurathaLuckyGamesProgress', JSON.stringify(progress));
  }

  loadProgress(): void {
    const storedProgress = localStorage.getItem('akhurathaLuckyGamesProgress');

    if (!storedProgress) {
      return;
    }

    try {
      const progress = JSON.parse(storedProgress);

      this.totalStars = progress.totalStars ?? 0;

      this.gamesPlayed = progress.gamesPlayed ?? 0;

      this.bestReward = progress.bestReward ?? 0;

      this.achievements = progress.achievements ?? 0;

      this.championRewardClaimed = progress.championRewardClaimed ?? false;
    } catch {
      localStorage.removeItem('akhurathaLuckyGamesProgress');
    }
  }

  /*=========================================================
                      SHUFFLE HELPER
  =========================================================*/

  private shuffleArray<T>(items: T[]): void {
    for (let index = items.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));

      [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
    }
  }

  /*=========================================================
                       NAVIGATION
  =========================================================*/

  goToKidsZone(): void {
    this.router.navigate(['/kids']);
  }
}
