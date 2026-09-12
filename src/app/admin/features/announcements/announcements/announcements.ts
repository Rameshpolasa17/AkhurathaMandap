import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementService } from '@core/services/announcement';
import { Announcement } from '@core/models/announcement';
import Swal from 'sweetalert2';
import { AnnouncementForm } from '../../../shared/announcement-form/announcement-form';

@Component({
  selector: 'app-announcements',
  imports: [CommonModule, AnnouncementForm],
  templateUrl: './announcements.html',
  styleUrl: './announcements.scss',
})
export class Announcements implements OnInit {
  private announcementService = inject(AnnouncementService);
  private cdr = inject(ChangeDetectorRef);
  announcements: Announcement[] = [];

  showForm = false;

  selectedAnnouncement?: Announcement;

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAll().subscribe({
      next: (response) => {
        this.announcements = [...response];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('API Error:', error);
      },
    });
  }

  openForm(): void {
    this.selectedAnnouncement = undefined;
    this.showForm = true;
  }

  edit(item: Announcement): void {
    this.selectedAnnouncement = item;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedAnnouncement = undefined;
    this.loadAnnouncements();
  }
  delete(item: Announcement): void {
    Swal.fire({
      title: 'Delete Announcement?',

      text: 'This action cannot be undone.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#dc3545',

      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.announcementService.delete(item.announcementId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Announcement deleted successfully.', 'success');

            this.loadAnnouncements();
          },
        });
      }
    });
  }
}
