import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface AchievementLevel {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  minimumScore: number;
}

interface GameAchievement {
  icon: string;
  name: string;
  completed: boolean;
  score: number;
}

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './certificate.html',
  styleUrl: './certificate.scss',
})
export class Certificate implements OnInit {
  /*=========================================================
                      CHILD DETAILS
  =========================================================*/

  childName = '';

  displayName = 'Your Name';

  /*=========================================================
                    CERTIFICATE DETAILS
  =========================================================*/

  certificateTitle = 'Kids Puzzle Champion';

  certificateSubtitle = 'Certificate of Achievement';

  certificateDescription =
    'For successfully participating in the Akhuratha Mandap Kids Puzzle World and demonstrating excellent creativity, memory, observation and problem-solving skills.';

  /*=========================================================
                    CERTIFICATE DATE
  =========================================================*/

  currentDate = new Date();

  formattedDate = '';

  /*=========================================================
                    CERTIFICATE ID
  =========================================================*/

  certificateId = '';

  /*=========================================================
                    ACHIEVEMENT LEVELS
  =========================================================*/

  achievementLevels: AchievementLevel[] = [
    {
      id: 'explorer',
      title: 'Puzzle Explorer',
      subtitle: 'Keep Learning & Playing',
      icon: '🌟',
      minimumScore: 0,
    },
    {
      id: 'champion',
      title: 'Puzzle Champion',
      subtitle: 'Excellent Achievement',
      icon: '🏆',
      minimumScore: 500,
    },
    {
      id: 'master',
      title: 'Puzzle Master',
      subtitle: 'Outstanding Performance',
      icon: '🥇',
      minimumScore: 1000,
    },
    {
      id: 'legend',
      title: 'Puzzle Legend',
      subtitle: 'Ultimate Kids Champion',
      icon: '👑',
      minimumScore: 1500,
    },
  ];

  selectedAchievement: AchievementLevel = this.achievementLevels[1];

  /*=========================================================
                      GAME RESULTS
  =========================================================*/

  games: GameAchievement[] = [
    {
      icon: '🧩',
      name: 'Jigsaw Puzzle',
      completed: true,
      score: 250,
    },
    {
      icon: '🔤',
      name: 'Word Search',
      completed: true,
      score: 200,
    },
    {
      icon: '🧠',
      name: 'Memory Game',
      completed: true,
      score: 300,
    },
    {
      icon: '🎯',
      name: 'Match The Shadow',
      completed: true,
      score: 200,
    },
    {
      icon: '❓',
      name: 'Guess The Picture',
      completed: true,
      score: 250,
    },
  ];

  /*=========================================================
                        CONSTRUCTOR
  =========================================================*/

  constructor(private router: Router) {}

  /*=========================================================
                          INIT
  =========================================================*/

  ngOnInit(): void {
    this.setCurrentDate();

    this.generateCertificateId();

    this.updateAchievementLevel();
  }

  /*=========================================================
                    TOTAL SCORE
  =========================================================*/

  get totalScore(): number {
    return this.games.reduce((total: number, game: GameAchievement) => {
      if (!game.completed) {
        return total;
      }

      return total + game.score;
    }, 0);
  }

  /*=========================================================
                    COMPLETED GAMES
  =========================================================*/

  get completedGames(): number {
    return this.games.filter((game: GameAchievement) => game.completed).length;
  }

  /*=========================================================
                    TOTAL GAMES
  =========================================================*/

  get totalGames(): number {
    return this.games.length;
  }

  /*=========================================================
                    COMPLETION PERCENTAGE
  =========================================================*/

  get completionPercentage(): number {
    if (this.totalGames === 0) {
      return 0;
    }

    return Math.round((this.completedGames / this.totalGames) * 100);
  }

  /*=========================================================
                      IS ELIGIBLE
  =========================================================*/

  get isEligible(): boolean {
    return this.completedGames >= 3;
  }

  /*=========================================================
                      PERFECT COMPLETION
  =========================================================*/

  get isPerfectCompletion(): boolean {
    return this.completedGames === this.totalGames;
  }

  /*=========================================================
                    SET CURRENT DATE
  =========================================================*/

