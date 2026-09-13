import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KIDS_ENABLED, SUPPORT_QR_ENABLED } from '@core/config/app.config';
import { PeopleService } from '@core/services/people.service';
import { PersonCard, PeopleGrid } from '@shared/components/people-grid/people-grid';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

import { HeroBanner } from '@shared/components/hero-banner/hero-banner';
import { GaneshReveal } from '@shared/components/ganesh-reveal/ganesh-reveal';
import { FestivalIntro } from '@shared/components/festival-intro/festival-intro';
import { AnnouncementsPreview } from '@shared/components/announcements-preview/announcements-preview';
import { EventsPreview } from '@shared/components/events-preview/events-preview';
import { SchedulePreview } from '@shared/components/schedule-preview/schedule-preview';
import { GalleryPreview } from '@shared/components/gallery-preview/gallery-preview';
import { CompetitionsPreview } from '@shared/components/competitions-preview/competitions-preview';
import { SponsorsPreview } from '@shared/components/sponsors-preview/sponsors-preview';
import { SupportQr } from '@shared/components/support-qr/support-qr';
import { LocationSection } from '@shared/components/location-section/location-section';
import { MessageForm } from '@shared/components/message-form/message-form';
import { KidsZone } from '@shared/components/kids-zone/kids-zone';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    RevealOnScrollDirective,
    PeopleGrid,
    HeroBanner,
    GaneshReveal,
    FestivalIntro,
    AnnouncementsPreview,
    EventsPreview,
    SchedulePreview,
    GalleryPreview,
    CompetitionsPreview,
    SponsorsPreview,
    SupportQr,
    LocationSection,
    MessageForm,
    KidsZone,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private peopleService = inject(PeopleService);

  /**
   * The Kids Zone section only renders while this is true. The component and
   * its assets stay in the bundle — flip KIDS_ENABLED in
   * `core/config/app.config.ts` to bring the section back.
   */
  readonly kidsEnabled = KIDS_ENABLED;

  /** The Scan & Support QR section only renders while this is true. */
  readonly supportQrEnabled = SUPPORT_QR_ENABLED;

  volunteers: PersonCard[] = [];
  committee: PersonCard[] = [];

  constructor() {
    this.peopleService.getVolunteers().subscribe((list) => {
      this.volunteers = list.slice(0, 4).map((v) => ({
        id: v.volunteerId,
        name: v.name,
        role: v.role,
        imageUrl: v.imageUrl,
        description: v.description,
      }));
    });

    this.peopleService.getCommittee().subscribe((list) => {
      this.committee = list.slice(0, 4).map((m) => ({
        id: m.memberId,
        name: m.name,
        role: m.designation,
        imageUrl: m.imageUrl,
        description: m.description,
      }));
    });
  }
}
