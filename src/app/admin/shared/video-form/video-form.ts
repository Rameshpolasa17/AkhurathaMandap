import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { VideoService } from '@core/services/video';
import { Video } from '@core/models/video';
import { SaveVideoRequest } from '@core/models/save-video-request';

@Component({
  selector: 'app-video-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-form.html',
  styleUrl: './video-form.scss',
})
export class VideoForm implements OnChanges {
  private videoService = inject(VideoService);

  @Input() video?: Video;

  @Output() close = new EventEmitter<void>();

  loading = false;

  request: SaveVideoRequest = {
    videoId: 0,
    title: '',
    description: '',
    youtubeUrl: '',
    thumbnailUrl: '',
    displayOrder: 1,
    isActive: true,
    userId: 1,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['video'] && this.video) {
      this.request = {
        videoId: this.video.videoId,
        title: this.video.title,
        description: this.video.description,
        youtubeUrl: this.video.youtubeUrl,
        thumbnailUrl: this.video.thumbnailUrl,
        displayOrder: this.video.displayOrder,
        isActive: this.video.isActive,
        userId: this.video.createdBy ?? 1,
      };
    }
  }

  generateThumbnail(): void {
    if (!this.request.youtubeUrl) return;

    let videoId = '';

    try {
      const url = new URL(this.request.youtubeUrl);

      if (url.hostname.includes('youtu.be')) {
        videoId = url.pathname.replace('/', '');
      } else {
        videoId = url.searchParams.get('v') ?? '';
      }

      if (videoId) {
        this.request.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    } catch {
      // Invalid URL
    }
  }

  cancel(): void {
    this.close.emit();
  }

  save(): void {
    if (!this.request.title.trim()) {
      Swal.fire('Validation', 'Title is required.', 'warning');
      return;
    }

    if (!this.request.youtubeUrl.trim()) {
      Swal.fire('Validation', 'YouTube URL is required.', 'warning');
      return;
    }

    this.generateThumbnail();

    this.loading = true;

    this.videoService.save(this.request).subscribe({
      next: () => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: this.request.videoId === 0 ? 'Video Added' : 'Video Updated',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          this.close.emit();
        });
      },

      error: () => {
        this.loading = false;

        Swal.fire('Error', 'Unable to save video.', 'error');
      },
    });
  }
}
