# Pentara Mobile App

The Pentara mobile app provides users with access to their personal advisory council through a native iOS and Android experience.

## Features

- **Activation Flow**: Secure activation using codes from onboarding sessions
- **Chat Interface**: Real-time conversations with your 5-voice council
- **Journal**: Save and organize meaningful conversations
- **Profile Management**: View your personal manual and council members
- **Crisis Resources**: Quick access to emergency support resources
- **Offline Support**: Local data storage with SQLite
- **Privacy First**: All chat data stays on device

## Tech Stack

- **Expo**: Cross-platform development framework
- **React Native**: Native mobile app development
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation and routing
- **Expo SQLite**: Local data storage
- **Expo SecureStore**: Secure credential storage

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   └── LoadingSpinner.tsx
├── screens/            # App screens
│   ├── ActivationScreen.tsx
│   ├── MainTabsScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ChatScreen.tsx
│   ├── JournalScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SettingsScreen.tsx
│   └── ResourcesScreen.tsx
├── services/           # API and data services
│   └── api.ts
└── types/              # TypeScript type definitions
    ├── index.ts
    └── navigation.ts
```

## Key Features

### Activation System
- Users enter activation codes from their onboarding session
- Secure profile download and local storage
- Automatic navigation to main app after activation

### Chat Interface
- Real-time communication with 5-voice council
- Voice-specific responses with avatars
- Council synthesis with actionable next steps
- Save meaningful responses to journal

### Journal System
- Local storage of saved conversations
- Tag-based organization
- Export functionality (planned)
- Privacy-focused data management

### Crisis Resources
- Quick access to emergency support
- One-tap calling for crisis hotlines
- 24/7 availability indicators
- Clear disclaimers about app limitations

## Development Notes

### State Management
- Local state with React hooks
- SQLite for persistent data
- SecureStore for sensitive information

### Navigation
- Stack navigation for main flow
- Bottom tabs for primary sections
- Modal presentations for secondary actions

### Styling
- Consistent design system
- Dark theme throughout
- Accessibility considerations
- Responsive layouts

### Security
- No chat data sent to servers
- Local encryption for sensitive data
- Secure credential storage
- Privacy-first architecture

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## Testing

Run the type checker:
```bash
npm run type-check
```

Run the linter:
```bash
npm run lint
```

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new features
3. Test on both iOS and Android
4. Ensure accessibility compliance
5. Update documentation as needed

## Support

For technical issues or questions, please refer to the main project documentation or contact the development team.
