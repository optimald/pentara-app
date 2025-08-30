import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';
import { z } from 'zod';
import { ChatRequest, ChatResponse, VoiceResponse, Synthesis } from '@pentara/shared';
import { corsMiddleware } from '../lib/cors';
import { validateJWT } from '../lib/auth';
import { incrementUsage } from '../lib/usage';
import { getProfile } from '../lib/profile';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Request validation schema
const ChatRequestSchema = z.object({
  userId: z.string(),
  threadId: z.string().optional(),
  prompt: z.string().min(1).max(1000),
  mode: z.enum(['ask_now', 'daily_checkin', 'decision_frame']).default('ask_now'),
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
    const validation = ChatRequestSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid request', 
        details: validation.error.errors 
      });
    }

    const { userId, prompt, mode } = validation.data;

    // Verify user matches token
    if (userId !== decoded.userId) {
      return res.status(403).json({ error: 'User ID mismatch' });
    }

    // Get user profile
    const profile = await getProfile(userId);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Check usage limits (50 turns per day)
    const today = new Date().toISOString().split('T')[0];
    const currentUsage = await getCurrentUsage(userId, today);
    if (currentUsage >= 50) {
      return res.status(429).json({ 
        error: 'Daily usage limit reached (50 turns per day)' 
      });
    }

    console.log(`Processing ${mode} request for user ${userId}: "${prompt.substring(0, 50)}..."`);

    // Execute five-voice orchestrator
    const startTime = Date.now();
    const chatResponse = await executeVoiceOrchestrator(profile, prompt, mode);
    const totalTime = Date.now() - startTime;

    // Increment usage counter
    await incrementUsage(userId, today);

    // Return response
    const response: ChatResponse = {
      success: true,
      message: {
        id: generateId(),
        threadId: validation.data.threadId || generateId(),
        prompt,
        responses: chatResponse.voices,
        synthesis: chatResponse.synthesis,
        timestamp: new Date().toISOString(),
        mode,
      }
    };

    console.log(`Completed in ${totalTime}ms, ${chatResponse.totalTokens} tokens`);
    
    res.status(200).json(response);

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

async function executeVoiceOrchestrator(
  profile: any, 
  prompt: string, 
  mode: string
): Promise<{ voices: VoiceResponse[]; synthesis: Synthesis; totalTokens: number }> {
  
  const voices = profile.voices;
  const manual = profile.manual;

  // Create system prompts for each voice
  const voicePrompts = voices.map((voice: any) => ({
    voiceId: voice.id,
    voiceName: voice.name,
    systemPrompt: createVoiceSystemPrompt(voice, manual, mode),
    tokenCap: voice.tokenCap || 140,
  }));

  // Execute all 5 voice calls in parallel
  const voicePromises = voicePrompts.map(async (voicePrompt) => {
    const startTime = Date.now();
    
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Cost-effective model
        messages: [
          { role: 'system', content: voicePrompt.systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: voicePrompt.tokenCap,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const response = completion.choices[0]?.message?.content || 'No response generated.';
      const tokenCount = completion.usage?.total_tokens || 0;
      const processingTime = Date.now() - startTime;

      return {
        voiceId: voicePrompt.voiceId,
        voiceName: voicePrompt.voiceName,
        response: response.trim(),
        tokenCount,
        processingTime,
      };

    } catch (error) {
      console.error(`Error with voice ${voicePrompt.voiceName}:`, error);
      
      // Fallback response
      return {
        voiceId: voicePrompt.voiceId,
        voiceName: voicePrompt.voiceName,
        response: `I'm having trouble responding right now. Please try again.`,
        tokenCount: 0,
        processingTime: Date.now() - startTime,
      };
    }
  });

  // Wait for all voice responses
  const voiceResponses = await Promise.all(voicePromises);

  // Generate synthesis
  const synthesis = await generateSynthesis(voiceResponses, prompt, manual);

  // Calculate total tokens
  const totalTokens = voiceResponses.reduce((sum, voice) => sum + voice.tokenCount, 0) + synthesis.tokenCount;

  return {
    voices: voiceResponses,
    synthesis,
    totalTokens,
  };
}

function createVoiceSystemPrompt(voice: any, manual: any, mode: string): string {
  const modeInstructions = {
    ask_now: 'Provide immediate, actionable guidance.',
    daily_checkin: 'Offer supportive reflection and gentle direction.',
    decision_frame: 'Help analyze options and clarify decision-making.',
  };

  return `You are ${voice.name}, a ${voice.archetype} voice inspired by ${voice.inspiredBy.join(', ')}.

PERSONALITY & TONE:
${voice.tone}
${voice.styleRules.join('\n')}

DOMAIN FOCUS: ${voice.domainFocus}

DO:
${voice.dosDonts.dos.join('\n- ')}

DON'T:
${voice.dosDonts.donts.join('\n- ')}

USER'S PERSONAL CONTEXT:
- Core Values: ${manual.values.join(', ')}
- Key Drivers: ${manual.drivers.join(', ')}
- Strengths: ${manual.strengths.join(', ')}
- Reset Actions: ${manual.resets.join(', ')}
- Boundaries: ${manual.boundaries.join(', ')}

MODE: ${mode} - ${modeInstructions[mode]}

CONSTRAINTS:
- Maximum ${voice.tokenCap} tokens
- One clear action if possible
- No medical advice
- Stay supportive and practical
- Speak as ${voice.name}, not as an AI

Respond directly to the user's prompt with your unique perspective.`;
}

async function generateSynthesis(
  voiceResponses: VoiceResponse[], 
  originalPrompt: string,
  manual: any
): Promise<Synthesis> {
  
  const startTime = Date.now();
  
  const synthesisPrompt = `Based on these five voice responses to "${originalPrompt}", create a synthesis:

${voiceResponses.map((voice, i) => `${i + 1}. ${voice.voiceName}: ${voice.response}`).join('\n\n')}

USER CONTEXT: Values: ${manual.values.join(', ')}

Generate:
1. Exactly 3 actionable next steps (be specific and practical)
2. One reassuring message (acknowledge their situation with hope)

Format as JSON:
{
  "nextSteps": ["step 1", "step 2", "step 3"],
  "reassurance": "reassuring message"
}

Keep total response under 120 tokens.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: synthesisPrompt }],
      max_tokens: 120,
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const response = completion.choices[0]?.message?.content;
    const tokenCount = completion.usage?.total_tokens || 0;
    
    if (response) {
      const parsed = JSON.parse(response);
      return {
        nextSteps: parsed.nextSteps || ['Take a moment to reflect', 'Choose one small action', 'Trust your process'],
        reassurance: parsed.reassurance || 'You have the wisdom to navigate this.',
        tokenCount,
      };
    }
  } catch (error) {
    console.error('Synthesis generation error:', error);
  }

  // Fallback synthesis
  return {
    nextSteps: [
      'Take a moment to reflect on the different perspectives',
      'Choose one small action you can take today',
      'Trust your inner wisdom to guide you forward'
    ],
    reassurance: 'You have everything you need to handle this situation.',
    tokenCount: 0,
  };
}

async function getCurrentUsage(userId: string, date: string): Promise<number> {
  // This would query the database for current usage
  // For now, return 0 as placeholder
  return 0;
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
