// ============================================================
// KIDS MODULE - COMMON MODELS
// ============================================================

// ============================================================
// CONTENT
// Bhajans / Mantras / Morning Prayers / Rhymes / Stories
// ============================================================

export interface KidsContent {
  id: number;

  contentType: string;

  title: string;

  shortDescription?: string | null;

  description?: string | null;

  singer?: string | null;

  thumbnailPath?: string | null;

  mediaPath?: string | null;

  videoUrl?: string | null;

  ageGroup?: string | null;

  duration?: string | null;

  displayOrder: number;

  isFeatured: boolean;

  isActive: boolean;

  createdBy?: number | null;

  createdDate?: string | null;

  modifiedBy?: number | null;

  modifiedDate?: string | null;
}

export interface SaveKidsContentRequest {
  id: number;

  contentType: string;

  title: string;

  shortDescription?: string | null;

  description?: string | null;

  singer?: string | null;

  thumbnailPath?: string | null;

  mediaPath?: string | null;

  videoUrl?: string | null;

  ageGroup?: string | null;

  duration?: string | null;

  displayOrder: number;

  isFeatured: boolean;

  isActive: boolean;

  userId?: number | null;
}

export interface SaveKidsContentResponse {
  id: number;

  message: string;
}

// ============================================================
// STORY
// ============================================================

export interface KidsContentDetails {
  content: KidsContent;

  pages: KidsStoryPage[];
}

export interface KidsStoryPage {
  id: number;

  contentId: number;

  pageNumber: number;

  pageTitle?: string | null;

  pageContent: string;

  imagePath?: string | null;

  displayOrder: number;

  isActive: boolean;

  createdBy?: number | null;

  createdDate?: string | null;

  modifiedBy?: number | null;

  modifiedDate?: string | null;
}

export interface SaveKidsStoryPageRequest {
  id: number;

  contentId: number;

  pageNumber: number;

  pageTitle?: string | null;

  pageContent: string;

  imagePath?: string | null;

  displayOrder: number;

  isActive: boolean;

  userId?: number | null;
}

// ============================================================
// GAMES
// ============================================================

export interface KidsGame {
  id: number;

  gameType: string;

  title: string;

  description?: string | null;

  difficulty?: string | null;

  thumbnailPath?: string | null;

  instructions?: string | null;

  configurationJson?: string | null;

  timeLimitSeconds?: number | null;

  starsAvailable: number;

  displayOrder: number;

  isFeatured: boolean;

  isActive: boolean;

  createdBy?: number | null;

  createdDate?: string | null;

  modifiedBy?: number | null;

  modifiedDate?: string | null;
}

export interface SaveKidsGameRequest {
  id: number;

  gameType: string;

  title: string;

  description?: string | null;

  difficulty?: string | null;

  thumbnailPath?: string | null;

  instructions?: string | null;

  configurationJson?: string | null;

  timeLimitSeconds?: number | null;

  starsAvailable: number;

  displayOrder: number;

  isFeatured: boolean;

  isActive: boolean;

  userId?: number | null;
}

export interface KidsGameDetails {
  game: KidsGame;

  items: KidsGameItem[];
}

// ============================================================
// GAME ITEM
// ============================================================

export interface KidsGameItem {
  id: number;

  gameId: number;

  itemType?: string | null;

  title?: string | null;

  description?: string | null;

  imagePath?: string | null;

  secondaryImagePath?: string | null;

  answer?: string | null;

  hint?: string | null;

  itemValue?: string | null;

  displayOrder: number;

  isActive: boolean;

  createdBy?: number | null;

  createdDate?: string | null;

  modifiedBy?: number | null;

  modifiedDate?: string | null;
}

export interface SaveKidsGameItemRequest {
  id: number;

  gameId: number;

  itemType?: string | null;

  title?: string | null;

  description?: string | null;

  imagePath?: string | null;

  secondaryImagePath?: string | null;

  answer?: string | null;

  hint?: string | null;

  itemValue?: string | null;

  displayOrder: number;

  isActive: boolean;

  userId?: number | null;
}

// ============================================================
// QUIZ
// ============================================================

export interface KidsQuiz {
  id: number;

  title: string;

  description?: string | null;

  level?: string | null;

  thumbnailPath?: string | null;

  timeLimitSeconds?: number | null;

  passingPercentage: number;

  certificatePercentage: number;

  displayOrder: number;

  isActive: boolean;

  createdBy?: number | null;

  createdDate?: string | null;

  modifiedBy?: number | null;

  modifiedDate?: string | null;
}

export interface SaveKidsQuizRequest {
  id: number;

  title: string;

  description?: string | null;

  level?: string | null;

  thumbnailPath?: string | null;

  timeLimitSeconds?: number | null;

  passingPercentage: number;

  certificatePercentage: number;

  displayOrder: number;

  isActive: boolean;

  userId?: number | null;
}

// ============================================================
// QUIZ QUESTION
// ============================================================

export interface KidsQuizQuestion {
  id: number;

  quizId: number;

  question: string;

  imagePath?: string | null;

  explanation?: string | null;

