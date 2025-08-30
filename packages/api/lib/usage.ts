// Usage tracking for cost monitoring and rate limiting
// Note: This is anonymous usage tracking - no chat content is stored

interface UsageRecord {
  userId: string;
  date: string; // YYYY-MM-DD
  turns: number;
  tokens: number;
  cost: number; // Estimated cost in USD
}

// In-memory cache for development (use Redis in production)
const usageCache = new Map<string, UsageRecord>();

// Cost per token (approximate, based on GPT-4o-mini pricing)
const COST_PER_TOKEN = 0.00000015; // $0.15 per 1M tokens

export async function incrementUsage(
  userId: string, 
  date: string, 
  tokens: number = 0
): Promise<void> {
  const key = `${userId}:${date}`;
  
  try {
    // In production, this would update the database
    // For now, use in-memory cache
    const existing = usageCache.get(key) || {
      userId,
      date,
      turns: 0,
      tokens: 0,
      cost: 0,
    };

    const updated: UsageRecord = {
      ...existing,
      turns: existing.turns + 1,
      tokens: existing.tokens + tokens,
      cost: existing.cost + (tokens * COST_PER_TOKEN),
    };

    usageCache.set(key, updated);

    // Log for monitoring (no user data, just aggregates)
    console.log(`Usage updated: ${date} - Turns: ${updated.turns}, Tokens: ${updated.tokens}, Cost: $${updated.cost.toFixed(4)}`);

    // In production, also update database:
    // await updateUsageInDatabase(updated);

  } catch (error) {
    console.error('Usage tracking error:', error);
    // Don't fail the request if usage tracking fails
  }
}

export async function getCurrentUsage(userId: string, date: string): Promise<number> {
  const key = `${userId}:${date}`;
  
  try {
    // In production, query the database
    // For now, use in-memory cache
    const usage = usageCache.get(key);
    return usage?.turns || 0;

  } catch (error) {
    console.error('Usage retrieval error:', error);
    return 0; // Fail open - don't block users
  }
}

export async function getDailyStats(date: string): Promise<{
  totalUsers: number;
  totalTurns: number;
  totalTokens: number;
  totalCost: number;
}> {
  try {
    // Aggregate stats for the day (anonymous)
    const dayRecords = Array.from(usageCache.values())
      .filter(record => record.date === date);

    return {
      totalUsers: dayRecords.length,
      totalTurns: dayRecords.reduce((sum, record) => sum + record.turns, 0),
      totalTokens: dayRecords.reduce((sum, record) => sum + record.tokens, 0),
      totalCost: dayRecords.reduce((sum, record) => sum + record.cost, 0),
    };

  } catch (error) {
    console.error('Stats retrieval error:', error);
    return {
      totalUsers: 0,
      totalTurns: 0,
      totalTokens: 0,
      totalCost: 0,
    };
  }
}

export async function checkRateLimit(userId: string, date: string): Promise<{
  allowed: boolean;
  remaining: number;
  resetTime: Date;
}> {
  const DAILY_LIMIT = 50;
  const currentUsage = await getCurrentUsage(userId, date);
  
  const resetTime = new Date();
  resetTime.setDate(resetTime.getDate() + 1);
  resetTime.setHours(0, 0, 0, 0);

  return {
    allowed: currentUsage < DAILY_LIMIT,
    remaining: Math.max(0, DAILY_LIMIT - currentUsage),
    resetTime,
  };
}

// Utility to estimate cost for a request
export function estimateRequestCost(
  voiceCount: number = 5,
  avgTokensPerVoice: number = 140,
  synthesisTokens: number = 120
): number {
  const totalTokens = (voiceCount * avgTokensPerVoice) + synthesisTokens;
  return totalTokens * COST_PER_TOKEN;
}

// Clean up old cache entries (run periodically)
export function cleanupUsageCache(): void {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 7); // Keep 7 days
  const cutoffString = cutoffDate.toISOString().split('T')[0];

  for (const [key, record] of usageCache.entries()) {
    if (record.date < cutoffString) {
      usageCache.delete(key);
    }
  }
}
