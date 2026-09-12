import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2';
import { environment } from '@env/environment';

import { SponsorForm } from '../../../shared/sponsor-form/sponsor-form';
import { SponsorService } from '@core/services/sponsor.service';
import { Sponsor } from '@core/models/sponsors';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SponsorForm],
  templateUrl: './sponsors.html',
  styleUrl: './sponsors.scss',
})
export class Sponsors implements OnInit {
  private sponsorService = inject(SponsorService);

  private cdr = inject(ChangeDetectorRef);

  fileUrl = environment.fileUrl;

  sponsors: Sponsor[] = [];

  filteredSponsors: Sponsor[] = [];

  selectedSponsor?: Sponsor;

  showPopup = false;

  loading = false;

  searchText = '';

  selectedYear = 0;

  selectedType = '';

  years: number[] = [];

  sponsorTypes: string[] = [];

  ngOnInit(): void {
    this.loadSponsors();
  }

  loadSponsors(): void {
    this.loading = true;

    this.sponsorService.getAll().subscribe({
      next: (response) => {
        this.sponsors = response.sort((a, b) => b.festivalYear - a.festivalYear);

        this.filteredSponsors = [...this.sponsors];

        this.years = [...new Set(this.sponsors.map((x) => x.festivalYear))].sort((a, b) => b - a);

        this.sponsorTypes = [...new Set(this.sponsors.map((x) => x.sponsorTypeName))];

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);

        this.loading = false;
      },
    });
  }

  filter(): void {
    this.filteredSponsors = this.sponsors.filter((x) => {
      const search =
        !this.searchText ||
        x.sponsorName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (x.companyName ?? '').toLowerCase().includes(this.searchText.toLowerCase());

      const year = this.selectedYear === 0 || x.festivalYear === this.selectedYear;

      const type = this.selectedType === '' || x.sponsorTypeName === this.selectedType;

      return search && year && type;
    });
  }

  clearFilters(): void {
    this.searchText = '';

    this.selectedYear = 0;

    this.selectedType = '';

    this.filteredSponsors = [...this.sponsors];
  }

  addSponsor(): void {
    this.selectedSponsor = undefined;

    this.showPopup = true;
  }

  editSponsor(item: Sponsor): void {
    this.selectedSponsor = item;

    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;

    this.selectedSponsor = undefined;

    this.loadSponsors();
  }

  deleteSponsor(item: Sponsor): void {
    Swal.fire({
      title: 'Delete Sponsor?',
      text: item.sponsorName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sponsorService.delete(item.sponsorId).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Sponsor deleted successfully.', 'success');

            this.loadSponsors();
          },
        });
      }
    });
  }

  getLogo(path: string | null | undefined): string {
    if (!path || path.trim() === '') {
      return 'images/no-image.png';
    }

    if (path.startsWith('http')) {
      return path;
    }

    return `${this.fileUrl}${path}`;
  }

  imageError(event: Event): void {
    const img = event.target as HTMLImageElement;

    // Prevent infinite error loop
    img.onerror = null;

    img.src = 'images/no-image.png';
  }

  trackBySponsor(index: number, item: Sponsor): number {
    return item.sponsorId;
  }
}
