import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PuzzlePiece {
  id: number;
  image: string;
  correctIndex: number;
}

@Component({
  selector: 'app-jigsaw',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jigsaw.html',
  styleUrl: './jigsaw.scss',
})
export class Jigsaw implements OnInit {
  /*=========================================
              GAME SETTINGS
  =========================================*/
  readonly Math = Math;
  gridSize = 3;

  totalPieces = 9;

  image = 'images/puzzles/ganesha-puzzle.jpg';

  /*=========================================
              GAME DATA
  =========================================*/

  pieces: PuzzlePiece[] = [];

  selectedPiece: number | null = null;

  moves = 0;

  timer = 0;

  completed = false;

  preview = false;

  progress = 0;

  intervalId: any;

  /*=========================================
              INIT
  =========================================*/

  ngOnInit(): void {
    this.createPuzzle();

    this.shuffle();

    this.startTimer();
  }

  /*=========================================
            CREATE PUZZLE
  =========================================*/

  createPuzzle(): void {
    this.pieces = [];

    for (let i = 0; i < this.totalPieces; i++) {
      this.pieces.push({
        id: i,
        image: this.image,
        correctIndex: i,
      });
    }
  }

  /*=========================================
                SHUFFLE
  =========================================*/

  shuffle(): void {
    for (let i = this.pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [this.pieces[i], this.pieces[j]] = [this.pieces[j], this.pieces[i]];
    }

    this.moves = 0;

    this.completed = false;

    this.calculateProgress();
  }

  /*=========================================
            SELECT PIECE
  =========================================*/

  selectPiece(index: number): void {
    if (this.completed) return;

    if (this.selectedPiece === null) {
      this.selectedPiece = index;
      return;
    }

    this.swapPieces(this.selectedPiece, index);

    this.selectedPiece = null;
  }

  /*=========================================
                SWAP
  =========================================*/

  swapPieces(first: number, second: number): void {
    [this.pieces[first], this.pieces[second]] = [this.pieces[second], this.pieces[first]];

    this.moves++;

    this.calculateProgress();

    this.checkCompleted();
  }

  /*=========================================
                PROGRESS
  =========================================*/

  calculateProgress(): void {
    let correct = 0;

    this.pieces.forEach((piece, index) => {
      if (piece.correctIndex === index) {
        correct++;
      }
    });

    this.progress = Math.round((correct / this.totalPieces) * 100);
  }

  /*=========================================
              CHECK COMPLETE
  =========================================*/

  checkCompleted(): void {
    const solved = this.pieces.every((piece, index) => piece.correctIndex === index);

    if (solved) {
      this.completed = true;

      clearInterval(this.intervalId);
    }
  }

  /*=========================================
                TIMER
  =========================================*/

  startTimer(): void {
    this.intervalId = setInterval(() => {
      if (!this.completed) {
        this.timer++;
      }
    }, 1000);
  }

  /*=========================================
                RESET
  =========================================*/

  reset(): void {
    clearInterval(this.intervalId);

    this.timer = 0;

    this.moves = 0;

    this.selectedPiece = null;

    this.createPuzzle();

    this.shuffle();

    this.startTimer();
  }

  /*=========================================
              PREVIEW
  =========================================*/

  togglePreview(): void {
    this.preview = !this.preview;
  }

  /*=========================================
                TIME
  =========================================*/

  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60)
      .toString()
      .padStart(2, '0');

    const seconds = (this.timer % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}
