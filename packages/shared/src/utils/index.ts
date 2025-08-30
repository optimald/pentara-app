// Utility functions for Pentara

export const generateActivationCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'; // No O, 0 for clarity
  const segments = [3, 2, 2]; // PNR-8X-K7 format
  
  return segments
    .map(length => 
      Array.from({ length }, () => 
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('')
    )
    .join('-');
};

export const isValidActivationCode = (code: string): boolean => {
  const pattern = /^[A-NP-Z1-9]{3}-[A-NP-Z1-9]{2}-[A-NP-Z1-9]{2}$/;
  return pattern.test(code);
};

export const generateUserId = (): string => {
  return `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateThreadId = (): string => {
  return `thr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isExpired = (expiresAt: string): boolean => {
  return new Date(expiresAt) < new Date();
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Token counting approximation (rough estimate)
export const estimateTokenCount = (text: string): number => {
  // Rough approximation: ~4 characters per token
  return Math.ceil(text.length / 4);
};

export const validateTokenLimit = (text: string, limit: number): boolean => {
  return estimateTokenCount(text) <= limit;
};
