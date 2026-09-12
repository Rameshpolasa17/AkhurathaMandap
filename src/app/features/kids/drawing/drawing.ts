import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drawing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './drawing.html',
  styleUrl: './drawing.scss',
})
export class Drawing {
  activities = [
    {
      title: 'Coloring Book',
      icon: '🎨',
      description: 'Color beautiful Lord Ganesha drawings online.',
      route: '/kids/drawing/coloring',
    },

    {
      title: 'Free Drawing',
      icon: '✏️',
      description: 'Draw your own Ganesha artwork.',
      route: '/kids/drawing/free',
    },

    {
      title: 'Drawing Competition',
      icon: '🏆',
      description: 'Participate and win exciting prizes.',
      route: '/kids/drawing/competition',
    },

    {
      title: 'Kids Gallery',
      icon: '🖼️',
      description: 'View amazing drawings created by children.',
      route: '/kids/drawing/gallery',
    },
  ];
}
