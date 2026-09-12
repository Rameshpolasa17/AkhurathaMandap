import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '@core/models/event';
import { SaveEventRequest } from '@core/models/save-event-request';
import { MOCK_EVENTS } from '@core/mock-data/events.mock';
import { mockResponse, nextId } from '@core/mock-data/mock-utils';

/**
 * Frontend-only event store (in-memory, resets on reload).
 * API-READY: swap each body for the commented HttpClient call.
 */
@Injectable({ providedIn: 'root' })
export class EventService {
  private events: Event[] = MOCK_EVENTS.map((e) => ({ ...e }));

  getAll(): Observable<Event[]> {
    // return this.http.get<Event[]>(`${environment.apiUrl}/Event`);
    return mockResponse(this.events);
  }

  /** Active events, earliest first — what the public Events page renders. */
  getPublished(): Observable<Event[]> {
    return this.getAll().pipe(
      map((list) =>
        list
          .filter((e) => e.isActive)
          .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
      ),
    );
  }

  /** Featured events for the home-page preview. */
  getFeatured(count = 3): Observable<Event[]> {
    return this.getPublished().pipe(
      map((list) => {
        const featured = list.filter((e) => e.featured);
        return (featured.length ? featured : list).slice(0, count);
      }),
    );
  }

  /** Distinct categories present in the published set. */
  getCategories(): Observable<string[]> {
    return this.getPublished().pipe(
      map((list) => [...new Set(list.map((e) => e.category ?? '').filter(Boolean))]),
    );
  }

  save(request: SaveEventRequest): Observable<{ message: string }> {
    // return this.http.post(`${environment.apiUrl}/Event`, request);
    if (request.eventId) {
      const idx = this.events.findIndex((e) => e.eventId === request.eventId);
      if (idx > -1) {
        this.events[idx] = {
          ...this.events[idx],
          ...request,
          updatedOn: new Date().toISOString(),
        };
      }
    } else {
      this.events.unshift({
        eventId: nextId(this.events, 'eventId'),
        title: request.title,
        description: request.description,
        location: request.location,
        imageUrl: request.imageUrl,
        startDate: request.startDate,
        endDate: request.endDate,
        isActive: request.isActive,
        createdBy: request.userId ?? 1,
        createdOn: new Date().toISOString(),
        updatedBy: request.userId ?? 1,
        updatedOn: new Date().toISOString(),
      });
    }
    return mockResponse({ message: 'Event saved successfully.' });
  }

  delete(id: number): Observable<{ message: string }> {
    // return this.http.delete(`${environment.apiUrl}/Event/${id}`);
    this.events = this.events.filter((e) => e.eventId !== id);
    return mockResponse({ message: 'Event deleted successfully.' });
  }
}
