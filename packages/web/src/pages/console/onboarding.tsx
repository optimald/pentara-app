import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import ConsoleLayout from '../../components/Console/ConsoleLayout';

// Simplified type for the onboarding answers
interface OnboardingAnswers {
  'self-description'?: string;
  'strengths'?: string;
  'weaknesses'?: string;
  'values'?: string;
  'goals'?: string;
  'role-models'?: string;
  'qualities-admired'?: string;
}

export default function OnboardingQuestionnaire() {
  const sections = [
    {
      id: 'core-identity',
      title: 'Core Identity',
      description: 'Tell us about yourself and your current situation',
      questions: [
        {
          id: 'self-description',
          label: 'How would you describe yourself in 2-3 sentences?',
          type: 'textarea',
          placeholder: 'I am...'
        },
        {
          id: 'strengths',
          label: 'What are your top 3 strengths?',
          type: 'textarea',
          placeholder: '1. ...\n2. ...\n3. ...'
        },
        {
          id: 'weaknesses',
          label: 'What are your main challenges or areas for growth?',
          type: 'textarea',
          placeholder: 'I struggle with...'
        }
      ]
    },
    {
      id: 'drivers-values',
      title: 'Drivers & Values',
      description: 'What motivates you and what do you value most?',
      questions: [
        {
          id: 'values',
          label: 'What are your top 3 core values?',
          type: 'textarea',
          placeholder: '1. ...\n2. ...\n3. ...'
        },
        {
          id: 'goals',
          label: 'What are your main goals right now?',
          type: 'textarea',
          placeholder: 'I want to...'
        }
      ]
    },
    {
      id: 'inspirations',
      title: 'Inspirations',
      description: 'Who inspires you and why?',
      questions: [
        {
          id: 'role-models',
          label: 'Name 3-5 people who inspire you (can be public figures, authors, mentors, etc.)',
          type: 'textarea',
          placeholder: '1. [Name] - because...\n2. [Name] - because...\n3. [Name] - because...'
        },
        {
          id: 'qualities-admired',
          label: 'What qualities do you admire most in others?',
          type: 'textarea',
          placeholder: 'I admire people who are...'
        }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>New Onboarding - Pentara Console</title>
        <meta name="description" content="Start a new user onboarding session" />
      </Head>

      <ConsoleLayout>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-secondary-900">
              New Onboarding Session
            </h1>
            <p className="text-secondary-600">
              Guide the user through the questionnaire to create their personal council
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-secondary-700">
                Section <span id="current-section">1</span> of {sections.length}
              </span>
              <span className="text-sm text-secondary-500">
                <span id="progress-percent">33</span>% Complete
              </span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div
                id="progress-bar"
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '33%' }}
              />
            </div>
          </div>

          {/* Current Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-900 mb-2" id="section-title">
                {sections[0].title}
              </h2>
              <p className="text-secondary-600" id="section-description">
                {sections[0].description}
              </p>
            </div>

            <div className="space-y-6" id="questions-container">
              {sections[0].questions.map((question) => (
                <div key={question.id}>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    {question.label}
                  </label>
                  {question.type === 'textarea' ? (
                    <textarea
                      id={question.id}
                      rows={4}
                      className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder={question.placeholder}
                    />
                  ) : (
                    <input
                      id={question.id}
                      type="text"
                      className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder={question.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              id="prev-btn"
              disabled
              className="px-4 py-2 border border-secondary-300 rounded-md text-secondary-700 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-3">
              <button
                id="next-btn"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Next Section
              </button>
            </div>
          </div>

          {/* Preview of collected answers */}
          <div id="answers-preview" className="mt-8 bg-secondary-50 rounded-lg p-4 hidden">
            <h3 className="text-sm font-medium text-secondary-900 mb-2">
              Collected Information Preview
            </h3>
            <div id="answers-list" className="text-sm text-secondary-600 space-y-1">
            </div>
          </div>
        </div>
      </ConsoleLayout>

      {/* Client-side script for interactivity */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const sections = ${JSON.stringify(sections)};
              let currentSection = 0;
              const answers = {};
              
              const currentSectionEl = document.getElementById('current-section');
              const progressPercentEl = document.getElementById('progress-percent');
              const progressBarEl = document.getElementById('progress-bar');
              const sectionTitleEl = document.getElementById('section-title');
              const sectionDescriptionEl = document.getElementById('section-description');
              const questionsContainerEl = document.getElementById('questions-container');
              const prevBtn = document.getElementById('prev-btn');
              const nextBtn = document.getElementById('next-btn');
              const answersPreviewEl = document.getElementById('answers-preview');
              const answersListEl = document.getElementById('answers-list');
              
              function updateSection() {
                const section = sections[currentSection];
                const progress = ((currentSection + 1) / sections.length) * 100;
                
                currentSectionEl.textContent = currentSection + 1;
                progressPercentEl.textContent = Math.round(progress);
                progressBarEl.style.width = progress + '%';
                sectionTitleEl.textContent = section.title;
                sectionDescriptionEl.textContent = section.description;
                
                // Update questions
                questionsContainerEl.innerHTML = section.questions.map(question => \`
                  <div>
                    <label class="block text-sm font-medium text-secondary-700 mb-2">
                      \${question.label}
                    </label>
                    \${question.type === 'textarea' ? 
                      \`<textarea id="\${question.id}" rows="4" class="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="\${question.placeholder}"></textarea>\` :
                      \`<input id="\${question.id}" type="text" class="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="\${question.placeholder}">\`
                    }
                  </div>
                \`).join('');
                
                // Restore answers for this section
                section.questions.forEach(question => {
                  const element = document.getElementById(question.id);
                  if (element && answers[question.id]) {
                    element.value = answers[question.id];
                  }
                });
                
                // Update button states
                prevBtn.disabled = currentSection === 0;
                if (currentSection === sections.length - 1) {
                  nextBtn.textContent = 'Generate Profile';
                  nextBtn.className = 'px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700';
                } else {
                  nextBtn.textContent = 'Next Section';
                  nextBtn.className = 'px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700';
                }
                
                updateAnswersPreview();
              }
              
              function updateAnswersPreview() {
                // Collect all answers
                sections.forEach(section => {
                  section.questions.forEach(question => {
                    const element = document.getElementById(question.id);
                    if (element) {
                      answers[question.id] = element.value;
                    }
                  });
                });
                
                const hasAnswers = Object.values(answers).some(value => value && value.trim());
                
                if (hasAnswers) {
                  answersPreviewEl.classList.remove('hidden');
                  answersListEl.innerHTML = Object.entries(answers)
                    .filter(([key, value]) => value && value.trim())
                    .map(([key, value]) => \`
                      <div>
                        <strong>\${key}:</strong> \${value.toString().substring(0, 100)}\${value.toString().length > 100 ? '...' : ''}
                      </div>
                    \`).join('');
                } else {
                  answersPreviewEl.classList.add('hidden');
                }
              }
              
              // Event listeners
              prevBtn.addEventListener('click', () => {
                if (currentSection > 0) {
                  currentSection--;
                  updateSection();
                }
              });
              
              nextBtn.addEventListener('click', () => {
                if (currentSection < sections.length - 1) {
                  currentSection++;
                  updateSection();
                } else {
                  // Generate profile
                  nextBtn.textContent = 'Generating...';
                  nextBtn.disabled = true;
                  
                  setTimeout(() => {
                    nextBtn.textContent = 'Generate Profile';
                    nextBtn.disabled = false;
                    alert('Profile generation would happen here');
                  }, 2000);
                }
              });
              
              // Update answers preview when inputs change
              document.addEventListener('input', updateAnswersPreview);
              
              // Initialize
              updateSection();
            })();
          `
        }}
      />
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
