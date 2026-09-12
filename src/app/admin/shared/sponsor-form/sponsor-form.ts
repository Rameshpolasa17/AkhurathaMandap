import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { SponsorService } from '@core/services/sponsor.service';
import { Sponsor } from '@core/models/sponsors';
import { SaveSponsorRequest } from '@core/models/save-sponsor-request';

@Component({
  selector: 'app-sponsor-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sponsor-form.html',
  styleUrl: './sponsor-form.scss',
})
export class SponsorForm implements OnChanges {
  private sponsorService = inject(SponsorService);

  @Input() sponsor?: Sponsor;

  @Output() close = new EventEmitter<void>();

  loading = false;

  request: SaveSponsorRequest = {
    sponsorId: 0,

    sponsorTypeId: 0,

    sponsorName: '',

    companyName: '',

    description: '',

    logoUrl: '',

    bannerUrl: '',

    website: '',

    facebookUrl: '',

    instagramUrl: '',

    youtubeUrl: '',

    email: '',

    phone: '',

    address: '',

    festivalYear: new Date().getFullYear(),

    displayOrder: 1,

    isFeatured: false,

    isActive: true,

    userId: 1,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sponsor'] && this.sponsor) {
      this.request = {
        sponsorId: this.sponsor.sponsorId,

        sponsorTypeId: this.sponsor.sponsorTypeId,

        sponsorName: this.sponsor.sponsorName,

        companyName: this.sponsor.companyName,

        description: this.sponsor.description,

        logoUrl: this.sponsor.logoUrl,

        bannerUrl: this.sponsor.bannerUrl,

        website: this.sponsor.website,

        facebookUrl: this.sponsor.facebookUrl,

        instagramUrl: this.sponsor.instagramUrl,

        youtubeUrl: this.sponsor.youtubeUrl,

        email: this.sponsor.email,

        phone: this.sponsor.phone,

        address: this.sponsor.address,

        festivalYear: this.sponsor.festivalYear,

        displayOrder: this.sponsor.displayOrder,

        isFeatured: this.sponsor.isFeatured,

        isActive: this.sponsor.isActive,

        userId: 1,
      };
    }
  }

  cancel(): void {
    this.close.emit();
  }

  save(): void {
    if (!this.request.sponsorName.trim()) {
      Swal.fire('Validation', 'Sponsor Name is required.', 'warning');

      return;
    }

    if (this.request.sponsorTypeId == 0) {
      Swal.fire('Validation', 'Select Sponsor Type.', 'warning');

      return;
    }

    this.loading = true;

    this.sponsorService.save(this.request).subscribe({
      next: () => {
        this.loading = false;

        Swal.fire({
          icon: 'success',

          title: this.request.sponsorId == 0 ? 'Sponsor Added' : 'Sponsor Updated',

          timer: 1500,

          showConfirmButton: false,
        }).then(() => {
          this.close.emit();
        });
      },

      error: () => {
        this.loading = false;

        Swal.fire('Error', 'Unable to save Sponsor.', 'error');
      },
    });
  }
}
