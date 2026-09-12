import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gallery } from '@core/models/gallery';
import { SaveGalleryRequest } from '@core/models/save-gallery-request';
import { MOCK_GALLERY } from '@core/mock-data/gallery.mock';
import { mockResponse, nextId } from '@core/mock-data/mock-utils';

/**
 * Frontend-only gallery store (in-memory, resets on reload).
 *
 * Uploads are simulated with `URL.createObjectURL` so newly added images preview
 * for the current session only.
 *
 * API-READY: swap each body for the commented HttpClient call.
 */
@Injectable({ providedIn: 'root' })
export class GalleryService {
  private gallery: Gallery[] = MOCK_GALLERY.map((g) => ({ ...g }));

  getAll(): Observable<Gallery[]> {
    // return this.http.get<Gallery[]>(`${environment.apiUrl}/Gallery`);
    return mockResponse(this.gallery);
  }

  /** Active photos in display order — what the public gallery renders. */
  getPublished(): Observable<Gallery[]> {
    return this.getAll().pipe(
      map((list) =>
        list.filter((g) => g.isActive).sort((a, b) => a.displayOrder - b.displayOrder),
      ),
    );
  }

  /** Featured photos for the home-page preview. */
  getFeatured(count = 6): Observable<Gallery[]> {
    return this.getPublished().pipe(
      map((list) => {
        const featured = list.filter((g) => g.featured);
        return (featured.length ? featured : list).slice(0, count);
      }),
    );
  }

  /** Distinct categories present in the published set. */
  getCategories(): Observable<string[]> {
    return this.getPublished().pipe(
      map((list) => [...new Set(list.map((g) => g.category).filter(Boolean))]),
    );
  }

  save(request: SaveGalleryRequest): Observable<{ message: string }> {
    // return this.http.post(`${environment.apiUrl}/Gallery`, request);
    if (request.galleryId) {
      const idx = this.gallery.findIndex((g) => g.galleryId === request.galleryId);
      if (idx > -1) {
        this.gallery[idx] = {
          ...this.gallery[idx],
          ...request,
          updatedDate: new Date().toISOString(),
        };
      }
    } else {
      this.gallery.push({
        galleryId: nextId(this.gallery, 'galleryId'),
        title: request.title,
        description: request.description,
        imageUrl: request.imageUrl,
        category: request.category,
        displayOrder: request.displayOrder,
        isActive: request.isActive,
        createdDate: new Date().toISOString(),
      });
    }
    return mockResponse({ message: 'Gallery item saved successfully.' });
  }

  delete(id: number): Observable<{ message: string }> {
    // return this.http.delete(`${environment.apiUrl}/Gallery/${id}`);
    this.gallery = this.gallery.filter((g) => g.galleryId !== id);
    return mockResponse({ message: 'Gallery item deleted successfully.' });
  }

  upload(file: File): Observable<{ imageUrl: string }> {
    // return this.http.post<{ imageUrl: string }>(`${environment.apiUrl}/Gallery/upload`, formData);
    return mockResponse({ imageUrl: URL.createObjectURL(file) });
  }

  uploadMultiple(files: File[]): Observable<{ imageUrls: string[] }> {
    // return this.http.post(`${environment.apiUrl}/Gallery/upload-multiple`, formData);
    return mockResponse({ imageUrls: files.map((f) => URL.createObjectURL(f)) });
  }
}
