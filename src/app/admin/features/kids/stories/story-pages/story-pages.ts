import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-story-pages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-pages.html',
  styleUrl: './story-pages.scss',
})
export class StoryPages implements OnInit {
  private readonly kidsService = inject(KidsService);

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  storyId = 0;

  storyTitle = '';

  pages: any[] = [];

  loading = false;

  ngOnInit(): void {
    this.storyId = Number(this.route.snapshot.paramMap.get('storyId'));

    this.loadStory();

    // this.loadPages();
  }

  loadStory(): void {
    this.kidsService.getContentById(this.storyId).subscribe({
      next: (response: any) => {
        const story = response.content ?? response;

        this.storyTitle = story.title;
      },
    });
  }

  // loadPages(): void {
  //   this.loading = true;

  //   this.kidsService.getStoryPages(this.storyId).subscribe({
  //     next: (response: any) => {
  //       this.pages = response ?? [];

  //       this.loading = false;
  //     },

  //     error: () => {
  //       this.loading = false;

  //       Swal.fire('Error', 'Unable to load story pages.', 'error');
  //     },
  //   });
  // }

  addPage(): void {
    this.router.navigate(['/admin/kids/stories', this.storyId, 'pages/add']);
  }

  editPage(item: any): void {
    this.router.navigate(['/admin/kids/stories', this.storyId, 'pages/edit', item.id]);
  }

  // deletePage(item: any): void {
  //   Swal.fire({
  //     title: 'Delete Page?',

  //     text: item.title,

  //     icon: 'warning',

  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (!result.isConfirmed) return;

  //     this.kidsService.deleteStoryPage(item.id).subscribe({
  //       next: () => {
  //         Swal.fire('Deleted', '', 'success');

  //         this.loadPages();
  //       },
  //     });
  //   });
  // }
}
