import { OnboardingAnswers, PersonalManual, Voice, FiveVoiceProfile } from '@pentara/shared';
import { generateActivationCode } from '@pentara/shared';

// Voice archetype templates based on common inspirational figures
const VOICE_ARCHETYPES = {
  'The Strategist': {
    description: 'Analytical, forward-thinking, systems-oriented',
    sampleFigures: ['Steve Jobs', 'Elon Musk', 'Jeff Bezos'],
    domainFocus: 'Strategy, planning, long-term thinking',
    tone: 'Direct, analytical, future-focused',
    styleRules: ['Focus on systems and patterns', 'Ask probing questions', 'Challenge assumptions'],
  },
  'The Mentor': {
    description: 'Wise, supportive, experience-based guidance',
    sampleFigures: ['Maya Angelou', 'Mr. Rogers', 'Oprah Winfrey'],
    domainFocus: 'Personal growth, relationships, wisdom',
    tone: 'Gentle, supportive, encouraging',
    styleRules: ['Share wisdom through stories', 'Validate feelings', 'Encourage self-compassion'],
  },
  'The Warrior': {
    description: 'Disciplined, resilient, action-oriented',
    sampleFigures: ['David Goggins', 'Jocko Willink', 'Marcus Aurelius'],
    domainFocus: 'Discipline, resilience, taking action',
    tone: 'Direct, challenging, motivating',
    styleRules: ['Push for action', 'Emphasize discipline', 'Focus on what you can control'],
  },
  'The Creator': {
    description: 'Innovative, artistic, possibility-focused',
    sampleFigures: ['Leonardo da Vinci', 'Frida Kahlo', 'Walt Disney'],
    domainFocus: 'Creativity, innovation, self-expression',
    tone: 'Playful, imaginative, inspiring',
    styleRules: ['Encourage experimentation', 'See possibilities', 'Value unique perspectives'],
  },
  'The Philosopher': {
    description: 'Thoughtful, questioning, meaning-seeking',
    sampleFigures: ['Socrates', 'Carl Jung', 'Viktor Frankl'],
    domainFocus: 'Meaning, purpose, deep questions',
    tone: 'Thoughtful, questioning, reflective',
    styleRules: ['Ask deeper questions', 'Explore meaning', 'Challenge surface-level thinking'],
  },
  'The Healer': {
    description: 'Compassionate, nurturing, holistic',
    sampleFigures: ['Mother Teresa', 'Thich Nhat Hanh', 'Brené Brown'],
    domainFocus: 'Emotional healing, self-care, compassion',
    tone: 'Gentle, compassionate, healing',
    styleRules: ['Prioritize self-care', 'Validate emotions', 'Encourage healing'],
  },
  'The Builder': {
    description: 'Practical, persistent, results-oriented',
    sampleFigures: ['Henry Ford', 'Sara Blakely', 'Richard Branson'],
    domainFocus: 'Building, creating, practical results',
    tone: 'Practical, encouraging, results-focused',
    styleRules: ['Focus on practical steps', 'Celebrate progress', 'Emphasize persistence'],
  },
};

export function generatePersonalManual(answers: OnboardingAnswers): PersonalManual {
  const manual: PersonalManual = {
    userId: '', // Will be set by the calling function
    values: extractValues(answers),
    drivers: answers.driversValues?.topDrivers || [],
    strengths: extractStrengths(answers),
    resets: answers.resetProtocol?.resetActions || [],
    beliefs: [{
      old: answers.beliefShifts?.oldBelief || '',
      new: answers.beliefShifts?.newBelief || '',
    }],
    boundaries: extractBoundaries(answers),
    preferredTone: answers.negativeTraits?.preferredResponse ? [answers.negativeTraits.preferredResponse] : [],
    createdAt: new Date().toISOString(),
  };

  return manual;
}

export function generateFiveVoiceProfile(answers: OnboardingAnswers, manual: PersonalManual, userId: string, createdBy: string): FiveVoiceProfile {
  const inspirationFigures = answers.inspirations?.figures || [];
  const desiredQualities = answers.inspirations?.qualities || [];
  const desiredArchetypes = answers.inspirations?.desiredArchetypes || [];

  // Map user's inspirations to voice archetypes
  const selectedArchetypes = selectVoiceArchetypes(inspirationFigures, desiredQualities, Array.isArray(desiredArchetypes) ? desiredArchetypes.join(', ') : desiredArchetypes);
  
  // Generate 5 voices based on selected archetypes
  const voices = selectedArchetypes.map((archetype, index) => 
    createVoice(archetype, answers, manual, index)
  ) as [Voice, Voice, Voice, Voice, Voice];

  const profile: FiveVoiceProfile = {
    userId,
    voices,
    manual,
    welcomeMessage: generateWelcomeMessage(answers, voices),
    version: 1,
    createdAt: new Date().toISOString(),
    createdBy,
  };

  return profile;
}

