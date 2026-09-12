import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommitteeMember, Volunteer } from '@core/models/people';
import { MOCK_COMMITTEE, MOCK_VOLUNTEERS } from '@core/mock-data/people.mock';
import { mockResponse } from '@core/mock-data/mock-utils';

/**
 * Frontend-only committee and volunteer directory.
 * API-READY: replace each body with the matching HttpClient call.
 */
@Injectable({ providedIn: 'root' })
export class PeopleService {
  getCommittee(): Observable<CommitteeMember[]> {
    // return this.http.get<CommitteeMember[]>(`${environment.apiUrl}/Committee`);
    return mockResponse([...MOCK_COMMITTEE].sort((a, b) => a.displayOrder - b.displayOrder));
  }

  getVolunteers(): Observable<Volunteer[]> {
    // return this.http.get<Volunteer[]>(`${environment.apiUrl}/Volunteer`);
    return mockResponse([...MOCK_VOLUNTEERS].sort((a, b) => a.displayOrder - b.displayOrder));
  }
}
