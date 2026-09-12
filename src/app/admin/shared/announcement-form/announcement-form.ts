import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { AnnouncementService } from '@core/services/announcement';
import { SaveAnnouncementRequest } from '@core/models/save-announcement-request';
import { Announcement } from '@core/models/announcement';

@Component({
  selector: 'app-announcement-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './announcement-form.html',
  styleUrl: './announcement-form.scss',
})
export class AnnouncementForm implements OnChanges {
  private announcementService = inject(AnnouncementService);

  @Input() announcement?: Announcement;

  @Output() close = new EventEmitter<void>();

  request: SaveAnnouncementRequest = {
    announcementId: 0,
    title: '',
    description: '',
    imageUrl: '',
    publishDate: '',
    expiryDate: '',
    isActive: true,
    userId: 1,
  };

  loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['announcement'] && this.announcement) {
      this.request = {
        announcementId: this.announcement.announcementId,
        title: this.announcement.title,
        description: this.announcement.description,
        imageUrl: this.announcement.imageUrl ?? '',
        publishDate: this.announcement.publishDate.substring(0, 10),
        expiryDate: this.announcement.expiryDate
          ? this.announcement.expiryDate.substring(0, 10)
          : '',
        isActive: this.announcement.isActive,
        userId: this.announcement.createdBy ?? 1,
      };
    }
  }

  cancel(): void {
    this.close.emit();
  }

  save(): void {
    if (!this.request.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation',
        text: 'Title is required.',
      });
      return;
    }

    if (!this.request.publishDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation',
        text: 'Publish Date is required.',
      });
      return;
    }

    this.loading = true;

    this.announcementService.save(this.request).subscribe({
      next: () => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: this.request.announcementId === 0 ? 'Announcement Added' : 'Announcement Updated',
          text:
            this.request.announcementId === 0
              ? 'Announcement saved successfully.'
              : 'Announcement updated successfully.',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          this.close.emit();
        });
      },

      error: (error) => {
        this.loading = false;

        console.error(error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Unable to save announcement.',
        });
      },
    });
  }
}
