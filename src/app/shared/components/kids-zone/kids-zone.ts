import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Kids Zone home-page section.
 *
 * Hidden while `KIDS_ENABLED` is false — the home template guards it and
 * `kidsGuard` closes the routes. Every button below is wired to a real Kids
 * route so the section works immediately when the flag is switched back on.
 */
@Component({
  selector: 'app-kids-zone',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './kids-zone.html',
  styleUrl: './kids-zone.scss',
})
export class KidsZone {
  activities = [
    {
      title: 'Coloring',
      icon: 'palette',
      description: 'Colour in Ganesh drawings right in the browser.',
      route: '/kids/coloring-book',
    },
    {
      title: 'Stories',
      icon: 'menu_book',
      description: 'Read inspiring stories of Lord Ganesha.',
      route: '/kids/stories',
    },
    {
      title: 'Quiz',
      icon: 'quiz',
      description: 'Test your knowledge with fun quizzes.',
      route: '/kids/quiz',
    },
    {
      title: 'Fancy Dress',
      icon: 'emoji_emotions',
      description: 'Everything about the fancy dress competition.',
      route: '/kids/fancy-dress',
    },
    {
      title: 'Bhajans',
      icon: 'music_note',
      description: 'Sing devotional bhajans and rhymes together.',
      route: '/kids/bhajans',
    },
    {
      title: 'Puzzles',
      icon: 'extension',
      description: 'Jigsaws, memory games and word searches.',
      route: '/kids/puzzle-games',
    },
  ];
}
