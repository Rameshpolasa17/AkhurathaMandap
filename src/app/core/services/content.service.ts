import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Faq, FestivalStat, Highlight, Milestone } from '@core/models/content';
import {
  MOCK_FAQS,
  MOCK_HIGHLIGHTS,
  MOCK_MILESTONES,
  MOCK_STATS,
} from '@core/mock-data/content.mock';
import { mockResponse } from '@core/mock-data/mock-utils';
import { Aarti } from '@core/models/aarti';
import { MOCK_AARTIS } from '@core/mock-data/aarti.mock';

/**
 * Editorial content: highlights, history milestones, stats and FAQs.
 * API-READY: replace each body with the matching HttpClient call.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  getHighlights(): Observable<Highlight[]> {
    return mockResponse(MOCK_HIGHLIGHTS);
  }

  getMilestones(): Observable<Milestone[]> {
    return mockResponse(MOCK_MILESTONES);
  }

  getStats(): Observable<FestivalStat[]> {
    return mockResponse(MOCK_STATS);
  }

  getFaqs(): Observable<Faq[]> {
    return mockResponse(MOCK_FAQS);
  }

  /** Aartis, shlokas and mantras for the Aarti page. */
  getAartis(): Observable<Aarti[]> {
    return mockResponse(MOCK_AARTIS, 0);
  }

  getFaqCategories(): Observable<string[]> {
    return this.getFaqs().pipe(map((list) => [...new Set(list.map((f) => f.category))]));
  }
}
