# Pentara Build Checklist

**Status Legend:**
- ✅ **DONE** - Completed
- 🚧 **IN_PROGRESS** - Currently working on
- ⏳ **PENDING** - Ready to start
- ❌ **BLOCKED** - Waiting on dependencies
- 🔄 **REVIEW** - Needs testing/review

---

## Phase 0: Project Setup & Foundation

### Repository & Infrastructure
- ✅ Initialize Git repository with proper .gitignore
- ✅ Create monorepo structure with workspaces
- ✅ Set up GitHub repository (https://github.com/optimald/pentara-app)
- ✅ Configure Vercel integration for web deployment
- ✅ Create package.json files for all packages
- ✅ Set up shared TypeScript types and utilities
- ✅ Document Calendly integration (https://calendly.com/optimaldev/pentara-onboarding)
- ✅ Create environment variable templates

### Development Environment
- ✅ Install all dependencies (`npm run install:all`)
- ✅ Verify Next.js dev server runs (`npm run dev:web`)
- ⏳ Verify Expo dev server runs (`npm run dev:mobile`)
- ⏳ Verify Vercel dev server runs (`npm run dev:api`)
- ⏳ Set up ESLint and Prettier configurations
- ⏳ Configure TypeScript strict mode across packages

---

## Week 1: Landing Page + Calendly Integration

### Landing Page Structure
- ✅ Create Next.js pages structure in `packages/web/src/pages/`
- ✅ Set up Tailwind CSS configuration and base styles
- ✅ Create layout components (Header, Footer, Navigation)
- ✅ Implement responsive design system and component library

### Hero Section
- ✅ Design and implement hero section with main tagline
- ✅ Add "Five voices. One circle. Clarity on demand." headline
- ✅ Create compelling sub-headline about personal council
- ✅ Design primary CTA button for Calendly booking
- ✅ Add hero background/visual elements
- ✅ Implement mobile-responsive hero layout

### How It Works Section
- ✅ Create 3-step process visualization
- ✅ Step 1: "Book a 45-minute onboarding ($150)"
- ✅ Step 2: "We craft your Personal Manual and five voices together"
- ✅ Step 3: "Use Pentara anytime. Private, on your device."
- ✅ Add icons/illustrations for each step
- ✅ Link Step 1 to Calendly booking page

### Legal & Compliance
- ✅ Create "Not therapy" disclaimer section
- ✅ Add crisis resources link and contact information
- ✅ Implement FAQ section addressing common questions
- ✅ Create privacy policy page
- ⏳ Add terms of service page
- ✅ Ensure App Store compliance language

### Calendly Integration
- ✅ Implement direct link integration to booking page
- ⏳ Test booking flow end-to-end
- ⏳ Add tracking/analytics for booking conversions
- ⏳ Create confirmation page for post-booking experience
- ⏳ Set up email templates for booking confirmations

### SEO & Performance
- ✅ Add proper meta tags and OpenGraph data
- ✅ Implement structured data markup
- ⏳ Optimize images and assets for web performance
- ⏳ Set up Google Analytics or similar tracking
- ⏳ Test Core Web Vitals and performance metrics

---

## Week 2: Coach Console MVP

### Authentication System
- ✅ Set up NextAuth.js for coach authentication
- ✅ Implement magic link login for coaches
- ⏳ Create admin panel for managing coach accounts
- ✅ Add role-based access control (admin vs coach)
- ✅ Implement session management and security

### Console Interface
- ✅ Create coach dashboard layout and navigation
- ✅ Build questionnaire interface based on ONBOARDING_QUESTIONS.md
- ⏳ Implement form validation and error handling
- ✅ Add progress tracking through questionnaire sections
- ⏳ Create save/resume functionality for partial sessions

### Questionnaire Implementation
- ✅ Section 1: Core Identity (self-description, strengths, weaknesses)
- ✅ Section 2: Drivers & Values (ranking system, relationship values)
- ✅ Section 3: Environmental Needs (thrive/avoid environments)
- ✅ Section 4: Positive Traits (admired qualities, superpower)
- ✅ Section 5: Negative Traits (breakdown patterns, stress responses)
- ✅ Section 6: Reset Protocol (reset actions, momentum reminders)
- ✅ Section 7: Inspirations (8-12 figures, qualities, archetypes)
- ✅ Section 8: Relationship Dynamics (trust/respect factors)
- ✅ Section 9: Belief Shifts (old vs new beliefs, mantras)
- ✅ Section 10: Final Instructions (power conditions, future self)

### Profile Generation
- ✅ Build Personal Manual generator from questionnaire data
- ✅ Implement Five-Voice Profile creation algorithm
- ✅ Create voice archetype mapping system
- ✅ Generate sample voice responses for preview
- ⏳ Add manual editing/refinement interface
- ⏳ Implement profile validation and quality checks

### Activation Code System
- ✅ Create activation code generation (PNR-8X2-K7 format)
- ✅ Implement code validation and expiration logic
- ⏳ Build code management interface for coaches
- ⏳ Add email delivery system for codes
- ⏳ Create code redemption tracking

### PDF Generation
- ✅ Set up PDF generation library (puppeteer/jsPDF)
- ✅ Design Personal Manual PDF template
- ✅ Implement dynamic PDF generation from profile data
- ⏳ Add PDF download and email delivery
- ⏳ Test PDF generation across different profile types

---

## Week 3: API Orchestrator & LLM Integration

### Vercel Functions Setup
- ⏳ Create Vercel function structure in `packages/api/src/functions/`
- ⏳ Set up OpenAI API integration and error handling
- ⏳ Implement environment variable management
- ⏳ Add CORS configuration for web and mobile clients
- ⏳ Set up request/response logging (without chat storage)

### Core API Endpoints
- ⏳ `POST /api/activate` - Validate code, return encrypted profile
- ⏳ `POST /api/chat` - 5-voice fan-out + synthesis endpoint
- ⏳ `POST /api/usage` - Anonymous usage counter increment
- ⏳ `POST /api/swap-request` - Voice swap request to coach
- ⏳ Add comprehensive input validation with Zod schemas

### Five-Voice Orchestrator
- ⏳ Implement parallel LLM calls (5 simultaneous requests)
- ⏳ Create voice-specific system prompts with token caps
- ⏳ Add Personal Manual context injection per voice
- ⏳ Implement response validation and token counting
- ⏳ Add fallback handling for failed voice responses

### Synthesis Generation
- ⏳ Create synthesis prompt combining 5 voice responses
- ⏳ Generate 3 actionable next steps from responses
- ⏳ Add reassurance message generation
- ⏳ Implement synthesis token cap (<120 tokens)
- ⏳ Test synthesis quality across different prompt types

### Security & Rate Limiting
- ⏳ Implement JWT token generation and validation
- ⏳ Add rate limiting per user (50 turns/day)
- ⏳ Set up request authentication middleware
- ⏳ Implement CORS security for production
- ⏳ Add input sanitization and validation

### Database Integration
- ⏳ Set up database schema (users, profiles, activation_codes, usage_counters)
- ⏳ Implement database connection and ORM setup
- ⏳ Create user management functions
- ⏳ Add profile storage with encryption at rest
- ⏳ Implement usage tracking without chat logs

### Cost Control & Monitoring
- ⏳ Implement token counting and cost tracking
- ⏳ Add OpenAI API usage monitoring
- ⏳ Set up alerts for high usage/costs
- ⏳ Create cost per user analytics
- ⏳ Test token cap enforcement

---

## Week 4: Mobile App Shell (Expo React Native)

### Expo Setup & Configuration
- ⏳ Initialize Expo project with TypeScript
- ⏳ Configure app.json with proper metadata
- ⏳ Set up navigation structure with React Navigation
- ⏳ Configure SQLite for local storage
- ⏳ Set up SecureStore for sensitive data
- ⏳ Add push notification configuration

### Screen Structure
- ⏳ Create activation screen with code input
- ⏳ Build main chat interface with voice cards
- ⏳ Implement daily check-in screen with mood slider
- ⏳ Create journal/history screen with local data
- ⏳ Build voice profile viewing screen
- ⏳ Add settings screen with data management
- ⏳ Create resources/legal screen with crisis links

### Activation Flow
- ⏳ Design activation code input interface
- ⏳ Implement code validation and API integration
- ⏳ Add profile download and local encryption
- ⏳ Create welcome screen after successful activation
- ⏳ Handle activation errors and edge cases
- ⏳ Test activation flow end-to-end

### Chat Interface
- ⏳ Build prompt input with character limits
- ⏳ Create 5 voice response cards with avatars
- ⏳ Implement synthesis card with next steps
- ⏳ Add "Add to Journal" functionality
- ⏳ Create loading states for API calls
- ⏳ Implement offline handling and retry logic

### Local Data Management
- ⏳ Set up SQLite schema for chat threads and messages
- ⏳ Implement local chat storage and retrieval
- ⏳ Add data encryption for sensitive information
- ⏳ Create export functionality (Markdown format)
- ⏳ Implement data deletion and privacy controls
- ⏳ Test data persistence across app updates

### UI/UX Design
- ⏳ Create consistent design system and components
- ⏳ Implement dark/light mode support
- ⏳ Add accessibility features and screen reader support
- ⏳ Design intuitive navigation and user flows
- ⏳ Create loading and error state designs
- ⏳ Test usability across different screen sizes

---

## Week 5: Privacy Polish & Crisis Resources

### Privacy Implementation
- ⏳ Audit all data flows for privacy compliance
- ⏳ Implement end-to-end encryption for profiles
- ⏳ Add data deletion capabilities
- ⏳ Create privacy policy implementation
- ⏳ Test that no chat data reaches servers
- ⏳ Implement local data backup/restore

### Crisis Resources Integration
- ⏳ Research and compile crisis hotline numbers
- ⏳ Create crisis resources screen (within 2 taps)
- ⏳ Add emergency contact functionality
- ⏳ Implement crisis detection in prompts (basic)
- ⏳ Create clear escalation paths
- ⏳ Test crisis resource accessibility

### Legal Compliance
- ⏳ Add "Not therapy" disclaimers throughout app
- ⏳ Implement terms of service acceptance
- ⏳ Create data processing consent flows
- ⏳ Add medical advice prevention in prompts
- ⏳ Test App Store compliance requirements
- ⏳ Review all user-facing copy for legal compliance

### Token Cap Enforcement
- ⏳ Implement strict 140-token caps per voice
- ⏳ Add token counting validation
- ⏳ Test response truncation handling
- ⏳ Monitor token usage across different prompts
- ⏳ Optimize prompts for token efficiency
- ⏳ Create token usage analytics

### Security Hardening
- ⏳ Implement certificate pinning for API calls
- ⏳ Add request signing and validation
- ⏳ Secure local storage encryption keys
- ⏳ Test against common security vulnerabilities
- ⏳ Implement secure session management
- ⏳ Add security headers and HTTPS enforcement

---

## Week 6: Testing & Quality Assurance

### End-to-End Testing
- ⏳ Test complete user journey (landing → booking → onboarding → app)
- ⏳ Conduct 10 real onboarding sessions with test users
- ⏳ Measure session completion rates and user feedback
- ⏳ Test activation code generation and redemption
- ⏳ Validate profile quality across different user types
- ⏳ Test mobile app performance on various devices

### Cost & Performance Analysis
- ⏳ Measure actual cost per turn with real usage
- ⏳ Analyze token usage patterns and optimization opportunities
- ⏳ Test API response times under load
- ⏳ Monitor database performance and query optimization
- ⏳ Measure mobile app battery and data usage
- ⏳ Create cost projections for 50 users/month

### Bug Fixes & Polish
- ⏳ Fix all critical and high-priority bugs
- ⏳ Polish UI/UX based on user feedback
- ⏳ Optimize performance bottlenecks
- ⏳ Improve error messages and user guidance
- ⏳ Test edge cases and error scenarios
- ⏳ Validate accessibility compliance

### Prompt Tuning
- ⏳ Refine voice prompts based on real conversations
- ⏳ Optimize synthesis quality and relevance
- ⏳ Test prompt variations for different user types
- ⏳ Ensure consistent voice personalities
- ⏳ Validate token efficiency of prompts
- ⏳ Create prompt version control system

### Documentation & Training
- ⏳ Create coach training materials
- ⏳ Document troubleshooting procedures
- ⏳ Create user onboarding guides
- ⏳ Write technical documentation for maintenance
- ⏳ Create FAQ based on test user questions
- ⏳ Document known issues and workarounds

---

## Week 7: App Store Submission

### iOS App Store Preparation
- ⏳ Create App Store Connect account and app listing
- ⏳ Generate production build with proper certificates
- ⏳ Create app screenshots for all required device sizes
- ⏳ Write App Store description emphasizing "self-coaching tool"
- ⏳ Add privacy policy and terms of service links
- ⏳ Submit for App Store review
- ⏳ Respond to review feedback if needed

### Google Play Store Preparation
- ⏳ Create Google Play Console account and app listing
- ⏳ Generate signed APK/AAB for production
- ⏳ Create Play Store screenshots and graphics
- ⏳ Write Play Store description with compliance language
- ⏳ Complete Play Store content rating questionnaire
- ⏳ Submit for Play Store review
- ⏳ Address any policy violations

### Production Deployment
- ⏳ Deploy web application to production Vercel
- ⏳ Configure production environment variables
- ⏳ Set up production database and backups
- ⏳ Configure monitoring and alerting
- ⏳ Test production API endpoints
- ⏳ Set up error tracking and logging

### Launch Preparation
- ⏳ Create launch marketing materials
- ⏳ Set up analytics and conversion tracking
- ⏳ Prepare customer support processes
- ⏳ Create user onboarding email sequences
- ⏳ Set up feedback collection systems
- ⏳ Plan soft launch with limited users

---

## Week 8+: Ongoing Operations

### Scaling to 50 Onboardings/Month
- ⏳ Monitor coach capacity (12 sessions/week per coach)
- ⏳ Recruit and train additional coaches if needed
- ⏳ Optimize onboarding session efficiency
- ⏳ Track conversion rates from landing to booking
- ⏳ Monitor user retention and engagement
- ⏳ Scale infrastructure based on usage

### Monitoring & Analytics
- ⏳ Set up user behavior analytics
- ⏳ Monitor API performance and costs
- ⏳ Track activation rates and user onboarding
- ⏳ Measure voice response quality
- ⏳ Monitor crisis resource usage
- ⏳ Create operational dashboards

### Customer Support
- ⏳ Set up support ticket system
- ⏳ Create support documentation and FAQs
- ⏳ Train support team on app functionality
- ⏳ Monitor user feedback and feature requests
- ⏳ Handle activation code issues
- ⏳ Manage voice swap requests

### Continuous Improvement
- ⏳ Collect and analyze user feedback
- ⏳ A/B test landing page improvements
- ⏳ Optimize voice prompts based on usage
- ⏳ Improve onboarding conversion rates
- ⏳ Plan feature roadmap for v2
- ⏳ Monitor competitive landscape

### Business Operations
- ⏳ Track revenue and unit economics
- ⏳ Monitor customer acquisition costs
- ⏳ Analyze lifetime value metrics
- ⏳ Plan marketing and growth strategies
- ⏳ Manage coach scheduling and capacity
- ⏳ Handle refunds and customer issues

---

## Success Metrics

### Technical KPIs
- ⏳ API response time < 3 seconds for 5-voice calls
- ⏳ Mobile app crash rate < 1%
- ⏳ Activation success rate > 95%
- ⏳ Cost per turn < $0.50
- ⏳ Uptime > 99.5%

### Business KPIs
- ⏳ Landing page conversion rate > 2%
- ⏳ Onboarding completion rate > 90%
- ⏳ User activation rate > 80%
- ⏳ Monthly active users growth
- ⏳ Customer satisfaction > 4.5/5

### Privacy & Compliance
- ⏳ Zero server-side chat storage incidents
- ⏳ App Store compliance maintained
- ⏳ Crisis resource accessibility verified
- ⏳ Privacy policy compliance audited
- ⏳ Legal disclaimer effectiveness measured

---

**Total Estimated Tasks: 200+**
**Completed: 13** ✅
**Remaining: 187+** ⏳

This checklist provides a comprehensive roadmap for building Pentara according to the SPEC requirements, with detailed tasks for each week and ongoing operations.
