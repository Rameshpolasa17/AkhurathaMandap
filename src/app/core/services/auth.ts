import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginRequest } from '@core/models/login-request';
import { LoginResponse } from '@core/models/login-response';
import { mockResponse } from '@core/mock-data/mock-utils';

/**
 * Frontend-only auth.
 *
 * Mock mode: any non-empty email + password logs in as a local admin. No token
 * is verified anywhere; the admin area is guarded only to keep it out of the way.
 *
 * API-READY: replace `login()` body with
 *   return this.http.post<LoginResponse>(`${environment.apiUrl}/Auth/login`, request);
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  login(request: LoginRequest): Observable<LoginResponse> {
    if (!request?.email?.trim() || !request?.password?.trim()) {
      return throwError(() => new Error('Email and password are required.'));
    }

    return mockResponse<LoginResponse>({
      userId: 1,
      fullName: 'Mandap Admin',
      email: request.email.trim(),
      roleName: 'Admin',
      token: 'mock-local-token',
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }
}
