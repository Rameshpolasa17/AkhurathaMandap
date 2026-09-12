import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';
import { Game } from '@core/models/kids.model';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export class GameList implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  games: Game[] = [];
  filteredGames: Game[] = [];
  loading = false;
  searchText = '';
  typeFilter = 'all';
  difficultyFilter = 'all';

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.loading = true;

    this.kidsService.getGames().subscribe({
      next: (response: Game[]) => {
        this.games = response ?? [];
        this.applyFilters();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.loading = false;
        this.cdr.detectChanges();

        Swal.fire({
          icon: 'error',
          title: 'Unable to Load Games',
          text: error?.error?.message ?? 'Unable to load games.',
        });
      },
    });
  }

  applyFilters(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredGames = this.games.filter(
      (game: any) =>
        (!search ||
          game.title?.toLowerCase().includes(search) ||
          game.description?.toLowerCase().includes(search)) &&
        (this.typeFilter === 'all' || game.gameType === this.typeFilter) &&
        (this.difficultyFilter === 'all' || game.difficulty === this.difficultyFilter),
    );
  }

  onSearch(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  onTypeChange(event: Event): void {
    this.typeFilter = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  onDifficultyChange(event: Event): void {
    this.difficultyFilter = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  addGame(): void {
    this.router.navigate(['/admin/kids/games/add']);
  }

  editGame(game: Game): void {
    this.router.navigate(['/admin/kids/games/edit', game.id]);
  }

  deleteGame(game: Game): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Game?',
      text: game.title,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.kidsService.deleteGame(game.id).subscribe({
        next: (response: any) => {
          if (response?.success === false) {
            Swal.fire('Not Deleted', response.message, 'warning');
            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadGames();
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: error?.error?.message ?? 'Unable to delete game.',
          });
        },
      });
    });
  }

  get activeCount(): number {
    return this.games.filter((x: any) => x.isActive).length;
  }
}
