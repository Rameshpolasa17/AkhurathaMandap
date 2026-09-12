import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.scss',
})
export class GameForm implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  id = 0;
  loading = false;
  saving = false;

  game: any = {
    id: 0,
    title: '',
    description: '',
    gameType: 'Puzzle',
    difficulty: 'Easy',
    thumbnailPath: '',
    displayOrder: 1,
    isActive: true,
  };

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')) || 0;

    if (this.id > 0) {
      this.loadGame();
    }
  }

  loadGame(): void {
    this.loading = true;

    this.kidsService.getGameById(this.id).subscribe({
      next: (response: any) => {
        this.game = response?.data ?? response;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.loading = false;
        Swal.fire('Error', error?.error?.message ?? 'Unable to load game.', 'error');
      },
    });
  }

  save(): void {
    if (!this.game.title?.trim()) {
      Swal.fire('Validation', 'Game title is required.', 'warning');
      return;
    }

    this.saving = true;

    const request = {
      ...this.game,
      id: this.id,
    };

    this.kidsService.saveGame(request).subscribe({
      next: (response: any) => {
        this.saving = false;

        if (response?.success === false) {
          Swal.fire('Not Saved', response.message, 'warning');
          return;
        }

        Swal.fire({
          icon: 'success',
          title: 'Saved',
          text: response?.message ?? 'Game saved successfully.',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => this.back());
      },
      error: (error: any) => {
        this.saving = false;

        Swal.fire('Save Failed', error?.error?.message ?? 'Unable to save game.', 'error');
      },
    });
  }

  back(): void {
    this.router.navigate(['/admin/kids/games']);
  }
}