  points: number;

  displayOrder: number;

  isActive: boolean;

  options: KidsQuizOption[];
}

export interface SaveKidsQuizQuestionRequest {
  id: number;

  quizId: number;

  question: string;

  imagePath?: string | null;

  explanation?: string | null;

  points: number;

  displayOrder: number;

  isActive: boolean;

  userId?: number | null;
}

// ============================================================
// QUIZ OPTION
// ============================================================

export interface KidsQuizOption {
  id: number;

  questionId: number;

  optionText?: string | null;

  imagePath?: string | null;

  isCorrect: boolean;

  displayOrder: number;

  isActive: boolean;
}

export interface SaveKidsQuizOptionRequest {
  id: number;

  questionId: number;

  optionText?: string | null;

  imagePath?: string | null;

  isCorrect: boolean;

  displayOrder: number;

  isActive: boolean;

  userId?: number | null;
}

// ============================================================
// QUIZ DETAILS
// ============================================================

export interface KidsQuizDetails {
  quiz: KidsQuiz;

  questions: KidsQuizQuestion[];
}

// ============================================================
// PUBLIC QUIZ PLAY
// ============================================================

export interface KidsQuizPlay {
  id: number;

  title: string;

  description?: string | null;

  level?: string | null;

  thumbnailPath?: string | null;

  timeLimitSeconds?: number | null;

  passingPercentage: number;

  certificatePercentage: number;

  questions: KidsQuizPlayQuestion[];
}

export interface KidsQuizPlayQuestion {
  id: number;

  question: string;

  imagePath?: string | null;

  points: number;

  options: KidsQuizPlayOption[];
}

export interface KidsQuizPlayOption {
  id: number;

  optionText?: string | null;

  imagePath?: string | null;
}

// ============================================================
// CHECK QUIZ ANSWER
// ============================================================

export interface CheckKidsQuizAnswerRequest {
  quizId: number;

  questionId: number;

  optionId: number;
}

export interface KidsQuizAnswer {
  questionId: number;

  selectedOptionId: number;

  isCorrect: boolean;

  correctOptionId?: number | null;

  explanation?: string | null;

  pointsEarned: number;
}

// ============================================================
// CERTIFICATE
// ============================================================

export interface KidsCertificate {
  id: number;

  certificateNumber: string;

  participantName: string;

  activityType: string;

  activityId?: number | null;

  activityTitle?: string | null;

  score?: number | null;

  percentage?: number | null;

  stars?: number | null;

  certificateTitle?: string | null;

  issuedDate?: string | null;

  isActive: boolean;

  createdDate?: string | null;
}

export interface SaveKidsCertificateRequest {
  participantName: string;

  activityType: string;

  activityId?: number | null;

  activityTitle?: string | null;

  score?: number | null;

  percentage?: number | null;

  stars?: number | null;

  certificateTitle?: string | null;
}

// ============================================================
// ACTIVITY PROGRESS
// ============================================================

export interface KidsActivityProgress {
  id: number;

  sessionId: string;

  participantName?: string | null;

  activityType: string;

  activityId?: number | null;

  score?: number | null;

  percentage?: number | null;

  stars?: number | null;

  attempts: number;

  isCompleted: boolean;

  startedDate?: string | null;

  completedDate?: string | null;

  modifiedDate?: string | null;
}

export interface SaveKidsProgressRequest {
  sessionId: string;

  participantName?: string | null;

  activityType: string;

  activityId?: number | null;

  score?: number | null;

  percentage?: number | null;

  stars?: number | null;

  isCompleted: boolean;
}

// ============================================================
// COMPETITION
// ============================================================

export interface KidsCompetition {
  id: number;

  title: string;

  description?: string | null;

  year: number;

  registrationStartDate?: string | null;

  registrationEndDate?: string | null;

  competitionDate?: string | null;

  venue?: string | null;

  rules?: string | null;

  thumbnailPath?: string | null;

  maxParticipants?: number | null;

  displayOrder: number;

  isRegistrationOpen: boolean;

  isActive: boolean;

  createdBy?: number | null;

  createdDate?: string | null;

  modifiedBy?: number | null;

  modifiedDate?: string | null;
}

export interface SaveKidsCompetitionRequest {
  id: number;

  title: string;

  description?: string | null;

  year: number;

  registrationStartDate?: string | null;

  registrationEndDate?: string | null;

  competitionDate?: string | null;

  venue?: string | null;

  rules?: string | null;

  thumbnailPath?: string | null;

  maxParticipants?: number | null;

  displayOrder: number;

  isRegistrationOpen: boolean;

  isActive: boolean;

  userId?: number | null;
}

// ============================================================
// COMPETITION DETAILS
// ============================================================

export interface KidsCompetitionDetails {
  competition: KidsCompetition;

  categories: KidsCompetitionCategory[];
}

// ============================================================
// COMPETITION CATEGORY
// ============================================================

export interface KidsCompetitionCategory {
  id: number;

  competitionId: number;

  categoryName: string;

  ageFrom?: number | null;

  ageTo?: number | null;

