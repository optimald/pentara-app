// User and Profile Types
export interface User {
  id: string;
  activationCode: string;
  isActivated: boolean;
  subscriptionStatus: 'active' | 'expired' | 'trial';
  subscriptionExpiresAt?: Date;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface Profile {
  id: string;
  userId: string;
  personalManual: string;
  warriorName: string;
  council: CouncilMember[];
  encryptedData: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CouncilMember {
  id: string;
  name: string;
  title: string;
  specialty: string;
  description: string;
  avatar: string;
  systemPrompt: string;
  tokenCap: number;
}

// Chat and Message Types
export interface ChatThread {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  type: 'user' | 'voice' | 'synthesis';
  content: string;
  voiceId?: string;
  voiceName?: string;
  timestamp: Date;
  isJournaled: boolean;
  imageUri?: string;
  imageBase64?: string;
}

export interface VoiceResponse {
  voiceId: string;
  voiceName: string;
  content: string;
  tokenCount: number;
  timestamp: Date;
}

export interface SynthesisResponse {
  content: string;
  nextSteps: string[];
  reassurance: string;
  tokenCount: number;
  timestamp: Date;
}

// API Types
export interface ActivationRequest {
  code: string;
}

export interface ActivationResponse {
  success: boolean;
  profile?: Profile;
  error?: string;
}

export interface ChatRequest {
  message: string;
  threadId?: string;
  imageBase64?: string;
}

export interface ChatResponse {
  success: boolean;
  threadId: string;
  voiceResponses: VoiceResponse[];
  synthesis: SynthesisResponse;
  error?: string;
}

export interface UsageStats {
  totalTurns: number;
  turnsToday: number;
  turnsThisMonth: number;
  lastTurnAt?: Date;
}

// Journal Types
export interface JournalEntry {
  id: string;
  userId: string;
  threadId: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Settings Types
export interface AppSettings {
  notifications: boolean;
  dailyReminders: boolean;
  reminderTime: string;
  dataExport: boolean;
  privacyMode: boolean;
}

// Crisis Resources
export interface CrisisResource {
  id: string;
  name: string;
  phone: string;
  description: string;
  available24_7: boolean;
  category: 'crisis' | 'mental_health' | 'suicide_prevention' | 'domestic_violence';
}
