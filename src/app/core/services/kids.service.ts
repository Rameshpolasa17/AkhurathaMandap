import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  KidsContent,
  SaveKidsContentRequest,
  SaveKidsContentResponse,
  Quiz,
  QuizQuestion,
  QuizDetails,
  SaveQuizQuestionRequest,
  SaveQuizOptionRequest,
  Competition,
  Game,
} from '@core/models/kids.model';
import {
  MOCK_KIDS_CONTENT,
  MOCK_KIDS_QUIZZES,
  MOCK_KIDS_QUIZ_QUESTIONS,
  MOCK_KIDS_COMPETITIONS,
  MOCK_KIDS_GAMES,
} from '@core/mock-data/kids.mock';
import { mockResponse, nextId } from '@core/mock-data/mock-utils';

/**
 * Frontend-only Kids Zone data store (in-memory, resets on reload).
 *
 * Only the admin Kids screens consume this service. Every method keeps the exact
 * signature of the original API service, so each body can later be swapped back
 * to the matching `this.http.*` call without touching any component.
 */
@Injectable({ providedIn: 'root' })
export class KidsService {
  private content: KidsContent[] = MOCK_KIDS_CONTENT.map((c) => ({ ...c }));
  private quizzes: Quiz[] = MOCK_KIDS_QUIZZES.map((q) => ({ ...q }));
  private questions: QuizQuestion[] = MOCK_KIDS_QUIZ_QUESTIONS.map((q) => ({ ...q }));
  private competitions: Competition[] = MOCK_KIDS_COMPETITIONS.map((c) => ({ ...c }));
  private games: Game[] = MOCK_KIDS_GAMES.map((g) => ({ ...g }));

  // ===== CONTENT =====
  getContents(contentType?: string, isActive?: boolean): Observable<KidsContent[]> {
    let list = this.content;
    if (contentType) list = list.filter((c) => c.contentType === contentType);
    if (isActive !== undefined) list = list.filter((c) => c.isActive === isActive);
    return mockResponse(list);
  }

  getContentById(id: number): Observable<any> {
    return mockResponse(this.content.find((c) => c.id === id));
  }

  saveContent(request: SaveKidsContentRequest): Observable<SaveKidsContentResponse> {
    let id = request.id;
    if (id) {
      const idx = this.content.findIndex((c) => c.id === id);
      if (idx > -1) this.content[idx] = { ...this.content[idx], ...request } as KidsContent;
    } else {
      id = nextId(this.content, 'id');
      this.content.push({ ...(request as unknown as KidsContent), id });
    }
    return mockResponse({ id, message: 'Content saved successfully.' });
  }

  deleteContent(id: number, _userId?: number): Observable<any> {
    this.content = this.content.filter((c) => c.id !== id);
    return mockResponse({ success: true, message: 'Content deleted successfully.' });
  }

  getBhajans(isActive?: boolean): Observable<KidsContent[]> {
    return this.getContents('Bhajan', isActive);
  }
  getMantras(isActive?: boolean): Observable<KidsContent[]> {
    return this.getContents('Mantra', isActive);
  }
  getMorningPrayers(isActive?: boolean): Observable<KidsContent[]> {
    return this.getContents('MorningPrayer', isActive);
  }
  getRhymes(isActive?: boolean): Observable<KidsContent[]> {
    return this.getContents('Rhyme', isActive);
  }
  getBhajanVideos(isActive?: boolean): Observable<KidsContent[]> {
    return this.getContents('BhajanVideo', isActive);
  }
  getStories(isActive?: boolean): Observable<KidsContent[]> {
    return this.getContents('Story', isActive);
  }

  // ===== QUIZ =====
  getQuizzes(level?: string, isActive?: boolean): Observable<Quiz[]> {
    let list = this.quizzes;
    if (level) list = list.filter((q) => q.level === level);
    if (isActive !== undefined) list = list.filter((q) => q.isActive === isActive);
    return mockResponse(list);
  }

  getQuizById(id: number): Observable<QuizDetails> {
    const quiz = this.quizzes.find((q) => q.id === id) ?? this.quizzes[0];
    return mockResponse({
      quiz,
      questions: this.questions.filter((q) => q.quizId === id),
    });
  }

