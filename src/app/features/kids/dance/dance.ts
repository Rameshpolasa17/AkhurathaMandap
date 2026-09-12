import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface DanceCategory {
  icon: string;
  title: string;
  description: string;
  age: string;
  duration: string;
}

interface DancePerformance {
  title: string;
  performer: string;
  category: string;
  ageGroup: string;
  time: string;
  image: string;
}

interface DanceVideo {
  title: string;
  description: string;
  videoId: string;
  category: string;
}

interface DanceGallery {
  title: string;
  image: string;
  class: string;
}

interface DanceGuideline {
  icon: string;
  title: string;
  description: string;
}

interface DancePrize {
  position: string;
  icon: string;
  title: string;
  prize: string;
  description: string;
}

interface DanceFaq {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-dance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dance.html',
  styleUrl: './dance.scss',
})
export class Dance {
  private router = inject(Router);

  private sanitizer = inject(DomSanitizer);

  /*=========================================================
                          HERO
  =========================================================*/

  heroTitle = 'Dance With Devotion';

  heroSubtitle =
    'Celebrate tradition, devotion and creativity through beautiful dance performances at Akhuratha Mandap.';

  heroStats = [
    {
      number: '50+',
      label: 'Performers',
    },
    {
      number: '10+',
      label: 'Dance Events',
    },
    {
      number: '5+',
      label: 'Categories',
    },
    {
      number: '100%',
      label: 'Fun & Devotion',
    },
  ];

  /*=========================================================
                    SELECTED CATEGORY
  =========================================================*/

  selectedCategory = 0;

  /*=========================================================
                    DANCE CATEGORIES
  =========================================================*/

  danceCategories: DanceCategory[] = [
    {
      icon: '🪔',
      title: 'Devotional Dance',
      description: 'Beautiful devotional performances dedicated to Lord Ganesha and other deities.',
      age: 'All Ages',
      duration: '3 - 6 min',
    },
    {
      icon: '💃',
      title: 'Classical Dance',
      description: 'Traditional Bharatanatyam and other Indian classical dance performances.',
      age: 'Age 6+',
      duration: '5 - 8 min',
    },
    {
      icon: '🌸',
      title: 'Folk Dance',
      description: 'Colourful Indian folk dances celebrating our rich culture and traditions.',
      age: 'Age 5+',
      duration: '4 - 7 min',
    },
    {
      icon: '👯',
      title: 'Group Dance',
      description: 'Perform together with friends and create a memorable festival performance.',
      age: 'Age 6+',
      duration: '5 - 8 min',
    },
    {
      icon: '⭐',
      title: 'Solo Dance',
      description: 'Show your individual talent and confidence on the Akhuratha Mandap stage.',
      age: 'Age 5+',
      duration: '3 - 5 min',
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Dance',
      description:
        'Parents and children can perform together and celebrate the festival as a family.',
      age: 'Family',
      duration: '4 - 7 min',
    },
  ];

  /*=========================================================
                  UPCOMING PERFORMANCES
  =========================================================*/

  performances: DancePerformance[] = [
    {
      title: 'Ganesh Vandana',
      performer: 'Kids Classical Group',
      category: 'Devotional',
      ageGroup: 'Age 8 - 12',
      time: '6:30 PM',
      image: 'images/dance/performance-1.jpg',
    },
    {
      title: 'Bharatanatyam Performance',
      performer: 'Young Artists',
      category: 'Classical',
      ageGroup: 'Age 10+',
      time: '7:00 PM',
      image: 'images/dance/performance-2.jpg',
    },
    {
      title: 'Festival Folk Dance',
      performer: 'Little Stars',
      category: 'Folk',
      ageGroup: 'Age 6 - 10',
      time: '7:30 PM',
      image: 'images/dance/performance-3.jpg',
    },
    {
      title: 'Ganapati Celebration Dance',
      performer: 'Akhuratha Kids Team',
      category: 'Group',
      ageGroup: 'Age 8+',
      time: '8:00 PM',
      image: 'images/dance/performance-4.jpg',
    },
  ];

