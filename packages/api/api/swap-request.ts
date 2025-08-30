import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { Resend } from 'resend';
import { SwapRequest } from '@pentara/shared';
import { corsMiddleware } from '../lib/cors';
import { validateJWT } from '../lib/auth';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Request validation schema
const SwapRequestSchema = z.object({
  userId: z.string(),
  currentVoiceId: z.string().optional(),
  requestedChange: z.string().min(10).max(500),
  reason: z.string().min(10).max(1000),
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
    const validation = SwapRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        details: validation.error.errors 
      });
    }

    const { userId, currentVoiceId, requestedChange, reason } = validation.data;

    // Verify user matches token
    if (userId !== decoded.userId) {
      return res.status(403).json({ error: 'User ID mismatch' });
    }

    console.log(`Voice swap request from user ${decoded.email}: ${requestedChange.substring(0, 50)}...`);

    // Get user's profile to find their coach
    const coachEmail = await getCoachEmailForUser(userId);
    if (!coachEmail) {
      return res.status(404).json({ error: 'Coach not found for user' });
    }

    // Send email to coach
    await sendSwapRequestEmail({
      coachEmail,
      userEmail: decoded.email,
      userId,
      currentVoiceId,
      requestedChange,
      reason,
    });

    res.status(200).json({
      success: true,
      message: 'Voice swap request sent to your coach'
    });

  } catch (error) {
    console.error('Swap request API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

async function getCoachEmailForUser(userId: string): Promise<string | null> {
  try {
    // In production, query Supabase/Prisma:
    // const profile = await prisma.profile.findUnique({
    //   where: { userId },
    //   include: { creator: true }
    // });
    // return profile?.creator?.email || null;

    // For development, return mock coach email
    return 'coach@pentara.app';

  } catch (error) {
    console.error('Coach lookup error:', error);
    return null;
  }
}

interface SwapRequestEmailData {
  coachEmail: string;
  userEmail: string;
  userId: string;
  currentVoiceId?: string;
  requestedChange: string;
  reason: string;
}

async function sendSwapRequestEmail(data: SwapRequestEmailData): Promise<void> {
  try {
    const { coachEmail, userEmail, userId, currentVoiceId, requestedChange, reason } = data;

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #B8860B;">Voice Swap Request - Pentara</h2>
        
        <p>A user has requested a voice modification for their Pentara profile.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Request Details</h3>
          <p><strong>User:</strong> ${userEmail}</p>
          <p><strong>User ID:</strong> ${userId}</p>
          ${currentVoiceId ? `<p><strong>Current Voice:</strong> ${currentVoiceId}</p>` : ''}
          
          <h4>Requested Change:</h4>
          <p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #B8860B;">
            ${requestedChange}
          </p>
          
          <h4>Reason:</h4>
          <p style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #B8860B;">
            ${reason}
          </p>
        </div>
        
        <div style="margin: 30px 0;">
          <a href="https://pentara-app-web-optimaldev.vercel.app/console" 
             style="background: #B8860B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Review in Coach Console
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px;">
          This request was generated automatically from the Pentara mobile app. 
          Please review and respond to the user as appropriate.
        </p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 12px;">
          Pentara - Five voices. One circle. Clarity on demand.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'api@pentara.app',
      to: coachEmail,
      subject: `Voice Swap Request from ${userEmail}`,
      html: emailContent,
    });

    console.log(`Swap request email sent to ${coachEmail} for user ${userEmail}`);

  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}
