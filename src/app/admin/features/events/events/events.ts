import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventService } from '@core/services/event';
import { Event } from '@core/models/event';
import Swal from 'sweetalert2';
import { EventForm } from '../../../shared/event-form/event-form';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, EventForm],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  private eventService = inject(EventService);
  private cdr = inject(ChangeDetectorRef);
  events: Event[] = [];

  showForm = false;

  selectedEvent?: Event;

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAll().subscribe({
      next: (response) => {
        this.events = [...response];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openForm(): void {
    this.selectedEvent = undefined;
    this.showForm = true;
  }

  edit(item: Event): void {
    this.selectedEvent = item;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedEvent = undefined;
    this.loadEvents();
  }
  delete(item: Event): void {
    Swal.fire({
      title: 'Delete Event?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.delete(item.eventId).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Event deleted successfully.',
              timer: 1500,
              showConfirmButton: false,
            });

            this.loadEvents();
          },

          error: (error) => {
            console.error(error);

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Unable to delete event.',
            });
          },
        });
      }
    });
  }
}
