import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { EventService } from '@core/services/event';
import { Event } from '@core/models/event';
import { SaveEventRequest } from '@core/models/save-event-request';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-form.html',
  styleUrl: './event-form.scss',
})
export class EventForm implements OnChanges {
  private eventService = inject(EventService);

  @Input() event?: Event;

  @Output() close = new EventEmitter<void>();

  loading = false;

  request: SaveEventRequest = {
    eventId: 0,
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDate: '',
    endDate: '',
    isActive: true,
    userId: 1,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event'] && this.event) {
      this.request = {
        eventId: this.event.eventId,
        title: this.event.title,
        description: this.event.description,
        location: this.event.location,
        imageUrl: this.event.imageUrl,
        startDate: this.event.startDate.substring(0, 10),
        endDate: this.event.endDate ? this.event.endDate.substring(0, 10) : '',
        isActive: this.event.isActive,
        userId: this.event.createdBy ?? 1,
      };
    }
  }

  cancel(): void {
    this.close.emit();
  }

  save(): void {
    if (!this.request.title.trim()) {
      Swal.fire('Validation', 'Event Title is required.', 'warning');
      return;
    }

    if (!this.request.startDate) {
      Swal.fire('Validation', 'Start Date is required.', 'warning');
      return;
    }

    this.loading = true;

    this.eventService.save(this.request).subscribe({
      next: () => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: this.request.eventId === 0 ? 'Event Added' : 'Event Updated',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          this.close.emit();
        });
      },
      error: () => {
        this.loading = false;

        Swal.fire('Error', 'Unable to save event.', 'error');
      },
    });
  }
}
