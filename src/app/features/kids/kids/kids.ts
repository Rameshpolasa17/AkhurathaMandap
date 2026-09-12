import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './kids.html',
  styleUrl: './kids.scss',
})
export class Kids {
  private router = inject(Router);
  /*=========================================
              HERO STATS
  =========================================*/

  heroStats = [
    {
      number: '25+',
      title: 'Fun Activities',
    },
    {
      number: '500+',
      title: 'Happy Kids',
    },
    {
      number: '10+',
      title: 'Learning Games',
    },
  ];

  /*=========================================
              ACTIVITIES
  =========================================*/

  activities = [
    {
      icon: '🎨',
      title: 'Drawing',
      description: 'Ganesh drawing and colouring competitions to encourage creativity.',
      route: '/kids/drawing',
    },
    {
      icon: '📖',
      title: 'Story Telling',
      description: 'Interesting stories from Indian mythology and Lord Ganesha.',
      route: '/kids/stories',
    },
    {
      icon: '🎵',
      title: 'Bhajans',
      description: 'Learn devotional songs, rhymes and slokas in a fun way.',
      route: '/kids/bhajans',
    },
    {
      icon: '🧩',
      title: 'Puzzle Games',
      description: 'Interactive games that improve logical thinking and teamwork.',
      route: '/kids/puzzle-games',
    },
    {
      icon: '💃',
      title: 'Dance',
      description: 'Traditional and devotional dance performances by children.',
      route: '/kids/dance',
    },
    {
      icon: '🎭',
      title: 'Fancy Dress',
      description: 'Dress as mythological characters and perform on stage.',
      route: '/kids/fancy-dress',
    },
    {
      icon: '🧠',
      title: 'Quiz',
      description: 'Fun quiz based on Indian culture, festivals and mythology.',
      route: '/kids/quiz',
    },
    {
      icon: '🎁',
      title: 'Lucky Games',
      description: 'Surprise games with exciting gifts and memorable prizes.',
      route: '/kids/lucky-games',
    },
  ];

  /*=========================================
            LEARNING CORNER
  =========================================*/

  learningItems = [
    {
      icon: '📖',
      title: 'Mythological Stories',
      description: 'Interesting stories about Lord Ganesha and Indian culture.',
    },
    {
      icon: '🪔',
      title: 'Festival Traditions',
      description: 'Understand rituals, customs and spiritual importance.',
    },
    {
      icon: '🌿',
      title: 'Good Values',
      description: 'Learn kindness, respect, sharing and helping others.',
    },
    {
      icon: '🎨',
      title: 'Creative Workshops',
      description: 'Craft making, painting and eco-friendly idol activities.',
    },
  ];

  /*=========================================
                FUN GAMES
  =========================================*/

  games = [
    {
      icon: '🗺️',
      title: 'Treasure Hunt',
      description: 'Solve clues and discover hidden surprises with your friends.',
      age: 'Age 6+',
      image: 'images/kids/game-1.jpg',
    },
    {
      icon: '🧠',
      title: 'Memory Challenge',
      description: 'Improve concentration through fun and engaging memory games.',
      age: 'Age 5+',
      image: 'images/kids/game-2.jpg',
    },
    {
      icon: '🎵',
      title: 'Musical Chairs',
      description: 'Dance, enjoy music and compete with friends.',
      age: 'All Ages',
      image: 'images/kids/game-3.jpg',
    },
    {
      icon: '🎈',
      title: 'Balloon Blast',
      description: 'Colourful balloon games packed with fun and laughter.',
      age: 'Age 4+',
      image: 'images/kids/game-4.jpg',
    },
  ];

  /*=========================================
                GALLERY
  =========================================*/

  gallery = [
    {
      title: 'Drawing Competition',
      image: 'images/kids/gallery-1.jpg',
      class: 'large',
    },
    {
      title: 'Story Telling',
      image: 'images/kids/gallery-2.jpg',
      class: '',
    },
    {
      title: 'Fun Games',
      image: 'images/kids/gallery-3.jpg',
      class: '',
    },
    {
      title: 'Dance Performance',
      image: 'images/kids/gallery-4.jpg',
      class: '',
    },
    {
      title: 'Fancy Dress',
      image: 'images/kids/gallery-5.jpg',
      class: 'tall',
    },
    {
      title: 'Quiz Time',
      image: 'images/kids/gallery-6.jpg',
      class: '',
    },
    {
      title: 'Prize Distribution',
      image: 'images/kids/gallery-7.jpg',
      class: 'wide',
    },
    {
      title: 'Craft Workshop',
      image: 'images/kids/gallery-8.jpg',
      class: '',
    },
    {
      title: 'Happy Memories',
      image: 'images/kids/gallery-9.jpg',
      class: '',
    },
  ];

  /*=========================================
                PARENTS GUIDE
  =========================================*/

  guideItems = [
    {
      icon: '🛡️',
      title: 'Safe Environment',
      description: 'Dedicated volunteers supervise every activity.',
    },
    {
      icon: '🎓',
      title: 'Educational Activities',
      description: 'Fun learning through stories, games and workshops.',
    },
    {
      icon: '💧',
      title: 'Refreshments',
      description: 'Drinking water and snacks available for children.',
    },
    {
      icon: '📷',
      title: 'Memorable Moments',
      description: 'Professional photography during activities.',
    },
  ];

  /*=========================================
                    FAQ
  =========================================*/

  faqs = [
    {
      question: 'What is the minimum age to participate?',
      answer:
        'Children aged 4 years and above can participate. Some competitions have separate age categories.',
    },
    {
      question: 'Is there any registration fee?',
      answer: 'No. All Kids Zone activities are completely free.',
    },
    {
      question: 'Can parents stay with their children?',
      answer: 'Yes. Parents are welcome to accompany their children throughout the activities.',
    },
    {
      question: 'Are volunteers available?',
      answer: 'Yes. Dedicated volunteers supervise every activity.',
    },
    {
      question: 'Will every child receive a gift?',
      answer:
        'Every participating child receives a participation certificate and a memorable gift.',
    },
    {
      question: 'What should children bring?',
      answer: 'Bring your registration confirmation and lots of enthusiasm.',
    },
  ];
  goToActivity(route: string): void {
    this.router.navigate([route]);
  }
}
