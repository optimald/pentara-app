// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  COACH = 'COACH'
}

// Voice Configuration Types
export interface Voice {
  id: string;
  name: string;
  description: string;
  personality: string;
  expertise: string[];
  tone: VoiceTone;
  inspirationSource?: string;
  systemPrompt: string;
}

export enum VoiceTone {
  WISE = 'wise',
  SUPPORTIVE = 'supportive', 
  CHALLENGING = 'challenging',
  ANALYTICAL = 'analytical',
  CREATIVE = 'creative'
}

// Personal Manual Types
export interface PersonalManual {
  id: string;
  userId: string;
  sections: PersonalManualSection[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface PersonalManualSection {
  id: string;
  title: string;
  content: string;
  order: number;
  category: ManualCategory;
}

export enum ManualCategory {
  VALUES = 'values',
  GOALS = 'goals',
  STRENGTHS = 'strengths',
  CHALLENGES = 'challenges',
  PREFERENCES = 'preferences',
  BACKGROUND = 'background'
}

// Five Voice Profile Types
export interface FiveVoiceProfile {
  id: string;
  userId: string;
  userEmail: string;
  personalManual: PersonalManual;
  voices: Voice[];
  welcomeMessage: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Chat and Conversation Types
export interface ChatMessage {
  id: string;
  content: string;
  role: MessageRole;
  voiceId?: string;
  timestamp: Date;
  metadata?: MessageMetadata;
}

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system'
}

export interface MessageMetadata {
  tokenCount?: number;
  processingTime?: number;
  confidence?: number;
  citations?: string[];
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// API Request/Response Types
export interface ChatRequest {
  message: string;
  sessionId?: string;
  context?: ChatContext;
}

export interface ChatContext {
  recentMessages?: ChatMessage[];
  userPreferences?: UserPreferences;
  situationContext?: string;
}

export interface ChatResponse {
  responses: VoiceResponse[];
  synthesis: string;
  sessionId: string;
  usage: UsageStats;
}

export interface VoiceResponse {
  voiceId: string;
  voiceName: string;
  response: string;
  confidence: number;
  tokenCount: number;
}

export interface UsageStats {
  totalTokens: number;
  voiceTokens: { [voiceId: string]: number };
  processingTime: number;
  timestamp: Date;
}

// User Preferences and Settings
export interface UserPreferences {
  preferredVoices?: string[];
  communicationStyle?: CommunicationStyle;
  sessionLength?: SessionLength;
  privacySettings?: PrivacySettings;
}

export enum CommunicationStyle {
  DIRECT = 'direct',
  GENTLE = 'gentle',
  DETAILED = 'detailed',
  CONCISE = 'concise'
}

export enum SessionLength {
  SHORT = 'short',    // 5-10 minutes
  MEDIUM = 'medium',  // 15-20 minutes  
  LONG = 'long'       // 30+ minutes
}

export interface PrivacySettings {
  storeConversations: boolean;
  shareAnonymousUsage: boolean;
  allowAnalytics: boolean;
}

// Activation and Onboarding Types
export interface ActivationCode {
  id: string;
  code: string;
  userEmail: string;
  profileId: string;
  createdBy: string;
  expiresAt: Date;
  redeemedAt?: Date;
  isRedeemed: boolean;
  createdAt: Date;
}

export interface OnboardingAnswers {
  coreIdentity?: {
    selfDescription?: string;
    strengths?: string;
  };
  driversValues?: {
    topDrivers?: string[];
    relationshipValues?: string;
  };
  positiveTraits?: {
    admiredFor?: string;
    superpower?: string;
  };
  negativeTraits?: {
    preferredResponse?: string;
  };
  resetProtocol?: {
    resetActions?: string[];
  };
  beliefShifts?: {
    oldBelief?: string;
    newBelief?: string;
  };
  environmentalNeeds?: {
    avoidEnvironment?: string;
  };
  relationshipDynamics?: {
    trustLosers?: string;
  };
  inspirations?: {
    figures?: string[];
    qualities?: string[];
    desiredArchetypes?: string[] | string;
  };
}

export interface OnboardingSession {
  id: string;
  userEmail: string;
  coachId: string;
  scheduledAt: Date;
  completedAt?: Date;
  status: OnboardingStatus;
  notes?: string;
  profileId?: string;
}

export enum OnboardingStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress', 
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

// Usage Tracking Types
export interface UsageCounter {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD format
  turns: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyUsageLimit {
  maxTurns: number;
  resetTime: string; // HH:MM format
  timezone: string;
}

// Error and Response Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: {
    timestamp: Date;
    requestId: string;
    version: string;
  };
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
