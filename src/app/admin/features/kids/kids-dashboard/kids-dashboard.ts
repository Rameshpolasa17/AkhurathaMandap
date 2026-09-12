import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-kids-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kids-dashboard.html',
  styleUrl: './kids-dashboard.scss',
})
export class KidsDashboard implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = false;
  contents: any[] = [];
  quizzes: any[] = [];
  games: any[] = [];
  competitions: any[] = [];

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;

    this.kidsService.getContents().subscribe({
      next: (response: any[]) => {
        this.contents = response ?? [];
        this.loadQuizzes();
      },
      error: () => this.finishLoading(),
    });
  }

  private loadQuizzes(): void {
    this.kidsService.getQuizzes().subscribe({
      next: (response: any[]) => {
        this.quizzes = response ?? [];
        this.loadGames();
      },
      error: () => this.loadGames(),
    });
  }

  private loadGames(): void {
    this.kidsService.getGames().subscribe({
      next: (response: any[]) => {
        this.games = response ?? [];
        this.loadCompetitions();
      },
      error: () => this.loadCompetitions(),
    });
  }

  private loadCompetitions(): void {
    this.kidsService.getCompetitions().subscribe({
      next: (response: any[]) => {
        this.competitions = response ?? [];
        this.finishLoading();
      },
      error: () => this.finishLoading(),
    });
  }

  private finishLoading(): void {
    this.loading = false;
    this.cdr.detectChanges();
  }

  get activeContents(): number {
    return this.contents.filter((x) => x.isActive).length;
  }

  get activeQuizzes(): number {
    return this.quizzes.filter((x) => x.isActive).length;
  }

  get activeGames(): number {
    return this.games.filter((x) => x.isActive).length;
  }

  get activeCompetitions(): number {
    return this.competitions.filter((x) => x.isActive).length;
  }

  openQuizzes(): void {
    this.router.navigate(['/admin/kids/quiz']);
  }

  openGames(): void {
    this.router.navigate(['/admin/kids/games']);
  }

  openCompetitions(): void {
    this.router.navigate(['/admin/kids/competitions']);
  }
}
