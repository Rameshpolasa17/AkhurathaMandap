import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveAnnouncementRequest } from '@core/models/save-announcement-request';
import { Announcement } from '@core/models/announcement';
import { MOCK_ANNOUNCEMENTS } from '@core/mock-data/announcements.mock';
import { mockResponse, nextId } from '@core/mock-data/mock-utils';

/**
 * Frontend-only announcement store (in-memory, resets on reload).
 *
 * API-READY: each method maps 1:1 to a REST call — see the commented lines.
 */
@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private announcements: Announcement[] = MOCK_ANNOUNCEMENTS.map((a) => ({ ...a }));

  getAll(): Observable<Announcement[]> {
    // return this.http.get<Announcement[]>(`${environment.apiUrl}/Announcement`);
    return mockResponse(this.announcements);
  }

  save(request: SaveAnnouncementRequest): Observable<{ message: string }> {
    // return this.http.post(`${environment.apiUrl}/Announcement`, request);
    if (request.announcementId) {
      const idx = this.announcements.findIndex(
        (a) => a.announcementId === request.announcementId,
      );
      if (idx > -1) {
        this.announcements[idx] = {
          ...this.announcements[idx],
          ...request,
          updatedOn: new Date().toISOString(),
        };
      }
    } else {
      this.announcements.unshift({
        announcementId: nextId(this.announcements, 'announcementId'),
        title: request.title,
        description: request.description,
        imageUrl: request.imageUrl,
        publishDate: request.publishDate,
        expiryDate: request.expiryDate,
        isActive: request.isActive,
        createdBy: request.userId ?? null,
        createdOn: new Date().toISOString(),
        updatedBy: null,
        updatedOn: null,
      });
    }
    return mockResponse({ message: 'Announcement saved successfully.' });
  }

  delete(id: number): Observable<{ message: string }> {
    // return this.http.delete(`${environment.apiUrl}/Announcement/${id}`);
    this.announcements = this.announcements.filter((a) => a.announcementId !== id);
    return mockResponse({ message: 'Announcement deleted successfully.' });
  }
}
