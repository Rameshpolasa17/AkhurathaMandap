import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stories.html',
  styleUrl: './stories.scss',
})
export class Stories {
  selectedStory = 0;
  showStoryBook = false;
  private sanitizer = inject(DomSanitizer);
  isSpeaking = false;

  listenStory(): void {
    if (!('speechSynthesis' in window)) {
      alert('Speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const pages = this.storyContent[this.selectedStory].pages.join(' ');

    const speech = new SpeechSynthesisUtterance(pages);

    speech.lang = 'te-IN'; // Telugu

    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
      this.isSpeaking = true;
    };

    speech.onend = () => {
      this.isSpeaking = false;
    };

    speech.onerror = () => {
      this.isSpeaking = false;
    };

    window.speechSynthesis.speak(speech);
  }

  stopStory(): void {
    window.speechSynthesis.cancel();
    this.isSpeaking = false;
  }
  stories = [
    {
      title: 'The Birth of Lord Ganesha',
      image: 'images/stories/story-1.jpg',
      duration: '5 min',
      category: 'Popular',
      description:
        'Learn how Goddess Parvati created Lord Ganesha and why Lord Shiva blessed him with an elephant head.',
      moral: 'Obedience, Respect and Devotion',
    },
    {
      title: 'Ganesha and the Moon',
      image: 'images/stories/story-2.jpg',
      duration: '4 min',
      category: 'Moral Story',
      description: 'A beautiful story explaining why we should never laugh at others.',
      moral: 'Humility',
    },
    {
      title: 'Race Around the World',
      image: 'images/stories/story-3.jpg',
      duration: '6 min',
      category: 'Wisdom',
      description: 'Ganesha teaches that parents are our entire world through his wisdom.',
      moral: 'Love Your Parents',
    },
    {
      title: 'Broken Tusk',
      image: 'images/stories/story-4.jpg',
      duration: '5 min',
      category: 'Sacrifice',
      description: 'How Lord Ganesha broke his tusk to complete writing the Mahabharata.',
      moral: 'Dedication',
    },
    {
      title: "Kubera's Feast",
      image: 'images/stories/story-5.jpg',
      duration: '5 min',
      category: 'Values',
      description: 'A lesson that pride and arrogance never lead to happiness.',
      moral: 'Humility',
    },
    {
      title: 'Ganesha and Kartikeya',
      image: 'images/stories/story-6.jpg',
      duration: '7 min',
      category: 'Family',
      description: 'An inspiring story about wisdom, family values and true victory.',
      moral: 'Family First',
    },
  ];

  storyContent = [
    {
      title: 'శ్రీ గణేశుడి జననం',
      pages: [
        'ఒకరోజు పార్వతీ దేవి స్నానం చేయడానికి ముందు తన శరీరానికి పూసుకున్న పసుపుతో ఒక బాలుడిని సృష్టించి అతనికి ప్రాణం పోశారు.',
        'ఆ బాలుడికి "నేను స్నానం చేసి వచ్చే వరకు ఎవ్వరినీ లోపలికి అనుమతించవద్దు" అని ఆజ్ఞ ఇచ్చారు.',
        'ఆ సమయంలో పరమశివుడు అక్కడికి వచ్చారు. బాలుడు ఆయనను కూడా లోపలికి వెళ్లనీయలేదు.',
        'దీంతో కోపించిన శివుడు బాలుడి తలను ఖండించారు. పార్వతీ దేవి తీవ్రంగా బాధపడగా, శివుడు ఏనుగు తలను అమర్చి అతనికి జీవం ప్రసాదించారు.',
        'అప్పటి నుండి ఆయన విఘ్నాలను తొలగించే విఘ్నేశ్వరుడు, గణపతి, వినాయకుడిగా ప్రపంచమంతా పూజించబడుతున్నాడు.',
      ],
    },

    {
      title: 'గణేశుడు మరియు చంద్రుడు',
      pages: [
        'ఒకసారి గణేశుడు ఎంతో మోదకాలు తిని తన వాహనమైన ఎలుకపై ప్రయాణం చేస్తున్నాడు.',
        'అప్పుడే ఎలుక పామును చూసి భయపడటంతో గణేశుడు కిందపడిపోయాడు.',
        'ఈ దృశ్యాన్ని చూసి చంద్రుడు నవ్వడం ప్రారంభించాడు.',
        'దాంతో గణేశుడు కోపంతో చంద్రుడిని శపించాడు. తన తప్పును గ్రహించిన చంద్రుడు క్షమాపణ కోరాడు.',
        'చివరికి గణేశుడు శాపాన్ని కొంతవరకు ఉపసంహరించి వినయం యొక్క ప్రాముఖ్యతను అందరికీ తెలియజేశాడు.',
      ],
    },

    {
      title: 'ప్రపంచ ప్రదక్షిణ',
      pages: [
        'శివపార్వతులు గణేశుడు మరియు కుమారస్వామికి ఒక పోటీ పెట్టారు.',
        'ఎవరు ముందుగా ప్రపంచానికి ప్రదక్షిణ చేసి వస్తారో వారికి విజయం అని చెప్పారు.',
        'కుమారస్వామి తన నెమలిపై ప్రపంచ యాత్రకు బయలుదేరాడు.',
        'గణేశుడు మాత్రం తన తల్లిదండ్రుల చుట్టూ మూడు ప్రదక్షిణలు చేసి "తల్లిదండ్రులే నా ప్రపంచం" అని అన్నాడు.',
        'ఆయన జ్ఞానానికి సంతోషించిన దేవతలు గణేశుడిని విజేతగా ప్రకటించారు.',
      ],
    },

    {
      title: 'ఏకదంతుడు',
      pages: [
        'మహర్షి వ్యాసుడు మహాభారతాన్ని వ్రాయడానికి గణేశుడిని కోరాడు.',
        'వ్రాస్తుండగా కలం విరిగిపోయింది.',
        'ఆగకుండా వ్రాయాలనే సంకల్పంతో గణేశుడు తన ఒక దంతాన్ని విరిచి కలంగా ఉపయోగించాడు.',
        'ఆయన త్యాగం మరియు కర్తవ్యనిష్ఠకు ఇది గొప్ప ఉదాహరణ.',
        'అందుకే గణేశుడిని "ఏకదంతుడు" అని కూడా పిలుస్తారు.',
      ],
    },

    {
      title: 'కుబేరుని విందు',
      pages: [
        'ధనాధిపతి కుబేరుడు తన ఐశ్వర్యాన్ని చూపించడానికి గొప్ప విందు ఏర్పాటు చేశాడు.',
        'గణేశుడు ఆ విందుకు వచ్చి అందరూ సిద్ధం చేసిన అన్నింటినీ తిన్నాడు.',
        'కుబేరుడు తన గర్వం ఎంత వ్యర్థమో అర్థం చేసుకున్నాడు.',
        'తర్వాత శివుడి వద్దకు వెళ్లి క్షమాపణ కోరాడు.',
        'ఈ కథ మనకు వినయం మరియు అహంకారం లేకుండా జీవించాలనే సందేశాన్ని ఇస్తుంది.',
      ],
    },

    {
      title: 'గణేశుడు మరియు కుమారస్వామి',
      pages: [
        'ఒకసారి గణేశుడు మరియు కుమారస్వామి మధ్య జ్ఞాన పరీక్ష జరిగింది.',
        'కుమారస్వామి వేగాన్ని నమ్ముకున్నాడు.',
        'గణేశుడు జ్ఞానాన్ని నమ్ముకున్నాడు.',
        'తల్లిదండ్రులను ప్రపంచంగా భావించి వారికి ప్రదక్షిణ చేశాడు.',
        'ఈ కథ మనకు తల్లిదండ్రుల పట్ల గౌరవం ఎంత ముఖ్యమో తెలియజేస్తుంది.',
      ],
    },
  ];

  currentPage = 0;
  youtubeVideos = [
    {
      title: 'The Birth of Lord Ganesha',
      videoId: 'cJ7sQm8L9rA',
    },
    {
      title: 'Ganesha and the Moon',
      videoId: '7nSLjQF6W2Y',
    },
    {
      title: 'Race Around the World',
      videoId: '5vVYJ0R4s6A',
    },
    {
      title: 'Kubera and Ganesha',
      videoId: 'uQ6M2vQeRKo',
    },
  ];
  selectStory(index: number): void {
    this.selectedStory = index;
  }

  nextStory(): void {
    this.selectedStory++;

    if (this.selectedStory >= this.stories.length) {
      this.selectedStory = 0;
    }
  }
  getVideoUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`,
    );
  }
  previousStory(): void {
    this.selectedStory--;

    if (this.selectedStory < 0) {
      this.selectedStory = this.stories.length - 1;
    }
  }
  openStory(): void {
    this.currentPage = 0;
    this.showStoryBook = true;
  }

  closeStory(): void {
    this.showStoryBook = false;
  }

  nextPage(): void {
    if (this.currentPage < this.storyContent[this.selectedStory].pages.length - 1) {
      this.currentPage++;
    }
  }
  downloadStory(): void {
    const pdf = new jsPDF();

    pdf.setFont('helvetica');

    pdf.setFontSize(22);

    pdf.text(this.storyContent[this.selectedStory].title, 20, 25);

    pdf.setFontSize(13);

    let y = 45;

    this.storyContent[this.selectedStory].pages.forEach((page) => {
      const lines = pdf.splitTextToSize(page, 170);

      pdf.text(lines, 20, y);

      y += lines.length * 8 + 8;

      if (y > 260) {
        pdf.addPage();

        y = 20;
      }
    });

    pdf.save(`${this.storyContent[this.selectedStory].title}.pdf`);
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
