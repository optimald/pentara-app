import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { ActivateRequest, ActivateResponse } from '@pentara/shared';
import { corsMiddleware } from '../lib/cors';
import { generateJWT } from '../lib/auth';
import { getProfile, encryptProfile } from '../lib/profile';

// Request validation schema
const ActivateRequestSchema = z.object({
  activationCode: z.string().min(8).max(20),
  deviceId: z.string().min(1).max(100),
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
    // Validate request body
    const validation = ActivateRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        details: validation.error.errors 
      });
    }

    const { activationCode, deviceId } = validation.data;

    console.log(`Activation attempt: ${activationCode} from device ${deviceId.substring(0, 8)}...`);

    // Validate activation code
    const codeData = await validateActivationCode(activationCode);
    if (!codeData) {
      return res.status(400).json({ 
        error: 'Invalid or expired activation code' 
      });
    }

    // Check if already redeemed
    if (codeData.isRedeemed) {
      return res.status(400).json({ 
        error: 'Activation code has already been used' 
      });
    }

    // Get the associated profile
    const profile = await getProfile(codeData.profileId);
    if (!profile) {
      return res.status(404).json({ 
        error: 'Profile not found' 
      });
    }

    // Mark code as redeemed
    await redeemActivationCode(activationCode, deviceId);

    // Generate JWT for the user
    const token = generateJWT(codeData.userId, codeData.userEmail);

    // Prepare response with encrypted profile
    const response: ActivateResponse = {
      success: true,
      profile: {
        personalManual: profile.manual,
        voices: profile.voices,
        welcomeMessage: profile.welcomeMessage,
      },
      token,
    };

    console.log(`Activation successful for user ${codeData.userEmail}`);
    
    res.status(200).json(response);

  } catch (error) {
    console.error('Activation API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

interface ActivationCodeData {
  code: string;
  userId: string;
  userEmail: string;
  profileId: string;
  createdBy: string;
  expiresAt: Date;
  isRedeemed: boolean;
}

async function validateActivationCode(code: string): Promise<ActivationCodeData | null> {
  try {
    // In production, query Supabase/Prisma:
    // const codeData = await prisma.activationCode.findUnique({
    //   where: { code },
    //   include: { profile: true }
    // });

    // For development, simulate validation
    if (code.startsWith('PNR-') && code.length >= 8) {
      // Mock activation code data
      return {
        code,
        userId: `user_${code.replace('PNR-', '')}`,
        userEmail: `user${Date.now()}@example.com`,
        profileId: `profile_${code.replace('PNR-', '')}`,
        createdBy: 'coach_1',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        isRedeemed: false,
      };
    }

    return null;

  } catch (error) {
    console.error('Activation code validation error:', error);
    return null;
  }
}

async function redeemActivationCode(code: string, deviceId: string): Promise<void> {
  try {
    // In production, update Supabase/Prisma:
    // await prisma.activationCode.update({
    //   where: { code },
    //   data: { 
    //     isRedeemed: true, 
    //     redeemedAt: new Date(),
    //     deviceId 
    //   }
    // });

    console.log(`Activation code ${code} redeemed by device ${deviceId.substring(0, 8)}...`);

  } catch (error) {
    console.error('Code redemption error:', error);
    throw error;
  }
}

// Utility to generate activation codes (used by coach console)
export function generateActivationCode(): string {
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'; // No O, 0 for clarity
  let result = 'PNR-';
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < 2) result += '-';
  }
  
  return result; // Format: PNR-XX-XX-XX
}