  saveQuiz(request: Partial<Quiz> & { id?: number }): Observable<any> {
    let id = request.id ?? 0;
    if (id) {
      const idx = this.quizzes.findIndex((q) => q.id === id);
      if (idx > -1) this.quizzes[idx] = { ...this.quizzes[idx], ...request } as Quiz;
    } else {
      id = nextId(this.quizzes, 'id');
      this.quizzes.push({ ...(request as Quiz), id });
    }
    return mockResponse({ id, message: 'Quiz saved successfully.' });
  }

  deleteQuiz(id: number, _userId?: number): Observable<any> {
    this.quizzes = this.quizzes.filter((q) => q.id !== id);
    return mockResponse({ success: true, message: 'Quiz deleted successfully.' });
  }

  getQuizQuestions(quizId: number): Observable<QuizQuestion[]> {
    return this.getQuizById(quizId).pipe(map((d) => d.questions ?? []));
  }

  saveQuizQuestion(
    request: SaveQuizQuestionRequest,
  ): Observable<any> {
    let id = request.id;
    if (id) {
      const idx = this.questions.findIndex((q) => q.id === id);
      if (idx > -1) this.questions[idx] = { ...this.questions[idx], ...request };
    } else {
      id = nextId(this.questions, 'id');
      this.questions.push({ ...(request as unknown as QuizQuestion), id, options: [] });
    }
    return mockResponse({ id, message: 'Question saved successfully.' });
  }

  deleteQuizQuestion(id: number, _userId?: number): Observable<any> {
    this.questions = this.questions.filter((q) => q.id !== id);
    return mockResponse({ success: true, message: 'Question deleted successfully.' });
  }

  saveQuizOption(request: SaveQuizOptionRequest): Observable<any> {
    const q = this.questions.find((x) => x.id === request.questionId);
    let id = request.id;
    if (q) {
      if (id) {
        const idx = q.options.findIndex((o) => o.id === id);
        if (idx > -1) q.options[idx] = { ...q.options[idx], ...request };
      } else {
        id = q.options.reduce((m, o) => Math.max(m, o.id), 0) + 1;
        q.options.push({ ...request, id, isActive: true });
      }
    }
    return mockResponse({ id: id ?? 0, message: 'Option saved successfully.' });
  }

  deleteQuizOption(id: number, _userId?: number): Observable<any> {
    this.questions.forEach((q) => (q.options = q.options.filter((o) => o.id !== id)));
    return mockResponse({ success: true, message: 'Option deleted successfully.' });
  }

  getQuizForPlay(quizId: number): Observable<QuizDetails> {
    return this.getQuizById(quizId);
  }

  checkQuizAnswer(request: {
    questionId: number;
    optionId: number;
  }): Observable<{ isCorrect: boolean; correctOptionId: number | null; explanation: string | null }> {
    const q = this.questions.find((x) => x.id === request.questionId);
    const correct = q?.options.find((o) => o.isCorrect);
    return mockResponse({
      isCorrect: !!correct && correct.id === request.optionId,
      correctOptionId: correct?.id ?? null,
      explanation: q?.explanation ?? null,
    });
  }

  // ===== CERTIFICATE / PROGRESS =====
  saveCertificate(request: {
    participantName?: string;
    certificateTitle?: string;
  }): Observable<any> {
    const n = Math.floor(100000 + Math.random() * 900000);
    return mockResponse({
      id: n,
      certificateNumber: `AKM-CERT-${n}`,
      message: 'Certificate generated (local).',
    });
  }

  getCertificate(certificateNumber: string): Observable<any> {
    return mockResponse({ certificateNumber });
  }

  getCertificates(): Observable<any[]> {
    return mockResponse([]);
  }

  deleteCertificate(_id: number): Observable<any> {
    return mockResponse({ success: true, message: 'Certificate deleted.' });
  }

  saveProgress(_request: unknown): Observable<any> {
    return mockResponse({ success: true });
  }