function extractValues(answers: OnboardingAnswers): string[] {
  const values: string[] = [];
  
  // Extract from drivers
  if (answers.driversValues?.topDrivers) {
    values.push(...answers.driversValues.topDrivers);
  }
  
  // Extract from relationship values
  if (answers.driversValues?.relationshipValues) {
    const relationshipValues = extractKeywordsFromText(answers.driversValues.relationshipValues);
    values.push(...relationshipValues);
  }
  
  return Array.from(new Set(values)); // Remove duplicates
}

function extractStrengths(answers: OnboardingAnswers): string[] {
  const strengths: string[] = [];
  
  if (answers.coreIdentity?.strengths) {
    strengths.push(...extractKeywordsFromText(answers.coreIdentity.strengths));
  }
  
  if (answers.positiveTraits?.admiredFor) {
    strengths.push(...extractKeywordsFromText(answers.positiveTraits.admiredFor));
  }
  
  if (answers.positiveTraits?.superpower) {
    strengths.push(answers.positiveTraits.superpower);
  }
  
  return Array.from(new Set(strengths));
}

function extractBoundaries(answers: OnboardingAnswers): string[] {
  const boundaries: string[] = [];
  
  if (answers.environmentalNeeds?.avoidEnvironment) {
    boundaries.push(...extractKeywordsFromText(answers.environmentalNeeds.avoidEnvironment));
  }
  
  if (answers.relationshipDynamics?.trustLosers) {
    boundaries.push(...extractKeywordsFromText(answers.relationshipDynamics.trustLosers));
  }
  
  return Array.from(new Set(boundaries));
}

function extractKeywordsFromText(text: string): string[] {
  // Simple keyword extraction - in production, you might use NLP
  return text
    .toLowerCase()
    .split(/[,;.\n]/)
    .map(s => s.trim())
    .filter(s => s.length > 2)
    .slice(0, 5); // Limit to top 5 keywords
}

function selectVoiceArchetypes(figures: string[], qualities: string[], desiredArchetypes: string): string[] {
  // This is a simplified mapping - in production, you'd use more sophisticated matching
  const archetypeScores: { [key: string]: number } = {};
  
  // Initialize all archetypes with base score
  Object.keys(VOICE_ARCHETYPES).forEach(archetype => {
    archetypeScores[archetype] = 0;
  });
  
  // Score based on mentioned figures
  figures.forEach(figure => {
    Object.entries(VOICE_ARCHETYPES).forEach(([archetype, data]) => {
      if (data.sampleFigures.some(sample => 
        figure.toLowerCase().includes(sample.toLowerCase()) || 
        sample.toLowerCase().includes(figure.toLowerCase())
      )) {
        archetypeScores[archetype] += 3;
      }
    });
  });
  
  // Score based on desired qualities
  qualities.forEach(quality => {
    Object.entries(VOICE_ARCHETYPES).forEach(([archetype, data]) => {
      if (data.description.toLowerCase().includes(quality.toLowerCase())) {
        archetypeScores[archetype] += 2;
      }
    });
  });
  
  // Score based on desired archetypes text
  Object.entries(VOICE_ARCHETYPES).forEach(([archetype, data]) => {
    if (desiredArchetypes.toLowerCase().includes(archetype.toLowerCase()) ||
        desiredArchetypes.toLowerCase().includes(data.description.toLowerCase())) {
      archetypeScores[archetype] += 4;
    }
  });
  
  // Select top 5 archetypes
  const sortedArchetypes = Object.entries(archetypeScores)
    .sort(([,a], [,b]) => b - a)
    .map(([archetype]) => archetype)
    .slice(0, 5);
  
  // Ensure we have exactly 5 unique archetypes
  const defaultArchetypes = ['The Mentor', 'The Strategist', 'The Warrior', 'The Creator', 'The Philosopher'];
  const finalArchetypes = Array.from(new Set([...sortedArchetypes, ...defaultArchetypes])).slice(0, 5);
  
  return finalArchetypes;
}

