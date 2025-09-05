import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { corsMiddleware } from '../../lib/cors';
import { generateJWT } from '../../lib/auth';

// Request validation schema
const GenerateCodeRequestSchema = z.object({
  userEmail: z.string().email(),
  profileId: z.string().uuid(),
  createdBy: z.string().uuid(), // Coach ID
  ttlDays: z.number().min(1).max(30).default(7), // Default 7 days TTL
});

// Response schema
interface GenerateCodeResponse {
  success: boolean;
  code?: string;
  expiresAt?: string;
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
    const validation = GenerateCodeRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        details: validation.error.errors 
      });
    }

    const { userEmail, profileId, createdBy, ttlDays } = validation.data;

    console.log(`Generating activation code for profile ${profileId} by coach ${createdBy}`);

    // Generate unique activation code
    const code = generateActivationCode();
    
    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + ttlDays);

    // Store in database
    const codeData = await createActivationCode({
      code,
      userEmail,
      profileId,
      createdBy,
      expiresAt,
    });

    if (!codeData) {
      return res.status(500).json({ 
        error: 'Failed to create activation code' 
      });
    }

    const response: GenerateCodeResponse = {
      success: true,
      code: codeData.code,
      expiresAt: codeData.expiresAt.toISOString(),
    };

    return res.status(201).json(response);

  } catch (error) {
    console.error('Code generation error:', error);
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

    console.log('Created activation code:', mockRecord);
    return mockRecord;

  } catch (error) {
    console.error('Database error creating activation code:', error);
    return null;
  }
}

// Utility function to check if code exists (prevent duplicates)
async function codeExists(code: string): Promise<boolean> {
  try {
    // In production:
    // const existing = await prisma.activationCode.findUnique({
    //   where: { code }
    // });
    // return !!existing;

    // For development, assume no duplicates
    return false;
  } catch (error) {
    console.error('Error checking code existence:', error);
    return true; // Assume exists to be safe
  }
}
