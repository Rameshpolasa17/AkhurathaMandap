import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScheduleDay } from '@core/models/schedule';
import { MOCK_SCHEDULE } from '@core/mock-data/schedule.mock';
import { mockResponse } from '@core/mock-data/mock-utils';

/**
 * Frontend-only festival schedule.
 * API-READY: replace each body with the matching HttpClient call.
 */
@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private days: ScheduleDay[] = MOCK_SCHEDULE.map((d) => ({ ...d }));

  getAll(): Observable<ScheduleDay[]> {
    // return this.http.get<ScheduleDay[]>(`${environment.apiUrl}/Schedule`);
    return mockResponse(this.days);
  }

  /** The first few days, for the home-page schedule preview. */
  getPreview(count = 4): Observable<ScheduleDay[]> {
    return this.getAll().pipe(map((days) => days.slice(0, count)));
  }
}
