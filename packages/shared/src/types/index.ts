// Core types for Pentara app

export interface PersonalManual {
  userId: string;
  values: string[];
  drivers: string[];
  strengths: string[];
  resets: string[];
  beliefs: {
    old: string;
    new: string;
  }[];
  boundaries: string[];
  preferredTone: string[];
  createdAt: string;
}

export interface Voice {
  id: string;
  name: string;
  archetype: string;
  inspiredBy: string[];
  domainFocus: string;
  tone: string;
  dosDonts: {
    dos: string[];
    donts: string[];
  };
  tokenCap: number;
  styleRules: string[];
  sampleLines: string[];
}

export interface FiveVoiceProfile {
  userId: string;
  voices: [Voice, Voice, Voice, Voice, Voice]; // Exactly 5 voices
  manual: PersonalManual;
  welcomeMessage: string;
  version: number;
  createdAt: string;
  createdBy: string; // Coach ID
}

export interface ActivationCode {
  code: string;
  userEmail: string;
  createdBy: string;
  expiresAt: string;
  redeemedAt?: string;
  isRedeemed: boolean;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  prompt: string;
  responses: VoiceResponse[];
  synthesis: Synthesis;
  timestamp: string;
  mode: 'ask_now' | 'daily_checkin' | 'decision_frame';
}

export interface VoiceResponse {
  voiceId: string;
  voiceName: string;
  response: string;
  tokenCount: number;
}

export interface Synthesis {
  nextSteps: string[]; // Exactly 3 steps
  reassurance: string;
  tokenCount: number;
}

export interface ChatThread {
  id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  activationCode?: string;
  isActivated: boolean;
  createdAt: string;
}

export interface UsageCounter {
  userId: string;
  date: string; // YYYY-MM-DD
  turns: number;
}

// API Request/Response types
export interface ActivateRequest {
  activationCode: string;
  deviceId: string;
}

export interface ActivateResponse {
  success: boolean;
  profile?: FiveVoiceProfile;
  token?: string;
  error?: string;
}

export interface ChatRequest {
  userId: string;
  threadId?: string;
  prompt: string;
  mode: 'ask_now' | 'daily_checkin' | 'decision_frame';
}

export interface ChatResponse {
  success: boolean;
  message?: ChatMessage;
  error?: string;
}

export interface SwapRequest {
  userId: string;
  reason: string;
}

// Onboarding types
export interface OnboardingAnswers {
  coreIdentity: {
    selfDescription: string;
    strengths: string;
    weaknesses: string;
  };
  driversValues: {
    topDrivers: string[];
    relationshipValues: string;
  };
  environmentalNeeds: {
    thriveEnvironment: string;
    avoidEnvironment: string;
  };
  positiveTraits: {
    admiredFor: string;
    superpower: string;
  };
  negativeTraits: {
    breakdownPattern: string;
    stressHabits: string;
    preferredResponse: string;
  };
  resetProtocol: {
    resetActions: string[];
    momentumReminder: string;
  };
  inspirations: {
    figures: string[];
    qualities: string[];
    desiredArchetypes: string[];
  };
  relationshipDynamics: {
    trustLosers: string;
    supportBehaviors: string;
  };
  beliefShifts: {
    oldBelief: string;
    newBelief: string;
    mantras: string[];
  };
  finalInstructions: {
    powerConditions: string;
    futureSelftalk: string;
  };
}