  description?: string | null;

  displayOrder: number;

  isActive: boolean;

  createdBy?: number | null;

  createdDate?: string | null;

  modifiedBy?: number | null;

  modifiedDate?: string | null;
}

export interface SaveKidsCompetitionCategoryRequest {
  id: number;

  competitionId: number;

  categoryName: string;

  ageFrom?: number | null;

  ageTo?: number | null;

  description?: string | null;

  displayOrder: number;

  isActive: boolean;

  userId?: number | null;
}

// ============================================================
// COMPETITION REGISTRATION
// ============================================================

export interface KidsCompetitionRegistration {
  id: number;

  competitionId: number;

  categoryId?: number | null;

  registrationNumber: string;

  participantName: string;

  age?: number | null;

  dateOfBirth?: string | null;

  gender?: string | null;

  parentName?: string | null;

  mobile?: string | null;

  email?: string | null;

  address?: string | null;

  schoolName?: string | null;

  photoPath?: string | null;

  registrationStatus: string;

  adminNotes?: string | null;

  isActive: boolean;

  createdDate?: string | null;

  modifiedBy?: number | null;

  modifiedDate?: string | null;

  competitionTitle?: string | null;

  categoryName?: string | null;
}

export interface RegisterKidsCompetitionRequest {
  competitionId: number;

  categoryId?: number | null;

  participantName: string;

  age?: number | null;

  dateOfBirth?: string | null;

  gender?: string | null;

  parentName?: string | null;

  mobile?: string | null;

  email?: string | null;

  address?: string | null;

  schoolName?: string | null;

  photoPath?: string | null;
}

// ============================================================
// REGISTRATION STATUS
// ============================================================

export interface UpdateKidsRegistrationStatusRequest {
  registrationId: number;

  status: string;

  adminNotes?: string | null;

  userId?: number | null;
}

// ============================================================
// COMPETITION RESULT
// ============================================================

export interface KidsCompetitionParticipant {
  id: number;

  registrationId: number;

  participantNumber?: string | null;

  score?: number | null;

  position?: number | null;

  resultStatus?: string | null;

  remarks?: string | null;

  isWinner: boolean;

  participantName?: string | null;

  age?: number | null;

  photoPath?: string | null;

  competitionId?: number | null;

  competitionTitle?: string | null;

  categoryId?: number | null;

  categoryName?: string | null;

  createdBy?: number | null;

  createdDate?: string | null;

  modifiedBy?: number | null;

  modifiedDate?: string | null;
}
export interface Quiz {
  id: number;
  title: string;
  description?: string | null;
  level?: string | null;
  thumbnailPath?: string | null;
  timeLimitSeconds: number;
  passingPercentage: number;
  certificatePercentage: number;
  displayOrder: number;
  isActive: boolean;
}

export interface QuizOption {
  id: number;
  questionId: number;
  optionText: string;
  imagePath?: string | null;
  isCorrect: boolean;
  displayOrder: number;
  isActive: boolean;
}

export interface QuizQuestion {
  id: number;
  quizId: number;
  question: string;
  imagePath?: string | null;
  explanation?: string | null;
  points: number;
  displayOrder: number;
  isActive: boolean;
  options: QuizOption[];
}

export interface QuizDetails {
  quiz: Quiz;
  questions: QuizQuestion[];
}

export interface SaveQuizQuestionRequest {
  id: number;
  quizId: number;
  question: string;
  imagePath?: string | null;
  explanation?: string | null;
  points: number;
  displayOrder: number;
  isActive: boolean;
  userId: number;
}

export interface SaveQuizOptionRequest {
  id: number;
  questionId: number;
  optionText: string;
  imagePath?: string | null;
  isCorrect: boolean;
  displayOrder: number;
  isActive: boolean;
  userId: number;
}
export interface Competition {
  id: number;
  title: string;
  description?: string | null;
  year: number;
  thumbnailPath?: string | null;
  registrationStartDate?: string | null;
  registrationEndDate?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  maxParticipants?: number | null;
  displayOrder: number;
  isActive: boolean;
  isRegistrationOpen: boolean;
  createdBy?: number | null;
  createdDate?: string | null;
  modifiedBy?: number | null;
  modifiedDate?: string | null;
}
export interface SaveKidsCompetitionResultRequest {
  id: number;

  registrationId: number;

  participantNumber?: string | null;

  score?: number | null;

  position?: number | null;

  resultStatus?: string | null;

  remarks?: string | null;

  isWinner: boolean;

  userId?: number | null;
}

// ============================================================
// COMMON API RESPONSE
// ============================================================

export interface KidsSaveResponse {
  id: number;

  message: string;
}
export interface Game {
  id: number;
  title: string;
  description?: string | null;
  gameType?: string | null;
  difficulty?: string | null;
  thumbnailPath?: string | null;
  displayOrder?: number;
  isActive: boolean;
  createdBy?: number | null;
  createdDate?: string | null;
  modifiedBy?: number | null;
  modifiedDate?: string | null;
}
export interface KidsDeleteResponse {
  success: boolean;

  message: string;
}
