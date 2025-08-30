import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { UsageRequest } from '@pentara/shared';
import { corsMiddleware } from '../lib/cors';
import { validateJWT } from '../lib/auth';
import { incrementUsage, checkRateLimit } from '../lib/usage';

// Request validation schema
const UsageRequestSchema = z.object({
  userId: z.string(),
  turns: z.number().min(1).max(10).default(1),
  tokens: z.number().min(0).max(2000).optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apply CORS
  await corsMiddleware(req, res);
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate JWT token
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const decoded = validateJWT(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Validate request body
    const validation = UsageRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        details: validation.error.errors 
      });
    }

    const { userId, turns, tokens } = validation.data;

    // Verify user matches token
    if (userId !== decoded.userId) {
      return res.status(403).json({ error: 'User ID mismatch' });
    }

    const today = new Date().toISOString().split('T')[0];

    // Check rate limits
    const rateLimit = await checkRateLimit(userId, today);
    if (!rateLimit.allowed) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        remaining: rateLimit.remaining,
        resetTime: rateLimit.resetTime,
      });
    }

    // Increment usage
    await incrementUsage(userId, today, tokens || 0);

    // Return updated rate limit info
    const updatedRateLimit = await checkRateLimit(userId, today);

    res.status(200).json({
      success: true,
      usage: {
        remaining: updatedRateLimit.remaining,
        resetTime: updatedRateLimit.resetTime,
      }
    });

  } catch (error) {
    console.error('Usage API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
