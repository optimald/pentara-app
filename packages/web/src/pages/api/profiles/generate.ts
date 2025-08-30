import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';
import { generatePersonalManual, generateFiveVoiceProfile, generateActivationCodeForProfile } from '../../../lib/profileGenerator';
import { OnboardingAnswers } from '@pentara/shared';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getSession({ req });
    
    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { answers, userEmail } = req.body as {
      answers: OnboardingAnswers;
      userEmail: string;
    };

    if (!answers || !userEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Generate Personal Manual
    const personalManual = generatePersonalManual(answers, userEmail);

    // Generate Five-Voice Profile
    const profile = generateFiveVoiceProfile(
      answers,
      personalManual,
      userEmail,
      session.user.id!
    );

    // Save profile to database
    const savedProfile = await prisma.profile.create({
      data: {
        userId: userEmail,
        userEmail,
        personalManual: personalManual as any, // Prisma Json type
        voices: profile.voices as any, // Prisma Json type
        welcomeMessage: profile.welcomeMessage,
        version: profile.version,
        createdBy: session.user.id!,
      },
    });

    // Generate activation code
    const activationCodeData = await generateActivationCodeForProfile(
      savedProfile.id,
      userEmail,
      session.user.id!
    );

    const savedActivationCode = await prisma.activationCode.create({
      data: {
        code: activationCodeData.code,
        userEmail: activationCodeData.userEmail,
        profileId: savedProfile.id,
        createdBy: activationCodeData.createdBy,
        expiresAt: new Date(activationCodeData.expiresAt),
        isRedeemed: false,
      },
    });

    // Return the generated profile and activation code
    res.status(200).json({
      success: true,
      profile: {
        id: savedProfile.id,
        userId: savedProfile.userId,
        userEmail: savedProfile.userEmail,
        personalManual: savedProfile.personalManual,
        voices: savedProfile.voices,
        welcomeMessage: savedProfile.welcomeMessage,
        version: savedProfile.version,
        createdAt: savedProfile.createdAt,
        createdBy: savedProfile.createdBy,
      },
      activationCode: {
        code: savedActivationCode.code,
        expiresAt: savedActivationCode.expiresAt,
      },
    });

  } catch (error) {
    console.error('Error generating profile:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
