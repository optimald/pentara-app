# Pentara App

> Five voices. One circle. Clarity on demand.

A private self-coaching app with five "inspired-by" voices. One-time onboarding to tailor the council to you. After that, it's your private space. Not therapy.

## Project Structure

This is a monorepo containing all Pentara components:

```
pentara-app/
├── packages/
│   ├── web/          # Next.js landing page + coach console
│   ├── mobile/       # Expo React Native app (iOS/Android)
│   ├── api/          # Thin orchestrator API (Vercel functions)
│   └── shared/       # Shared types and utilities
├── SPEC.md           # Complete product specification
└── ONBOARDING_QUESTIONS.md  # Coach questionnaire guide
```

## Architecture Overview

### Web (`packages/web`)
- **Landing page**: Hero, pricing, [Calendly booking](https://calendly.com/optimaldev/pentara-onboarding)
- **Coach console**: Questionnaire interface, profile generation
- **Tech**: Next.js 14, TypeScript, Tailwind CSS
- **Deploy**: Vercel

### Mobile (`packages/mobile`)
- **Chat interface**: 5 voice responses + synthesis
- **Local storage**: SQLite transcripts, SecureStore profiles
- **Tech**: Expo React Native, TypeScript
- **Deploy**: App Store & Google Play

### API (`packages/api`)
- **Orchestrator**: Fan out to 5 LLM calls, return synthesis
- **No chat storage**: Privacy-first architecture
- **Tech**: Vercel Functions, OpenAI API
- **Deploy**: Vercel

### Shared (`packages/shared`)
- **Types**: TypeScript interfaces for profiles, voices, etc.
- **Utilities**: Common validation and helper functions

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

```bash
# Install all dependencies
npm run install:all

# Or install individually
npm install              # Root dependencies
npm run install:web      # Web dependencies
npm run install:mobile   # Mobile dependencies
npm run install:api      # API dependencies
```

### Development

```bash
# Start all services
npm run dev:web     # Next.js dev server (http://localhost:3000)
npm run dev:mobile  # Expo dev server
npm run dev:api     # Vercel dev server (http://localhost:3001)

# Build for production
npm run build:web
npm run build:mobile
npm run build:api
```

## Key Features

### Privacy-First
- No server-side chat storage
- Transcripts live on device only
- Coach cannot read future chats after onboarding

### Simple Monetization
- $150 one-time onboarding via [Calendly booking](https://calendly.com/optimaldev/pentara-onboarding)
- No subscriptions or in-app purchases
- Free app after activation

### Lightweight Architecture
- 5 parallel LLM calls with token caps
- Local SQLite storage
- Minimal backend footprint

## Development Workflow

1. **Week 1**: Landing page + Calendly integration
2. **Week 2**: Coach console MVP
3. **Week 3**: API orchestrator with 5-call fan-out
4. **Week 4**: Mobile app shell (activate → chat → journal)
5. **Week 5**: Privacy polish, crisis resources
6. **Week 6**: Test with 10 onboardings
7. **Week 7**: App Store submission
8. **Ongoing**: Scale to 50 onboardings/month

## Environment Variables

### Web/API
```env
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXTAUTH_SECRET=your_auth_secret
DATABASE_URL=your_db_url
```

### Mobile
```env
EXPO_PUBLIC_API_URL=your_api_url
```

## Deployment

### Web + API
```bash
cd packages/web
vercel --prod
```

### Mobile
```bash
cd packages/mobile
expo build:ios
expo build:android
```

## Social Media & Community

- **Facebook**: [https://www.facebook.com/pentaraapp](https://www.facebook.com/pentaraapp)
- **Website**: pentara.app
- **Calendly Booking**: [https://calendly.com/optimaldev/pentara-onboarding](https://calendly.com/optimaldev/pentara-onboarding)

## Contributing

1. Follow the 8-week milestone plan in SPEC.md
2. Maintain privacy-first architecture
3. Keep token caps strict (140 tokens per voice)
4. Test with real onboarding sessions

## Legal & Safety

- Not therapy - self-coaching tool only
- Crisis resources within 2 taps
- No medical advice in prompts
- External payment for live onboarding service

---

For detailed specifications, see [SPEC.md](./SPEC.md)
For onboarding questions, see [ONBOARDING_QUESTIONS.md](./ONBOARDING_QUESTIONS.md)
