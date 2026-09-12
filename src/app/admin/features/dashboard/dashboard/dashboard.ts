import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  cards = [
    {
      title: 'Announcements',
      count: 12,
      icon: 'fa-solid fa-bullhorn',
      color: '#ff9800',
    },
    {
      title: 'Events',
      count: 18,
      icon: 'fa-solid fa-calendar-days',
      color: '#4caf50',
    },
    {
      title: 'Gallery Photos',
      count: 520,
      icon: 'fa-solid fa-images',
      color: '#2196f3',
    },
    {
      title: 'Sponsors',
      count: 24,
      icon: 'fa-solid fa-handshake',
      color: '#e91e63',
    },
  ];

  recentActivities = [
    'New announcement added.',
    'Ganesh Chaturthi event updated.',
    'Gallery uploaded with 25 photos.',
    'New sponsor registered.',
  ];
}
