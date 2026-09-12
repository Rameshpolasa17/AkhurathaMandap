import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-game-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-items.html',
  styleUrl: './game-items.scss',
})
export class GameItems implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  gameId = 0;
  items: any[] = [];
  loading = false;
  saving = false;
  showForm = false;
  editId = 0;

  item: any = {
    id: 0,
    gameId: 0,
    itemType: '',
    title: '',
    content: '',
    imagePath: '',
    displayOrder: 1,
    isActive: true,
  };

  ngOnInit(): void {
    this.gameId = Number(this.route.snapshot.paramMap.get('gameId'));

    if (this.gameId <= 0) {
      this.back();
      return;
    }

    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;

    this.kidsService.getGameById(this.gameId).subscribe({
      next: (response: any) => {
        const game = response?.data ?? response;
        this.items = game?.items ?? game?.Items ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.loading = false;
        this.cdr.detectChanges();
        Swal.fire('Error', error?.error?.message ?? 'Unable to load game items.', 'error');
      },
    });
  }

  addItem(): void {
    this.editId = 0;
    this.item = {
      id: 0,
      gameId: this.gameId,
      itemType: '',
      title: '',
      content: '',
      imagePath: '',
      displayOrder: this.items.length + 1,
      isActive: true,
    };
    this.showForm = true;
  }

  editItem(item: any): void {
    this.editId = item.id;
    this.item = { ...item, gameId: this.gameId };
    this.showForm = true;
  }

  saveItem(): void {
    if (!this.item.title?.trim()) {
      Swal.fire('Validation', 'Item title is required.', 'warning');
      return;
    }

    this.saving = true;

    this.kidsService
      .saveGameItem({
        ...this.item,
        id: this.editId,
        gameId: this.gameId,
      })
      .subscribe({
        next: (response: any) => {
          this.saving = false;

          if (response?.success === false) {
            Swal.fire('Not Saved', response.message, 'warning');
            return;
          }

          this.showForm = false;

          Swal.fire({
            icon: 'success',
            title: 'Saved',
            timer: 1200,
            showConfirmButton: false,
          });

          this.loadItems();
        },
        error: (error: any) => {
          this.saving = false;
          Swal.fire('Save Failed', error?.error?.message ?? 'Unable to save item.', 'error');
        },
      });
  }

  deleteItem(item: any): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Item?',
      text: item.title,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.kidsService.deleteGameItem(item.id).subscribe({
        next: (response: any) => {
          if (response?.success === false) {
            Swal.fire('Not Deleted', response.message, 'warning');
            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            timer: 1200,
            showConfirmButton: false,
          });

          this.loadItems();
        },
        error: (error: any) => {
          Swal.fire('Delete Failed', error?.error?.message ?? 'Unable to delete item.', 'error');
        },
      });
    });
  }

  closeForm(): void {
    this.showForm = false;
  }

  back(): void {
    this.router.navigate(['/admin/kids/games']);
  }
}
