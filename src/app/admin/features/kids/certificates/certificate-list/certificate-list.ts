import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { KidsService } from '@core/services/kids.service';

@Component({
  selector: 'app-certificate-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate-list.html',
  styleUrl: './certificate-list.scss',
})
export class CertificateList implements OnInit {
  private readonly kidsService = inject(KidsService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  certificates: any[] = [];
  filteredCertificates: any[] = [];
  loading = false;
  searchText = '';

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.loading = true;

    this.kidsService.getCertificates().subscribe({
      next: (response: any[]) => {
        this.certificates = response ?? [];
        this.applyFilter();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.loading = false;
        this.cdr.detectChanges();
        Swal.fire('Error', error?.error?.message ?? 'Unable to load certificates.', 'error');
      },
    });
  }

  applyFilter(): void {
    const search = this.searchText.toLowerCase().trim();
    this.filteredCertificates = this.certificates.filter(
      (x) =>
        !search ||
        x.certificateNumber?.toLowerCase().includes(search) ||
        x.childName?.toLowerCase().includes(search) ||
        x.quizTitle?.toLowerCase().includes(search),
    );
  }

  onSearch(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value;
    this.applyFilter();
  }

  viewCertificate(certificate: any): void {
    this.router.navigate(['/admin/kids/certificate', certificate.certificateNumber]);
  }

  deleteCertificate(certificate: any): void {
    Swal.fire({
      icon: 'warning',
      title: 'Delete Certificate?',
      text: certificate.certificateNumber,
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.kidsService.deleteCertificate(certificate.id).subscribe({
        next: () => {
          Swal.fire({ icon: 'success', title: 'Deleted', timer: 1200, showConfirmButton: false });
          this.loadCertificates();
        },
        error: (error: any) => {
          Swal.fire('Error', error?.error?.message ?? 'Unable to delete certificate.', 'error');
        },
      });
    });
  }
}
