import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { corsMiddleware } from '../../lib/cors';

// Request validation schema
const RegenerateCodeRequestSchema = z.object({
  profileId: z.string().uuid(),
  coachId: z.string().uuid(),
  ttlDays: z.number().min(1).max(30).default(7), // Default 7 days TTL
  reason: z.string().optional(), // Optional reason for regeneration
});

// Response schema
interface RegenerateCodeResponse {
  success: boolean;
  newCode?: string;
  expiresAt?: string;
  oldCodeRevoked?: boolean;
  error?: string;
}

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
    const validation = RegenerateCodeRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        details: validation.error.errors 
      });
    }

    const { profileId, coachId, ttlDays, reason } = validation.data;

    console.log(`Coach ${coachId} regenerating code for profile ${profileId}. Reason: ${reason || 'Not specified'}`);

    // Step 1: Revoke existing active codes for this profile
    const revokedCount = await revokeExistingCodes(profileId, coachId);
    console.log(`Revoked ${revokedCount} existing codes for profile ${profileId}`);

    // Step 2: Generate new activation code
    const newCode = generateActivationCode();
    
    // Step 3: Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + ttlDays);

    // Step 4: Get profile info for the new code
    const profile = await getProfileInfo(profileId);
    if (!profile) {
      return res.status(404).json({ 
        error: 'Profile not found' 
      });
    }

    // Step 5: Store new code in database
    const codeData = await createActivationCode({
      code: newCode,
      userEmail: profile.userEmail,
      profileId,
      createdBy: coachId,
      expiresAt,
    });

    if (!codeData) {
      return res.status(500).json({ 
        error: 'Failed to create new activation code' 
      });
    }

    const response: RegenerateCodeResponse = {
      success: true,
      newCode: codeData.code,
      expiresAt: codeData.expiresAt.toISOString(),
      oldCodeRevoked: revokedCount > 0,
    };

    return res.status(201).json(response);

  } catch (error) {
    console.error('Code regeneration error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

// Generate activation code with format PNR-XXX-XXX
function generateActivationCode(): string {
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'; // No O, 0 for clarity
  let result = 'PNR-';
  
  // Generate two 3-character segments
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < 1) result += '-';
  }
  
  return result; // Format: PNR-XXX-XXX
}

interface CreateActivationCodeData {
  code: string;
  userEmail: string;
  profileId: string;
  createdBy: string;
  expiresAt: Date;
}

interface ActivationCodeRecord {
  id: string;
  code: string;
  userEmail: string;
  profileId: string;
  createdBy: string;
  expiresAt: Date;
  isRedeemed: boolean;
  createdAt: Date;
}

interface ProfileInfo {
  id: string;
  userEmail: string;
  userId: string;
}

async function revokeExistingCodes(profileId: string, coachId: string): Promise<number> {
  try {
    // In production, revoke all active codes for this profile:
    // const result = await prisma.activationCode.updateMany({
    //   where: {
    //     profileId,
    //     isRedeemed: false,
    //     expiresAt: { gt: new Date() }
    //   },
    //   data: {
    //     isRedeemed: true,
    //     redeemedAt: new Date(),
    //     revokedBy: coachId
    //   }
    // });
    // return result.count;

    // For development, simulate revoking codes
    console.log(`Simulating revocation of existing codes for profile ${profileId}`);
    return 1; // Simulate 1 code revoked
  } catch (error) {
    console.error('Error revoking existing codes:', error);
    return 0;
  }
}

async function getProfileInfo(profileId: string): Promise<ProfileInfo | null> {
  try {
    // In production, query the profile:
    // const profile = await prisma.profile.findUnique({
    //   where: { id: profileId },
    //   select: { id: true, userEmail: true, userId: true }
    // });
    // return profile;

    // For development, simulate profile data
    return {
      id: profileId,
      userEmail: `user.${profileId.substring(0, 8)}@example.com`,
      userId: `user_${profileId.substring(0, 8)}`,
    };
  } catch (error) {
    console.error('Error fetching profile info:', error);
    return null;
  }
}

async function createActivationCode(data: CreateActivationCodeData): Promise<ActivationCodeRecord | null> {
  try {
    // In production, this would use Supabase/Prisma:
    // const result = await prisma.activationCode.create({
    //   data: {
    //     code: data.code,
    //     userEmail: data.userEmail,
    //     profileId: data.profileId,
    //     createdBy: data.createdBy,
    //     expiresAt: data.expiresAt,
    //     isRedeemed: false,
    //   },
    // });

    // For development, simulate database creation
    const mockRecord: ActivationCodeRecord = {
      id: `ac_${Date.now()}`,
      code: data.code,
      userEmail: data.userEmail,
      profileId: data.profileId,
      createdBy: data.createdBy,
      expiresAt: data.expiresAt,
      isRedeemed: false,
      createdAt: new Date(),
    };

    console.log('Created new activation code:', mockRecord);
    return mockRecord;

  } catch (error) {
    console.error('Database error creating activation code:', error);
    return null;
  }
}
