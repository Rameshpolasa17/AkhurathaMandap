import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { WhatsAppService } from '@core/services/whatsapp.service';

export type RegistrationKind = 'event' | 'competition';

/**
 * One registration modal shared by Events and Competitions.
 *
 * Nothing is saved anywhere: on submit the details are handed to WhatsApp with
 * the message pre-filled, and the committee confirms the slot from there. The
 * copy says so explicitly rather than implying a database record was created.
 */
@Component({
  selector: 'app-registration-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-dialog.html',
  styleUrl: './registration-dialog.scss',
})
export class RegistrationDialog {
  private fb = inject(FormBuilder);
  private whatsapp = inject(WhatsAppService);

  /** 'event' hides the age field; 'competition' shows it. */
  @Input() kind: RegistrationKind = 'event';
  /** Name of the event or competition being registered for. */
  @Input() subject = '';
  /** Optional supporting line, e.g. the date and venue. */
  @Input() subtitle = '';

  @Output() closed = new EventEmitter<void>();

  readonly whatsappAvailable = this.whatsapp.isConfigured;
  readonly submitted = signal(false);
  readonly opening = signal(false);

  readonly form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    age: [''],
    mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email: ['', [Validators.email]],
    message: [''],
  });

  get heading(): string {
    return this.kind === 'competition' ? 'Competition Registration' : 'Event Registration';
  }

  invalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.touched || this.submitted());
  }

  errorFor(field: string): string {
    const errors = this.form.get(field)?.errors;
    if (!errors) {
      return '';
    }
    if (errors['required']) {
      return 'This field is required.';
    }
    if (errors['email']) {
      return 'Enter a valid email address.';
    }
    if (errors['pattern']) {
      return 'Enter a valid 10-digit Indian mobile number.';
    }
    if (errors['minlength']) {
      return `Please enter at least ${errors['minlength'].requiredLength} characters.`;
    }
    return 'Please check this field.';
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.closed.emit();
  }

  /** Closes only when the backdrop itself is clicked, not the panel. */
  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  submit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    this.opening.set(true);

    const launched =
      this.kind === 'competition'
        ? this.whatsapp.openCompetitionRegistration({
            competitionName: this.subject,
            name: v.name,
            age: v.age || undefined,
            mobile: v.mobile,
            email: v.email || undefined,
            message: v.message || undefined,
          })
        : this.whatsapp.openEventRegistration({
            eventName: this.subject,
            name: v.name,
            mobile: v.mobile,
            email: v.email || undefined,
            message: v.message || undefined,
          });

    if (launched) {
      // Give the user a moment to see the confirmation before the modal closes.
      setTimeout(() => {
        this.opening.set(false);
        this.close();
      }, 1600);
    } else {
      this.opening.set(false);
    }
  }
}
