import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Competition } from '@core/models/competition';
import { MOCK_COMPETITIONS } from '@core/mock-data/competitions.mock';
import { mockResponse } from '@core/mock-data/mock-utils';

/**
 * Frontend-only competition data.
 * API-READY: replace each body with the matching HttpClient call.
 */
@Injectable({ providedIn: 'root' })
export class CompetitionService {
  private competitions: Competition[] = MOCK_COMPETITIONS.map((c) => ({ ...c }));

  getAll(): Observable<Competition[]> {
    // return this.http.get<Competition[]>(`${environment.apiUrl}/Competition`);
    return mockResponse(
      this.competitions
        .filter((c) => c.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    );
  }

  getCategories(): Observable<string[]> {
    return this.getAll().pipe(map((list) => [...new Set(list.map((c) => c.category))]));
  }
}
