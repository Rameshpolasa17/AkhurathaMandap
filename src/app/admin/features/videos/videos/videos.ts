import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { VideoService } from '@core/services/video';
import { Video } from '@core/models/video';

import { VideoForm } from '../../../shared/video-form/video-form';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, VideoForm],
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class Videos implements OnInit {
  private videoService = inject(VideoService);
  private cdr = inject(ChangeDetectorRef);
  videos: Video[] = [];

  showForm = false;

  selectedVideo?: Video;

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.videoService.getAll().subscribe({
      next: (response) => {
        this.videos = [...response];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openForm(): void {
    this.selectedVideo = undefined;
    this.showForm = true;
  }

  edit(item: Video): void {
    this.selectedVideo = item;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedVideo = undefined;
    this.loadVideos();
  }

  delete(item: Video): void {
    Swal.fire({
      title: 'Delete Video?',
      text: 'You will not be able to recover this video.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.videoService.delete(item.videoId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted Successfully',
              timer: 1500,
              showConfirmButton: false,
            });

            this.loadVideos();
          },

          error: () => {
            Swal.fire('Error', 'Unable to delete video.', 'error');
          },
        });
      }
    });
  }
}