function createVoice(archetypeName: string, answers: OnboardingAnswers, manual: PersonalManual, index: number): Voice {
  const archetype = VOICE_ARCHETYPES[archetypeName as keyof typeof VOICE_ARCHETYPES];
  
  const voice: Voice = {
    id: `voice_${index + 1}`,
    name: generateVoiceName(archetypeName, answers.inspirations?.figures || []),
    archetype: archetypeName,
    inspiredBy: getRelevantFigures(archetypeName, answers.inspirations?.figures || []),
    domainFocus: archetype.domainFocus,
    tone: archetype.tone,
    dosDonts: {
      dos: [
        ...archetype.styleRules,
        `Honor their values: ${manual.values.join(', ')}`,
        `Support their strengths: ${manual.strengths.slice(0, 2).join(', ')}`,
      ],
      donts: [
        `Avoid topics that trigger: ${manual.boundaries.slice(0, 2).join(', ')}`,
        'Never provide medical or therapeutic advice',
        'Keep responses under 140 tokens',
      ],
    },
    tokenCap: 140,
    styleRules: [
      ...archetype.styleRules,
      'Be concise and actionable',
      'Reference their personal context when relevant',
      'End with one specific next step when possible',
    ],
    sampleLines: generateSampleLines(archetypeName, answers),
  };
  
  return voice;
}

function generateVoiceName(archetypeName: string, figures: string[]): string {
  // Generate a name that reflects the archetype and user's inspirations
  const archetypeNames = {
    'The Strategist': ['The Visionary', 'The Planner', 'The Systems Thinker'],
    'The Mentor': ['The Guide', 'The Wise One', 'The Supporter'],
    'The Warrior': ['The Champion', 'The Disciplined One', 'The Resilient'],
    'The Creator': ['The Innovator', 'The Artist', 'The Dreamer'],
    'The Philosopher': ['The Questioner', 'The Seeker', 'The Reflector'],
    'The Healer': ['The Nurturer', 'The Compassionate', 'The Gentle'],
    'The Builder': ['The Achiever', 'The Persistent', 'The Practical'],
  };
  
  const names = archetypeNames[archetypeName as keyof typeof archetypeNames] || [archetypeName];
  return names[Math.floor(Math.random() * names.length)];
}

function getRelevantFigures(archetypeName: string, figures: string[]): string[] {
  const archetype = VOICE_ARCHETYPES[archetypeName as keyof typeof VOICE_ARCHETYPES];
  
  // Find user's figures that match this archetype
  const relevantFigures = figures.filter(figure => 
    archetype.sampleFigures.some(sample => 
      figure.toLowerCase().includes(sample.toLowerCase()) || 
      sample.toLowerCase().includes(figure.toLowerCase())
    )
  );
  
  // If no matches, use archetype's sample figures
  if (relevantFigures.length === 0) {
    return archetype.sampleFigures.slice(0, 2);
  }
  
  return relevantFigures.slice(0, 3);
}

function generateSampleLines(archetypeName: string, answers: OnboardingAnswers): string[] {
  const samples = {
    'The Strategist': [
      "What's the long-term pattern here? Let's zoom out and see the bigger system.",
      "Before we act, what are the three possible outcomes and their probabilities?",
    ],
    'The Mentor': [
      "I hear the wisdom in your struggle. What would you tell a friend in this situation?",
      "You've overcome challenges before. What strength can you draw from that experience?",
    ],
    'The Warrior': [
      "Discipline equals freedom. What's the one thing you can control right now?",
      "Stop negotiating with yourself. You know what needs to be done.",
    ],
    'The Creator': [
      "What if this constraint is actually the key to your breakthrough?",
      "Your unique perspective is your superpower. How can you express it here?",
    ],
    'The Philosopher': [
      "What question are you not asking yourself? The answer might be there.",
      "Meaning emerges from how we respond to what we cannot change.",
    ],
    'The Healer': [
      "Your feelings are valid. What does your body need right now?",
      "Healing isn't linear. Can you offer yourself the same compassion you'd give a friend?",
    ],
    'The Builder': [
      "Progress over perfection. What's the smallest step you can take today?",
      "Every expert was once a beginner. Focus on the process, not the outcome.",
    ],
  };
  
  return samples[archetypeName as keyof typeof samples] || [
    "Let's think about this together.",
    "What feels most important to you right now?",
  ];
}

function generateWelcomeMessage(answers: OnboardingAnswers, voices: Voice[]): string {
  const userName = answers.coreIdentity?.selfDescription?.split(',')[0] || 'friend';
  const voiceNames = voices.map(v => v.name).join(', ');
  
  return `Welcome, ${userName}. Your personal council is ready: ${voiceNames}. We're here to support your journey with perspectives tuned to your values and goals. What's on your mind?`;
}

export async function generateActivationCodeForProfile(profileId: string, userEmail: string, createdBy: string) {
  const code = generateActivationCode();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days
  
  return {
    code,
    userEmail,
    profileId,
    createdBy,
    expiresAt: expiresAt.toISOString(),
    isRedeemed: false,
  };
}
