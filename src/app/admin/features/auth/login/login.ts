import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth';
import { LoginRequest } from '@core/models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);

  private router = inject(Router);

  request: LoginRequest = {
    email: '',
    password: '',
  };

  loading = false;

  errorMessage = '';

  login(): void {
    this.loading = true;

    this.errorMessage = '';

    this.authService.login(this.request).subscribe({
      next: (response) => {
        this.loading = false;

        this.authService.saveToken(response.token);

        localStorage.setItem('userName', response.fullName);

        this.router.navigate(['/admin/dashboard']);
      },

      error: () => {
        this.loading = false;

        this.errorMessage = 'Invalid Email or Password';
      },
    });
  }
}
