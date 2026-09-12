import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { APP_CONFIG } from '@core/config/app.config';
import { WhatsAppService } from '@core/services/whatsapp.service';
import { RevealOnScrollDirective } from '@shared/directives/reveal-on-scroll.directive';

/**
 * "Send Us a Message".
 *
 * The message is handed to WhatsApp with the details pre-filled — the site
 * itself does not send or store anything, so the confirmation says
 * "Opening WhatsApp…" rather than claiming the message was sent.
 */
@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [ReactiveFormsModule, RevealOnScrollDirective],
  templateUrl: './message-form.html',
  styleUrl: './message-form.scss',
})
export class MessageForm {
  private fb = inject(FormBuilder);
  private whatsapp = inject(WhatsAppService);

  readonly config = APP_CONFIG;
  readonly whatsappAvailable = this.whatsapp.isConfigured;

  readonly submitted = signal(false);
  readonly opening = signal(false);

  readonly form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    // Optional, but must be a real address when provided.
    email: ['', [Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  /** Shows an error only once the field has been touched or submit attempted. */
  invalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.touched || this.submitted());
  }

  errorFor(field: string): string {
    const control = this.form.get(field);
    if (!control || !control.errors) {
      return '';
    }
    if (control.errors['required']) {
      return 'This field is required.';
    }
    if (control.errors['email']) {
      return 'Enter a valid email address.';
    }
    if (control.errors['pattern']) {
      return 'Enter a valid 10-digit Indian mobile number.';
    }
    if (control.errors['minlength']) {
      const min = control.errors['minlength'].requiredLength;
      return `Please enter at least ${min} characters.`;
    }
    return 'Please check this field.';
  }

  submit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      // Move focus to the first problem so keyboard users are not stranded.
      const firstInvalid = Object.keys(this.form.controls).find((key) =>
        this.form.get(key)?.invalid,
      );
      if (firstInvalid) {
        document.getElementById(`msg-${firstInvalid}`)?.focus();
      }
      return;
    }

    const value = this.form.getRawValue();

    this.opening.set(true);

    const launched = this.whatsapp.openGeneralMessage({
      name: value.name,
      mobile: value.mobile,
      email: value.email || undefined,
      message: value.message,
    });

    if (launched) {
      this.form.reset();
      this.submitted.set(false);
      // Leave the "Opening WhatsApp…" note up long enough to be read.
      setTimeout(() => this.opening.set(false), 4000);
    } else {
      this.opening.set(false);
    }
  }
}
