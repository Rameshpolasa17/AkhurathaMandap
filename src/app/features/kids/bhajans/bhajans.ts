import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-bhajans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bhajans.html',
  styleUrl: './bhajans.scss',
})
export class Bhajans {
  private sanitizer = inject(DomSanitizer);

  /*=========================================================
                        HERO
  =========================================================*/

  heroTitle = 'గణేశ భజనలు & మంత్రాలు';

  heroSubtitle = 'భక్తితో పాడండి • మంత్రాలు నేర్చుకోండి • శ్రీ గణేశుని ఆశీస్సులు పొందండి';

  /*=========================================================
                        BHAJANS
  =========================================================*/

  selectedBhajan = 0;

  bhajans = [
    {
      title: 'వక్రతుండ మహాకాయ',
      english: 'Vakratunda Mahakaya',
      duration: '2:10',
      singer: 'Traditional',
      image: 'images/bhajans/vakratunda.jpg',
      audio: 'audio/vakratunda.mp3',
      lyrics: `వక్రతుండ మహాకాయ
సూర్యకోటి సమప్రభ
నిర్విఘ్నం కురు మే దేవ
సర్వ కార్యేషు సర్వదా`,
    },

    {
      title: 'ఓం గం గణపతయే నమః',
      english: 'Om Gam Ganapataye Namaha',
      duration: '3:25',
      singer: 'Traditional',
      image: 'images/bhajans/om-gam.jpg',
      audio: 'audio/om-gam.mp3',
      lyrics: `ఓం గం గణపతయే నమః`,
    },

    {
      title: 'గణపతి బప్పా మోరియా',
      english: 'Ganapati Bappa Morya',
      duration: '4:12',
      singer: 'Devotional',
      image: 'images/bhajans/bappa.jpg',
      audio: 'audio/bappa.mp3',
      lyrics: `గణపతి బప్పా మోరియా
మంగళ మూర్తి మోరియా`,
    },

    {
      title: 'జై గణేశ జై గణేశ',
      english: 'Jai Ganesha',
      duration: '5:10',
      singer: 'Traditional',
      image: 'images/bhajans/jai-ganesha.jpg',
      audio: 'audio/jai-ganesha.mp3',
      lyrics: `జై గణేశ జై గణేశ
జై గణేశ దేవా`,
    },
  ];

  /*=========================================================
                        MANTRAS
  =========================================================*/

  mantras = [
    {
      title: 'ఓం గం గణపతయే నమః',
      meaning: 'విఘ్నాలను తొలగించే గణపతిని స్మరిస్తూ జపించే మహా మంత్రం.',
    },

    {
      title: 'వక్రతుండ మహాకాయ',
      meaning: 'ప్రతి శుభకార్యం ప్రారంభించే ముందు పఠించే శ్లోకం.',
    },

    {
      title: 'గణేశ గాయత్రి మంత్రం',
      meaning: 'జ్ఞానం, బుద్ధి మరియు విజయాన్ని ప్రసాదించే మంత్రం.',
    },

    {
      title: 'గణపతి అథర్వశీర్షం',
      meaning: 'గణపతి మహిమను తెలియజేసే పవిత్ర వేద మంత్రం.',
    },
  ];

  /*=========================================================
                    MORNING PRAYERS
  =========================================================*/

  morningPrayers = [
    {
      title: 'ప్రాతః స్మరణం',
      text: 'ప్రతి ఉదయం శ్రీ గణేశుని స్మరించడం ద్వారా రోజు శుభప్రదంగా ప్రారంభమవుతుంది.',
    },

    {
      title: 'శుభ ప్రార్థన',
      text: 'విద్య, ఆరోగ్యం మరియు విజయాన్ని ప్రసాదించమని గణపతిని ప్రార్థించండి.',
    },
  ];

  /*=========================================================
                      KIDS RHYMES
  =========================================================*/

  rhymes = [
    {
      title: 'గణపయ్య వచ్చాడయ్యా',
      duration: '2:40',
      image: 'images/bhajans/rhyme-1.jpg',
    },

    {
      title: 'వినాయకుడా వినాయకుడా',
      duration: '3:10',
      image: 'images/bhajans/rhyme-2.jpg',
    },

    {
      title: 'లంబోదర లడ్డూ రాజా',
      duration: '2:55',
      image: 'images/bhajans/rhyme-3.jpg',
    },
  ];

  /*=========================================================
                    YOUTUBE VIDEOS
  =========================================================*/

  videos = [
    {
      title: 'Vakratunda Mahakaya',
      videoId: 'dL0y6Xj6K2E',
    },

    {
      title: 'Ganesh Aarti',
      videoId: '6d5SS0gS5bU',
    },

    {
      title: 'Bal Ganesh Bhajan',
      videoId: 'D0sKXjv2z2I',
    },
  ];

  /*=========================================================
                        METHODS
  =========================================================*/

  selectBhajan(index: number): void {
    this.selectedBhajan = index;
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`,
    );
  }
}