  // ===== COMPETITIONS =====
  getCompetitions(
    year?: number,
    isActive?: boolean,
    isRegistrationOpen?: boolean,
  ): Observable<Competition[]> {
    let list = this.competitions;
    if (year !== undefined && year !== null) list = list.filter((c) => c.year === year);
    if (isActive !== undefined) list = list.filter((c) => c.isActive === isActive);
    if (isRegistrationOpen !== undefined) {
      list = list.filter((c) => c.isRegistrationOpen === isRegistrationOpen);
    }
    return mockResponse(list);
  }

  getCompetitionById(id: number): Observable<any> {
    return mockResponse(this.competitions.find((c) => c.id === id));
  }

  saveCompetition(
    request: Partial<Competition> & { id?: number },
  ): Observable<any> {
    let id = request.id ?? 0;
    if (id) {
      const idx = this.competitions.findIndex((c) => c.id === id);
      if (idx > -1) this.competitions[idx] = { ...this.competitions[idx], ...request } as Competition;
    } else {
      id = nextId(this.competitions, 'id');
      this.competitions.push({ ...(request as Competition), id });
    }
    return mockResponse({ id, message: 'Competition saved successfully.' });
  }

  deleteCompetition(id: number, _userId?: number): Observable<any> {
    this.competitions = this.competitions.filter((c) => c.id !== id);
    return mockResponse({ success: true, message: 'Competition deleted successfully.' });
  }

  getCompetitionCategories(_competitionId: number): Observable<any[]> {
    return mockResponse([]);
  }
  saveCompetitionCategory(_request: unknown): Observable<any> {
    return mockResponse({ id: 0, message: 'Category saved successfully.' });
  }
  deleteCompetitionCategory(
    _id: number,
    _userId?: number,
  ): Observable<any> {
    return mockResponse({ success: true, message: 'Category deleted successfully.' });
  }
  getCompetitionResults(_competitionId: number, _categoryId?: number): Observable<any[]> {
    return mockResponse([]);
  }
  deleteCompetitionResult(
    _id: number,
    _userId?: number,
  ): Observable<any> {
    return mockResponse({ success: true, message: 'Result deleted successfully.' });
  }
  getCompetitionRegistrations(
    _competitionId?: number,
    _categoryId?: number,
    _status?: string,
  ): Observable<any[]> {
    return mockResponse([]);
  }
  updateCompetitionRegistrationStatus(_request: unknown): Observable<any> {
    return mockResponse({ success: true });
  }

  // ===== GAMES =====
  getGames(gameType?: string, difficulty?: string, isActive?: boolean): Observable<Game[]> {
    let list = this.games;
    if (gameType) list = list.filter((g) => g.gameType === gameType);
    if (difficulty) list = list.filter((g) => g.difficulty === difficulty);
    if (isActive !== undefined) list = list.filter((g) => g.isActive === isActive);
    return mockResponse(list);
  }
  getGameById(id: number): Observable<any> {
    return mockResponse(this.games.find((g) => g.id === id));
  }
  saveGame(request: Partial<Game> & { id?: number }): Observable<any> {
    let id = request.id ?? 0;
    if (id) {
      const idx = this.games.findIndex((g) => g.id === id);
      if (idx > -1) this.games[idx] = { ...this.games[idx], ...request } as Game;
    } else {
      id = nextId(this.games, 'id');
      this.games.push({ ...(request as Game), id });
    }
    return mockResponse({ id, message: 'Game saved successfully.' });
  }
  deleteGame(id: number, _userId?: number): Observable<any> {
    this.games = this.games.filter((g) => g.id !== id);
    return mockResponse({ success: true, message: 'Game deleted successfully.' });
  }
  getGameItems(_gameId: number): Observable<any[]> {
    return mockResponse([]);
  }
  saveGameItem(_request: unknown): Observable<any> {
    return mockResponse({ id: 0, message: 'Game item saved successfully.' });
  }
  deleteGameItem(
    _id: number,
    _userId?: number,
  ): Observable<any> {
    return mockResponse({ success: true, message: 'Game item deleted successfully.' });
  }
}
