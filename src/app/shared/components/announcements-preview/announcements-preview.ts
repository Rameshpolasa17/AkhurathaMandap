import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Announcement } from '@core/models/announcement';
import { AnnouncementService } from '@core/services/announcement';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/** Home-page notice board. Links through to the full announcements page. */
@Component({
  selector: 'app-announcements-preview',
  standalone: true,
  imports: [DatePipe, RouterLink, RevealOnScrollDirective],
  templateUrl: './announcements-preview.html',
  styleUrl: './announcements-preview.scss',
})
export class AnnouncementsPreview implements OnInit {
  private announcementService = inject(AnnouncementService);
  private cdr = inject(ChangeDetectorRef);

  announcements: Announcement[] = [];

  ngOnInit(): void {
    this.announcementService.getAll().subscribe({
      next: (list) => {
        this.announcements = list
          .filter((a) => a.isActive)
          .sort(
            (a, b) =>
              new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
          )
          .slice(0, 4);
        this.cdr.detectChanges();
      },
    });
  }
}
