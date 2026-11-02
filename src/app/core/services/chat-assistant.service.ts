import { Injectable } from '@angular/core';
import { APP_CONFIG } from '@core/config/app.config';
import { DAILY_HARATHI } from '@core/mock-data/schedule.mock';

export interface ChatLink {
  label: string;
  route: string;
}

export interface ChatReply {
  text: string;
  link?: ChatLink;
  /** True when nothing matched, so the box can offer WhatsApp more prominently. */
  unmatched?: boolean;
}

interface ChatTopic extends ChatReply {
  /** Latin keywords also match as word prefixes ("timing" finds "timings"). */
  keywords: string[];
}

const { contact, mandapName } = APP_CONFIG;

/**
 * What the chat box can answer.
 *
 * Only confirmed details belong here, matching the rest of the site. Timings
 * and contact details are read from their single source rather than repeated.
 */
const TOPICS: ChatTopic[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'namaste', 'namaskaram', 'నమస్తే', 'నమస్కారం'],
    text: `Namaste! Ask me about ${mandapName} — timings, events, location or how to take part.`,
  },
  {
    keywords: ['laddu', 'ladoo', 'laddoo', 'velam', 'auction', 'లడ్డు', 'వేలం'],
    text: 'Laddu Velam is the traditional laddu auction at the mandap. It starts at 7:00 PM on Roshans Day.',
    link: { label: 'See the event', route: '/events' },
  },
  {
    keywords: ['harathi', 'harati', 'aarti', 'arti', 'హారతి'],
    text: `${DAILY_HARATHI.name} is performed at the mandap every evening of the festival, ${DAILY_HARATHI.time}.`,
    link: { label: 'Festival schedule', route: '/festival-schedule' },
  },
  {
    keywords: ['lucky', 'draw', 'లక్కీ'],
    text: 'The Lucky Draw is held at the mandap on the final day of the festival. Entries can be registered on WhatsApp from the Events page.',
    link: { label: 'See the event', route: '/events' },
  },
  {
    keywords: ['nimarjanam', 'immersion', 'visarjan', 'procession', 'నిమజ్జనం'],
    text: 'Nimarjanam, the farewell procession and immersion, leaves from the mandap on the final day of the festival.',
    link: { label: 'Festival schedule', route: '/festival-schedule' },
  },
  {
    keywords: ['pooja', 'puja', 'chaturthi', 'పూజ'],
    text: 'The festival opens on Ganesh Chaturthi with the First Pooja at the mandap.',
    link: { label: 'Festival schedule', route: '/festival-schedule' },
  },
  {
    keywords: ['timing', 'time', 'darshan', 'open', 'schedule', 'సమయం', 'దర్శనం'],
    text: `The mandap is open ${contact.officeHours}.`,
    link: { label: 'Festival schedule', route: '/festival-schedule' },
  },
  {
    keywords: ['where', 'address', 'location', 'direction', 'map', 'reach', 'ఎక్కడ', 'చిరునామా'],
    text: `We are at ${contact.addressLines.join(', ')}. The Contact page has a Get Directions button.`,
    link: { label: 'Contact & directions', route: '/contact' },
  },
  {
    keywords: ['contact', 'phone', 'call', 'number', 'email', 'mail', 'whatsapp', 'ఫోన్'],
    text: `Call or WhatsApp ${contact.phone}, or email ${contact.email}.`,
    link: { label: 'Contact page', route: '/contact' },
  },
  {
    keywords: ['register', 'registration', 'participate', 'enroll'],
    text: 'Open the Events page, choose a card and use the Register button. It opens WhatsApp with your details filled in, ready to send.',
    link: { label: 'Go to Events', route: '/events' },
  },
  {
    keywords: ['fee', 'free', 'entry', 'ticket', 'cost', 'price'],
    text: 'There is no entry fee. Darshan, prasad and every programme at the mandap are free and open to all.',
  },
  {
    keywords: ['volunteer', 'seva'],
    text: 'Yes, volunteers are welcome. Send us a message from the Contact page mentioning the team you would like to join.',
    link: { label: 'Contact page', route: '/contact' },
  },
  {
    keywords: ['donate', 'donation', 'sponsor', 'support', 'contribute', 'విరాళం'],
    text: 'You can volunteer your time, sponsor a programme, or contribute in kind. Send us a message and the committee will take it from there.',
    link: { label: 'Contact page', route: '/contact' },
  },
  {
    keywords: ['prasad', 'mahaprasad', 'annadanam', 'food', 'ప్రసాదం', 'అన్నదానం'],
    text: 'Prasad is distributed after each aarti. The full mahaprasad (annadanam) is served on the seva day listed in the festival schedule.',
    link: { label: 'Festival schedule', route: '/festival-schedule' },
  },
  {
    keywords: ['photo', 'picture', 'gallery', 'image', 'video', 'ఫోటో'],
    text: 'Photographs from the mandap, through the years, are in the Gallery.',
    link: { label: 'Open Gallery', route: '/gallery' },
  },
];

const FALLBACK: ChatReply = {
  text: `I don't have an answer for that yet. The committee can help on WhatsApp at ${contact.phone}.`,
  unmatched: true,
};

/**
 * Answers visitor questions by keyword, in the browser.
 *
 * Nothing typed here is sent or stored; a question only leaves the site if the
 * visitor chooses to continue on WhatsApp (see `WhatsAppService`).
 */
@Injectable({ providedIn: 'root' })
export class ChatAssistantService {
  readonly suggestions = ['Laddu Velam', 'Ganga Harathi', 'Timings', 'Location', 'Contact'];

  reply(question: string): ChatReply {
    const words = question.toLowerCase().split(/[^\p{L}\p{M}\p{N}]+/u).filter(Boolean);

    let best: ChatTopic | null = null;
    let bestScore = 0;
    for (const topic of TOPICS) {
      const score = topic.keywords.filter((keyword) =>
        words.some((word) => matches(word, keyword)),
      ).length;
      if (score > bestScore) {
        best = topic;
        bestScore = score;
      }
    }

    if (!best) {
      return FALLBACK;
    }
    const { text, link } = best;
    return { text, link };
  }
}

/** Short keywords must match exactly, so "hi" does not fire on "history". */
function matches(word: string, keyword: string): boolean {
  return keyword.length >= 4 ? word.startsWith(keyword) : word === keyword;
}
