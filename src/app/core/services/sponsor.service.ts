import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sponsor } from '@core/models/sponsors';
import { SaveSponsorRequest } from '@core/models/save-sponsor-request';
import { MOCK_SPONSORS } from '@core/mock-data/sponsors.mock';
import { mockResponse, nextId } from '@core/mock-data/mock-utils';

const TYPE_NAMES: Record<number, string> = {
  1: 'Title Sponsor',
  2: 'Platinum Sponsor',
  3: 'Gold Sponsor',
  4: 'Silver Sponsor',
  5: 'Bronze Sponsor',
  6: 'Supporter',
};

/**
 * Frontend-only sponsor store (in-memory, resets on reload).
 * API-READY: swap each body for the commented HttpClient call.
 */
@Injectable({ providedIn: 'root' })
export class SponsorService {
  private sponsors: Sponsor[] = MOCK_SPONSORS.map((s) => ({ ...s }));

  getAll(): Observable<Sponsor[]> {
    // return this.http.get<Sponsor[]>(`${environment.apiUrl}/Sponsor`);
    return mockResponse(this.sponsors);
  }

  /** Active sponsors, featured first — what the public Sponsors page renders. */
  getPublished(): Observable<Sponsor[]> {
    return this.getAll().pipe(
      map((list) =>
        list
          .filter((s) => s.isActive)
          .sort((a, b) => {
            if (a.sponsorTypeId !== b.sponsorTypeId) return a.sponsorTypeId - b.sponsorTypeId;
            return a.displayOrder - b.displayOrder;
          }),
      ),
    );
  }

  /** Top sponsors for the home-page strip. */
  getFeatured(count = 8): Observable<Sponsor[]> {
    return this.getPublished().pipe(map((list) => list.slice(0, count)));
  }

  save(model: SaveSponsorRequest): Observable<{ message: string }> {
    // return this.http.post(`${environment.apiUrl}/Sponsor`, model);
    const typeName = TYPE_NAMES[model.sponsorTypeId] ?? 'Supporter';
    if (model.sponsorId) {
      const idx = this.sponsors.findIndex((s) => s.sponsorId === model.sponsorId);
      if (idx > -1) {
        this.sponsors[idx] = {
          ...this.sponsors[idx],
          ...model,
          sponsorTypeName: typeName,
        };
      }
    } else {
      this.sponsors.push({
        ...model,
        sponsorId: nextId(this.sponsors, 'sponsorId'),
        sponsorTypeName: typeName,
      } as Sponsor);
    }
    return mockResponse({ message: 'Sponsor saved successfully.' });
  }

  delete(id: number): Observable<{ message: string }> {
    // return this.http.delete(`${environment.apiUrl}/Sponsor/${id}`);
    this.sponsors = this.sponsors.filter((s) => s.sponsorId !== id);
    return mockResponse({ message: 'Sponsor deleted successfully.' });
  }
}