  setCurrentDate(): void {
    this.formattedDate = this.currentDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  /*=========================================================
                  GENERATE CERTIFICATE ID
  =========================================================*/

  generateCertificateId(): void {
    const year = this.currentDate.getFullYear();

    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    this.certificateId = `AM-KIDS-${year}-${randomNumber}`;
  }

  /*=========================================================
                    NAME CHANGE
  =========================================================*/

  onNameChange(): void {
    const trimmedName = this.childName.trim();

    if (trimmedName.length === 0) {
      this.displayName = 'Your Name';

      return;
    }

    this.displayName = trimmedName;
  }

  /*=========================================================
                  UPDATE ACHIEVEMENT LEVEL
  =========================================================*/

  updateAchievementLevel(): void {
    let matchedLevel = this.achievementLevels[0];

    for (const level of this.achievementLevels) {
      if (this.totalScore >= level.minimumScore) {
        matchedLevel = level;
      }
    }

    this.selectedAchievement = matchedLevel;

    this.certificateTitle = matchedLevel.title;
  }

  /*=========================================================
                  SELECT ACHIEVEMENT
  =========================================================*/

  selectAchievement(achievement: AchievementLevel): void {
    this.selectedAchievement = achievement;

    this.certificateTitle = achievement.title;
  }

  /*=========================================================
                    GAME STATUS CLASS
  =========================================================*/

  getGameStatusClass(game: GameAchievement): string {
    return game.completed ? 'completed' : 'pending';
  }

  /*=========================================================
                    TOGGLE GAME
  =========================================================*/

  toggleGame(game: GameAchievement): void {
    game.completed = !game.completed;

    this.updateAchievementLevel();
  }

  /*=========================================================
                      PRINT CERTIFICATE
  =========================================================*/

  printCertificate(): void {
    if (!this.validateCertificate()) {
      return;
    }

    window.print();
  }

  /*=========================================================
                      DOWNLOAD PDF
  =========================================================*/

  downloadCertificate(): void {
    if (!this.validateCertificate()) {
      return;
    }

    /*
      For Part 2 + final integration we can use:

      html2canvas
      +
      jsPDF

      to generate the certificate as a real PDF.

      For now this opens the browser print dialog,
      where "Save as PDF" can also be selected.
    */

    window.print();
  }

  /*=========================================================
                    VALIDATE CERTIFICATE
  =========================================================*/

  validateCertificate(): boolean {
    if (this.childName.trim().length < 2) {
      alert('Please enter the child name before downloading the certificate.');

      return false;
    }

    if (!this.isEligible) {
      alert('Complete at least 3 games to unlock your certificate.');

      return false;
    }

    return true;
  }

  /*=========================================================
                    RESET CERTIFICATE
  =========================================================*/

  resetCertificate(): void {
    this.childName = '';

    this.displayName = 'Your Name';

    this.generateCertificateId();

    this.updateAchievementLevel();
  }

  /*=========================================================
                    PLAY MORE GAMES
  =========================================================*/

  playMoreGames(): void {
    this.router.navigate(['/kids/puzzle-games']);
  }

  /*=========================================================
                      GO TO KIDS ZONE
  =========================================================*/

  goToKidsZone(): void {
    this.router.navigate(['/kids']);
  }

  /*=========================================================
                    GO TO JIGSAW
  =========================================================*/

  playJigsaw(): void {
    this.router.navigate(['/kids/jigsaw']);
  }

  /*=========================================================
                    GO TO WORD SEARCH
  =========================================================*/

  playWordSearch(): void {
    this.router.navigate(['/kids/word-search']);
  }

  /*=========================================================
                    GO TO MEMORY GAME
  =========================================================*/

  playMemoryGame(): void {
    this.router.navigate(['/kids/memory-game']);
  }

  /*=========================================================
                  GO TO MATCH SHADOW
  =========================================================*/

  playMatchShadow(): void {
    this.router.navigate(['/kids/match-shadow']);
  }

  /*=========================================================
                  GO TO GUESS PICTURE
  =========================================================*/

  playGuessPicture(): void {
    this.router.navigate(['/kids/guess-picture']);
  }
}