  /*=========================================================
                      AGE GROUPS
  =========================================================*/

  ageGroups = [
    {
      icon: '🌱',
      age: '5 - 7 Years',
      title: 'Little Stars',
      description: 'Simple and fun performances designed especially for our youngest participants.',
    },
    {
      icon: '🌟',
      age: '8 - 10 Years',
      title: 'Rising Stars',
      description: 'Creative performances encouraging confidence, rhythm and stage presence.',
    },
    {
      icon: '✨',
      age: '11 - 14 Years',
      title: 'Young Performers',
      description: 'Advanced performances showcasing dance skills, expressions and creativity.',
    },
    {
      icon: '🏆',
      age: '15+ Years',
      title: 'Open Category',
      description: 'A special open category for experienced dancers and advanced performances.',
    },
  ];

  /*=========================================================
                    PARTICIPATION STEPS
  =========================================================*/

  participationSteps = [
    {
      number: '01',
      icon: '📝',
      title: 'Register',
      description: 'Register your child or dance group for the Akhuratha Mandap dance event.',
    },
    {
      number: '02',
      icon: '💃',
      title: 'Choose Category',
      description: 'Select solo, group, devotional, classical, folk or family dance.',
    },
    {
      number: '03',
      icon: '🎵',
      title: 'Prepare Performance',
      description: 'Choose your music and prepare a beautiful festival-appropriate performance.',
    },
    {
      number: '04',
      icon: '🎭',
      title: 'Perform',
      description: 'Step onto the stage and confidently showcase your talent.',
    },
    {
      number: '05',
      icon: '🏆',
      title: 'Celebrate',
      description: 'Receive appreciation, certificates and special prizes for your participation.',
    },
  ];

  /*=========================================================
                      GUIDELINES
  =========================================================*/

  guidelines: DanceGuideline[] = [
    {
      icon: '⏱️',
      title: 'Performance Duration',
      description: 'Performances should remain within the time limit specified for each category.',
    },
    {
      icon: '🎵',
      title: 'Music Track',
      description:
        'Participants should provide a clear and properly edited audio track before the event.',
    },
    {
      icon: '👗',
      title: 'Costume',
      description: 'Traditional, devotional and culturally appropriate costumes are encouraged.',
    },
    {
      icon: '🙏',
      title: 'Festival Appropriate',
      description:
        'Music, choreography and costumes must be suitable for a family festival environment.',
    },
    {
      icon: '🕐',
      title: 'Report Early',
      description:
        'Participants should report to the backstage coordinator before their scheduled performance.',
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Parent Support',
      description:
        'Parents may help younger children prepare before they enter the performance area.',
    },
  ];

  /*=========================================================
                    YOUTUBE VIDEOS
  =========================================================*/

  youtubeVideos: DanceVideo[] = [
    {
      title: 'Ganesh Vandana Dance',
      description: 'Watch a devotional Ganesh dance performance for inspiration.',
      videoId: 'YOUR_VIDEO_ID_1',
      category: 'Devotional',
    },
    {
      title: 'Kids Classical Dance',
      description: 'Beautiful classical dance inspiration for young performers.',
      videoId: 'YOUR_VIDEO_ID_2',
      category: 'Classical',
    },
    {
      title: 'Kids Group Dance',
      description: 'Fun group dance ideas for festival celebrations.',
      videoId: 'YOUR_VIDEO_ID_3',
      category: 'Group',
    },
    {
      title: 'Ganesh Festival Dance',
      description: 'Festival dance inspiration dedicated to Lord Ganesha.',
      videoId: 'YOUR_VIDEO_ID_4',
      category: 'Festival',
    },
  ];

  /*=========================================================
                        GALLERY
  =========================================================*/

