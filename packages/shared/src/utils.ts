import { ChatMessage, Voice, FiveVoiceProfile } from './types';

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidActivationCode(code: string): boolean {
  // 8-character alphanumeric code
  const codeRegex = /^[A-Z0-9]{8}$/;
  return codeRegex.test(code);
}

// Date utilities
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

export function isExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

// Token counting utilities
export function estimateTokenCount(text: string): number {
  // Rough estimation: ~4 characters per token for English text
  return Math.ceil(text.length / 4);
}

export function getTotalTokenCount(messages: ChatMessage[]): number {
  return messages.reduce((total, msg) => total + estimateTokenCount(msg.content), 0);
}

// Voice utilities
export function getVoiceById(profile: FiveVoiceProfile, voiceId: string): Voice | undefined {
  return profile.voices.find(voice => voice.id === voiceId);
}

export function getVoiceByName(profile: FiveVoiceProfile, voiceName: string): Voice | undefined {
  return profile.voices.find(voice => voice.name.toLowerCase() === voiceName.toLowerCase());
}

// Activation code generation
export function generateActivationCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Privacy utilities
export function sanitizeUserData<T extends Record<string, any>>(
  data: T,
  sensitiveFields: (keyof T)[]
): Omit<T, keyof T> {
  const sanitized = { ...data };
  sensitiveFields.forEach(field => {
    delete sanitized[field];
  });
  return sanitized;
}

// Rate limiting utilities
export function isWithinDailyLimit(currentUsage: number, dailyLimit: number): boolean {
  return currentUsage < dailyLimit;
}

export function getResetTimeUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
}

// Content validation
export function isContentAppropriate(content: string): boolean {
  // Basic content filtering - in production, use more sophisticated filtering
  const inappropriatePatterns = [
    /\b(suicide|kill myself|end it all)\b/i,
    /\b(self harm|cut myself|hurt myself)\b/i,
    // Add more patterns as needed
  ];
  
  return !inappropriatePatterns.some(pattern => pattern.test(content));
}

// Session management
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function isSessionActive(lastActivity: Date, timeoutMinutes: number = 30): boolean {
  const now = new Date();
  const timeDiff = now.getTime() - lastActivity.getTime();
  const timeoutMs = timeoutMinutes * 60 * 1000;
  return timeDiff < timeoutMs;
}
