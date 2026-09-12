import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
@Component({
  selector: 'app-puzzle-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puzzle-games.html',
  styleUrl: './puzzle-games.scss',
})
export class PuzzleGames {
  /*=========================================================
                      HERO
  =========================================================*/
  private router = inject(Router);
  heroTitle = 'Ganesh Puzzle World';

  heroSubtitle = 'Learn • Play • Think • Have Fun with exciting Ganesh themed puzzles and games.';

  /*=========================================================
                    GAME CATEGORIES
  =========================================================*/

  categories = [
    {
      icon: '🧩',
      title: 'Jigsaw Puzzle',
      description: 'Arrange the image pieces to complete the picture.',
      difficulty: 'Easy',
      color: '#ff9800',
      route: '/kids/jigsaw',
    },
    {
      icon: '🔤',
      title: 'Word Search',
      description: 'Find hidden Ganesh-related words.',
      difficulty: 'Easy',
      color: '#4caf50',
      route: '/kids/word-search',
    },
    {
      icon: '🧠',
      title: 'Memory Cards',
      description: 'Match identical cards and improve memory.',
      difficulty: 'Medium',
      color: '#2196f3',
      route: '/kids/memory-game',
    },
    {
      icon: '🎯',
      title: 'Match the Shadow',
      description: 'Choose the correct shadow for each object.',
      difficulty: 'Medium',
      color: '#e91e63',
      route: '/kids/match-shadow',
    },
    {
      icon: '❓',
      title: 'Guess the Picture',
      description: 'Identify the hidden Ganesh image.',
      difficulty: 'Hard',
      color: '#9c27b0',
      route: '/kids/guess-picture',
    },
    {
      icon: '🏆',
      title: 'Challenge Mode',
      description: 'Complete all games and earn a certificate.',
      difficulty: 'Expert',
      color: '#ff5722',
      route: '/kids/certificate',
    },
  ];

  /*=========================================================
                    JIGSAW PUZZLES
  =========================================================*/

  puzzles = [
    {
      title: 'Lord Ganesha',
      image: 'images/puzzles/puzzle-1.jpg',
      pieces: '3 x 3',
      level: 'Easy',
      route: '/kids/jigsaw',
    },
    {
      title: 'Ganesh Festival',
      image: 'images/puzzles/puzzle-2.jpg',
      pieces: '4 x 4',
      level: 'Medium',
      route: '/kids/jigsaw',
    },
    {
      title: 'Eco Friendly Ganesha',
      image: 'images/puzzles/puzzle-3.jpg',
      pieces: '5 x 5',
      level: 'Hard',
      route: '/kids/jigsaw',
    },
  ];

  /*=========================================================
                      WORD SEARCH
  =========================================================*/

  words = [
    'GANESHA',
    'GANAPATI',
    'VINAYAKA',
    'MODAK',
    'LADDU',
    'MOUSE',
    'TRUNK',
    'TEMPLE',
    'PUJA',
    'FESTIVAL',
  ];

  /*=========================================================
                      MEMORY GAME
  =========================================================*/

  memoryCards = ['🐘', '🐘', '🍬', '🍬', '🪔', '🪔', '🌺', '🌺', '🎉', '🎉', '🙏', '🙏'];

  /*=========================================================
                      MATCH GAME
  =========================================================*/

  shadowItems = [
    {
      image: 'images/puzzles/modak.png',
      shadow: 'images/puzzles/modak-shadow.png',
    },
    {
      image: 'images/puzzles/mouse.png',
      shadow: 'images/puzzles/mouse-shadow.png',
    },
    {
      image: 'images/puzzles/lotus.png',
      shadow: 'images/puzzles/lotus-shadow.png',
    },
    {
      image: 'images/puzzles/ganesha.png',
      shadow: 'images/puzzles/ganesha-shadow.png',
    },
  ];

  /*=========================================================
                    GUESS THE IMAGE
  =========================================================*/

  guessImages = [
    {
      image: 'images/puzzles/guess-1.jpg',
      answer: 'Lord Ganesha',
      options: ['Lord Ganesha', 'Hanuman', 'Krishna', 'Shiva'],
    },
    {
      image: 'images/puzzles/guess-2.jpg',
      answer: 'Modak',
      options: ['Laddu', 'Modak', 'Coconut', 'Flower'],
    },
  ];

  /*=========================================================
                    STATS
  =========================================================*/
  goToCategory(route: string): void {
    this.router.navigate([route]);
  }

  playPuzzle(route: string): void {
    this.router.navigate([route]);
  }
  totalGames = 6;

  totalLevels = 12;

  completedGames = 0;

  certificatesEarned = 0;

  /*=========================================================
                    METHODS
  =========================================================*/

  selectedCategory = 0;

  selectCategory(index: number): void {
    this.selectedCategory = index;
  }

  resetProgress(): void {
    this.completedGames = 0;
  }
}
