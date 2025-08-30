import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';
import { OnboardingAnswers } from '@pentara/shared';

export default function OnboardingQuestionnaire() {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const sections = [
    {
      title: "Core Identity",
      description: "Understanding the user's self-perception and core traits",
      fields: [
        {
          key: 'coreIdentity.selfDescription',
          label: 'How would you describe yourself in one line?',
          type: 'text',
          placeholder: 'e.g., "Sensitive tactician, builder, operator."',
          required: true,
        },
        {
          key: 'coreIdentity.strengths',
          label: 'What makes you powerful when you\'re at your best?',
          type: 'textarea',
          placeholder: 'Short traits, strengths',
          required: true,
        },
        {
          key: 'coreIdentity.weaknesses',
          label: 'What consistently drains or derails you?',
          type: 'textarea',
          placeholder: 'Weak points, triggers, vulnerabilities',
          required: true,
        },
      ],
    },
    {
      title: "Drivers & Values",
      description: "Core motivations and relationship values",
      fields: [
        {
          key: 'driversValues.topDrivers',
          label: 'Rank your top 3 drivers',
          type: 'multiselect',
          options: ['Autonomy', 'Clarity', 'Respect', 'Momentum', 'Efficiency', 'Other'],
          maxSelections: 3,
          required: true,
        },
        {
          key: 'driversValues.relationshipValues',
          label: 'What do you value most in relationships (business/romantic/friends)?',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      title: "Environmental Needs",
      description: "Understanding optimal and problematic environments",
      fields: [
        {
          key: 'environmentalNeeds.thriveEnvironment',
          label: 'What kind of environment lets you thrive?',
          type: 'textarea',
          placeholder: 'Noise level, space, tools, aesthetics',
          required: true,
        },
        {
          key: 'environmentalNeeds.avoidEnvironment',
          label: 'What do you avoid at all costs?',
          type: 'textarea',
          placeholder: 'Environments, tools, behaviors, energy',
          required: true,
        },
      ],
    },
    {
      title: "Positive Traits",
      description: "Strengths and superpowers",
      fields: [
        {
          key: 'positiveTraits.admiredFor',
          label: 'What do others consistently admire or rely on you for?',
          type: 'textarea',
          placeholder: 'Free text, strengths',
          required: true,
        },
        {
          key: 'positiveTraits.superpower',
          label: 'What do you think is your "superpower"?',
          type: 'text',
          placeholder: 'e.g., pattern recognition, empathy, discipline',
          required: true,
        },
      ],
    },
    {
      title: "Negative Traits",
      description: "Breakdown patterns and stress responses",
      fields: [
        {
          key: 'negativeTraits.breakdownPattern',
          label: 'When you break down, what does it usually look like?',
          type: 'textarea',
          placeholder: 'Patterns, spirals, coping mechanisms',
          required: true,
        },
        {
          key: 'negativeTraits.stressHabits',
          label: 'What are the habits you fall into when stressed?',
          type: 'textarea',
          placeholder: 'Ghosting, resets, impatience, etc.',
          required: true,
        },
        {
          key: 'negativeTraits.preferredResponse',
          label: 'How do you want the voices to respond when you\'re in that state?',
          type: 'multiselect',
          options: ['Gentle', 'Direct', 'Tactical', 'Supportive', 'Challenging'],
          required: true,
        },
      ],
    },
    {
      title: "Reset Protocol",
      description: "Recovery and momentum strategies",
      fields: [
        {
          key: 'resetProtocol.resetActions',
          label: 'What are 3 simple actions that reliably reset you?',
          type: 'array',
          placeholder: 'Walk, music, workout, hydration',
          maxItems: 3,
          required: true,
        },
        {
          key: 'resetProtocol.momentumReminder',
          label: 'What do you want the voices to remind you when you lose momentum?',
          type: 'text',
          placeholder: 'Short mantra/phrase',
          required: true,
        },
      ],
    },
    {
      title: "Inspirations",
      description: "Figures and qualities that inspire the user",
      fields: [
        {
          key: 'inspirations.figures',
          label: 'Name up to 8–12 figures that inspire you',
          type: 'array',
          placeholder: 'Authors, leaders, movie characters, mentors, archetypes',
          maxItems: 12,
          required: true,
        },
        {
          key: 'inspirations.qualities',
          label: 'What qualities do you admire in them?',
          type: 'array',
          placeholder: 'e.g., discipline, creativity, ruthlessness, humor',
          required: true,
        },
        {
          key: 'inspirations.desiredArchetypes',
          label: 'If you had to pick five voices to guide you, which qualities/archetypes do you want them to represent?',
          type: 'textarea',
          placeholder: 'Coach uses this to map into the council',
          required: true,
        },
      ],
    },
    {
      title: "Relationship Dynamics",
      description: "Trust and support preferences",
      fields: [
        {
          key: 'relationshipDynamics.trustLosers',
          label: 'What instantly loses your trust/respect?',
          type: 'textarea',
          required: true,
        },
        {
          key: 'relationshipDynamics.supportBehaviors',
          label: 'What behavior makes you feel supported and seen?',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      title: "Belief Shifts",
      description: "Old patterns to new empowering beliefs",
      fields: [
        {
          key: 'beliefShifts.oldBelief',
          label: 'What old belief holds you back?',
          type: 'text',
          placeholder: 'e.g., "If the routine breaks, I collapse."',
          required: true,
        },
        {
          key: 'beliefShifts.newBelief',
          label: 'Rewrite it into a new belief you want the voices to reinforce',
          type: 'text',
          placeholder: 'e.g., "I carry the routine with me."',
          required: true,
        },
        {
          key: 'beliefShifts.mantras',
          label: 'Any mantras or reminders you want Pentara to echo back to you?',
          type: 'array',
          required: false,
        },
      ],
    },
    {
      title: "Final Instructions",
      description: "Power conditions and future self wisdom",
      fields: [
        {
          key: 'finalInstructions.powerConditions',
          label: 'What conditions make you most powerful?',
          type: 'textarea',
          required: true,
        },
        {
          key: 'finalInstructions.futureSelftalk',
          label: 'If your future self could speak to you, what would they say?',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ];

  const updateAnswer = (key: string, value: any) => {
    const keys = key.split('.');
    setAnswers(prev => {
      const updated = { ...prev };
      let current = updated as any;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const getAnswer = (key: string) => {
    const keys = key.split('.');
    let current = answers as any;
    
    for (const k of keys) {
      if (!current || !current[k]) return '';
      current = current[k];
    }
    
    return current;
  };

  const renderField = (field: any) => {
    const value = getAnswer(field.key);
    
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => updateAnswer(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="mt-1 block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            required={field.required}
          />
        );
        
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => updateAnswer(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="mt-1 block w-full border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            required={field.required}
          />
        );
        
      case 'array':
        const arrayValue = Array.isArray(value) ? value : [];
        return (
          <div className="mt-1">
            {arrayValue.map((item: string, index: number) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newArray = [...arrayValue];
                    newArray[index] = e.target.value;
                    updateAnswer(field.key, newArray);
                  }}
                  placeholder={field.placeholder}
                  className="flex-1 border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newArray = arrayValue.filter((_, i) => i !== index);
                    updateAnswer(field.key, newArray);
                  }}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            {(!field.maxItems || arrayValue.length < field.maxItems) && (
              <button
                type="button"
                onClick={() => {
                  updateAnswer(field.key, [...arrayValue, '']);
                }}
                className="text-primary-600 hover:text-primary-800 text-sm"
              >
                + Add item
              </button>
            )}
          </div>
        );
        
      case 'multiselect':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="mt-1 space-y-2">
            {field.options.map((option: string) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={(e) => {
                    let newValues;
                    if (e.target.checked) {
                      newValues = [...selectedValues, option];
                      if (field.maxSelections && newValues.length > field.maxSelections) {
                        newValues = newValues.slice(-field.maxSelections);
                      }
                    } else {
                      newValues = selectedValues.filter((v: string) => v !== option);
                    }
                    updateAnswer(field.key, newValues);
                  }}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <span className="ml-2 text-sm text-secondary-900">{option}</span>
              </label>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  const handleGenerateProfile = async () => {
    setIsGenerating(true);
    try {
      // Get user email from the questionnaire
      const userEmail = prompt('Enter user email for activation code:');
      if (!userEmail) {
        alert('Email is required to generate profile');
        return;
      }

      const response = await fetch('/api/profiles/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          userEmail,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Profile generated successfully!\n\nActivation Code: ${result.activationCode.code}\n\nPlease save this code and send it to the user along with their Personal Manual.`);
        
        // TODO: Generate and download PDF
        // TODO: Send email with activation code
        
        // Reset form for next user
        setAnswers({});
        setCurrentSection(0);
      } else {
        throw new Error(result.error || 'Failed to generate profile');
      }
    } catch (error) {
      console.error('Error generating profile:', error);
      alert('Error generating profile. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const currentSectionData = sections[currentSection];
  const isLastSection = currentSection === sections.length - 1;

  return (
    <>
      <Head>
        <title>New Onboarding - Pentara Console</title>
        <meta name="description" content="Pentara onboarding questionnaire" />
      </Head>

      <ConsoleLayout>
        <div className="px-4 sm:px-0">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-serif font-bold text-secondary-900">
                New Onboarding Session
              </h1>
              <div className="text-sm text-secondary-600">
                Section {currentSection + 1} of {sections.length}
              </div>
            </div>
            
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                {currentSectionData.title}
              </h2>
              <p className="text-secondary-600 mt-1">
                {currentSectionData.description}
              </p>
            </div>

            <div className="space-y-6">
              {currentSectionData.fields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-secondary-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {isLastSection ? (
              <button
                onClick={handleGenerateProfile}
                disabled={isGenerating}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating Profile...' : 'Generate Profile & Code'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                className="btn-primary"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </ConsoleLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
