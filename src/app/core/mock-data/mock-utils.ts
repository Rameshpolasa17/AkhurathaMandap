import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Wraps mock data in an Observable with a small artificial delay so components
 * still exercise their loading / empty states exactly as they would with a real
 * API. Returns a deep copy so callers can never mutate the in-memory seed data.
 */
export function mockResponse<T>(data: T, ms = 200): Observable<T> {
  const clone =
    typeof structuredClone === 'function'
      ? structuredClone(data)
      : JSON.parse(JSON.stringify(data));
  return of(clone).pipe(delay(ms));
}

/** Next incremental id for an in-memory collection. */
export function nextId<T>(items: T[], key: keyof T): number {
  return items.reduce((max, item) => Math.max(max, Number(item[key]) || 0), 0) + 1;
}
