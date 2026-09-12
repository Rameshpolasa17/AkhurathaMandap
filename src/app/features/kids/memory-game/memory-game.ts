import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MemoryCard {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-memory-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-game.html',
  styleUrl: './memory-game.scss',
})
export class MemoryGame implements OnInit, OnDestroy {
  /*=========================================================
                      GAME DATA
  =========================================================*/

  private icons = ['🐘', '🪔', '🌺', '🍬', '🎉', '🙏', '🪷', '🎨'];

  cards: MemoryCard[] = [];

  firstCard: MemoryCard | null = null;

  secondCard: MemoryCard | null = null;

  lockBoard = false;

  /*=========================================================
                      GAME STATS
  =========================================================*/

  moves = 0;

  matches = 0;

  score = 0;

  timer = 0;

  gameCompleted = false;

  intervalId: any;

  /*=========================================================
                      INIT
  =========================================================*/

  ngOnInit(): void {
    this.startGame();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  /*=========================================================
                      START GAME
  =========================================================*/

  startGame(): void {
    this.moves = 0;

    this.matches = 0;

    this.score = 0;

    this.timer = 0;

    this.gameCompleted = false;

    this.firstCard = null;

    this.secondCard = null;

    this.lockBoard = false;

    this.createCards();

    this.shuffleCards();

    this.startTimer();
  }

  /*=========================================================
                    CREATE CARDS
  =========================================================*/

  createCards(): void {
    this.cards = [];

    let id = 0;

    this.icons.forEach((icon) => {
      this.cards.push({
        id: id++,
        icon,
        flipped: false,
        matched: false,
      });

      this.cards.push({
        id: id++,
        icon,
        flipped: false,
        matched: false,
      });
    });
  }

  /*=========================================================
                    SHUFFLE
  =========================================================*/

  shuffleCards(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /*=========================================================
                      TIMER
  =========================================================*/

  startTimer(): void {
    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      if (!this.gameCompleted) {
        this.timer++;
      }
    }, 1000);
  }

  /*=========================================================
                    FLIP CARD
  =========================================================*/

  flipCard(card: MemoryCard): void {
    if (this.lockBoard || card.flipped || card.matched || this.gameCompleted) {
      return;
    }

    card.flipped = true;

    if (!this.firstCard) {
      this.firstCard = card;
      return;
    }

    this.secondCard = card;

    this.moves++;

    this.checkMatch();
  }

  /*=========================================================
                    MATCH
  =========================================================*/

  checkMatch(): void {
    if (!this.firstCard || !this.secondCard) return;

    if (this.firstCard.icon === this.secondCard.icon) {
      this.firstCard.matched = true;

      this.secondCard.matched = true;

      this.matches++;

      this.score += 10;

      this.resetSelection();

      this.checkWin();
    } else {
      this.lockBoard = true;

      setTimeout(() => {
        if (this.firstCard) {
          this.firstCard.flipped = false;
        }

        if (this.secondCard) {
          this.secondCard.flipped = false;
        }

        this.resetSelection();

        this.lockBoard = false;
      }, 900);
    }
  }

  /*=========================================================
                    RESET
  =========================================================*/

  resetSelection(): void {
    this.firstCard = null;

    this.secondCard = null;
  }

  /*=========================================================
                    WIN
  =========================================================*/

  checkWin(): void {
    if (this.matches === this.icons.length) {
      this.gameCompleted = true;

      clearInterval(this.intervalId);
    }
  }

  /*=========================================================
                    RESTART
  =========================================================*/

  restart(): void {
    this.startGame();
  }

  /*=========================================================
                    TIME FORMAT
  =========================================================*/

  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60)
      .toString()
      .padStart(2, '0');

    const seconds = (this.timer % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}