  gallery: DanceGallery[] = [
    {
      title: 'Ganesh Vandana',
      image: 'images/dance/gallery-1.jpg',
      class: 'large',
    },
    {
      title: 'Classical Performance',
      image: 'images/dance/gallery-2.jpg',
      class: '',
    },
    {
      title: 'Little Stars',
      image: 'images/dance/gallery-3.jpg',
      class: '',
    },
    {
      title: 'Group Performance',
      image: 'images/dance/gallery-4.jpg',
      class: 'tall',
    },
    {
      title: 'Festival Dance',
      image: 'images/dance/gallery-5.jpg',
      class: '',
    },
    {
      title: 'Traditional Dance',
      image: 'images/dance/gallery-6.jpg',
      class: '',
    },
    {
      title: 'Award Ceremony',
      image: 'images/dance/gallery-7.jpg',
      class: 'wide',
    },
    {
      title: 'Happy Performers',
      image: 'images/dance/gallery-8.jpg',
      class: '',
    },
  ];

  /*=========================================================
                        PRIZES
  =========================================================*/

  prizes: DancePrize[] = [
    {
      position: '2nd',
      icon: '🥈',
      title: 'Second Prize',
      prize: 'Runner Up',
      description: 'Awarded for an excellent and memorable dance performance.',
    },
    {
      position: '1st',
      icon: '🥇',
      title: 'First Prize',
      prize: 'Dance Champion',
      description: 'Awarded to the outstanding performer of the competition.',
    },
    {
      position: '3rd',
      icon: '🥉',
      title: 'Third Prize',
      prize: 'Rising Star',
      description: 'Awarded for creativity, confidence and beautiful presentation.',
    },
  ];

  /*=========================================================
                    PARTICIPATION BENEFITS
  =========================================================*/

  participationBenefits = [
    {
      icon: '📜',
      title: 'Certificate',
      description: 'Every participating child receives a participation certificate.',
    },
    {
      icon: '🎁',
      title: 'Special Gift',
      description: 'Participants receive a memorable festival gift.',
    },
    {
      icon: '📸',
      title: 'Festival Memories',
      description: 'Capture beautiful stage moments and festival memories.',
    },
    {
      icon: '⭐',
      title: 'Build Confidence',
      description: 'Performing on stage helps children develop confidence and creativity.',
    },
  ];

  /*=========================================================
                          FAQ
  =========================================================*/

  faqs: DanceFaq[] = [
    {
      question: 'What is the minimum age for the dance event?',
      answer:
        'Children aged 5 years and above can participate. Separate age groups may be provided depending on registrations.',
    },
    {
      question: 'Can children participate in both solo and group dance?',
      answer:
        'Yes. Children may participate in multiple categories when the event schedule permits.',
    },
    {
      question: 'Is there any registration fee?',
      answer: 'Currently the Kids Zone dance activities are planned as free festival activities.',
    },
    {
      question: 'What type of music can be used?',
      answer: 'Devotional, classical, folk and family-friendly festival music can be used.',
    },
    {
      question: 'Can parents help children backstage?',
      answer:
        'Parents may assist younger children before the performance, subject to backstage coordination rules.',
    },
    {
      question: 'Will participants receive certificates?',
      answer:
        'Yes. Participation certificates are planned for children who successfully participate in the event.',
    },
  ];

  /*=========================================================
                        METHODS
  =========================================================*/

  selectCategory(index: number): void {
    this.selectedCategory = index;
  }

  /*=========================================================
                      YOUTUBE URL
  =========================================================*/

  getVideoUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`,
    );
  }

  /*=========================================================
                        REGISTER
  =========================================================*/

  registerForDance(): void {
    /*
      Later we will connect this to the
      Kids Competition Registration component/API.
    */

    console.log('Dance registration clicked');
  }

  /*=========================================================
                    SCROLL TO CATEGORIES
  =========================================================*/

  exploreCategories(): void {
    const element = document.getElementById('danceCategories');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  /*=========================================================
                      SCROLL TO VIDEOS
  =========================================================*/

  watchPerformances(): void {
    const element = document.getElementById('danceVideos');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  /*=========================================================
                        KIDS ZONE
  =========================================================*/

  goToKidsZone(): void {
    this.router.navigate(['/kids']);
  }
}
