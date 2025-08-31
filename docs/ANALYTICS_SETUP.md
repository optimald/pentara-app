# Analytics Setup Guide

This guide will help you set up Google Analytics, Mixpanel, and Plausible Analytics for the Pentara application.

## Google Analytics Setup

### 1. Google Analytics 4 (GA4) Configuration
- **Tracking ID**: `G-67S63E3C14` (already configured)
- **Property**: Your GA4 property
- **Data Stream**: Web stream for your domain

### 2. Environment Variables
Add to your `.env.local` file:
```bash
NEXT_PUBLIC_GA_ID=G-67S63E3C14
```

## Mixpanel Setup

### 1. Get Your Project Token
1. Go to [Mixpanel](https://mixpanel.com) and sign in
2. Navigate to your project (or create a new one)
3. Go to **Project Settings** → **Project Token**
4. Copy the token (starts with something like `1234567890abcdef`)

## Plausible Analytics Setup

### 1. Domain Configuration
- **Domain**: `pentara` (already configured in script)
- **Features Enabled**: File downloads, hash tracking, outbound links, pageview props, revenue tracking, tagged events

### 2. No Additional Configuration Required
Plausible Analytics is automatically configured and will start tracking immediately upon deployment.

### 2. Environment Variables
Add to your `.env.local` file:
```bash
NEXT_PUBLIC_MIXPANEL_TOKEN=your_actual_mixpanel_token_here
```

### 3. Project Access
If you're trying to access project ID `3837305` but don't have permission:
- Contact the project owner to grant you access
- Or create your own new project and use that token instead

## Implementation Details

### What's Already Set Up
✅ **Google Analytics Script** - Added to `_document.tsx`
✅ **Mixpanel Integration** - Configured with token
✅ **Plausible Analytics Script** - Added to `_document.tsx`
✅ **Analytics Library** - Created `src/lib/analytics.ts`
✅ **Tracking Hook** - Created `src/hooks/useAnalytics.ts`
✅ **Auto-initialization** - Added to `_app.tsx`

### Available Tracking Functions
```typescript
// Page views (automatic)
useAnalytics().trackPageView('Page Name');

// Custom events
useAnalytics().trackEvent('Button Clicked', { button: 'signup' });

// User identification
useAnalytics().identifyUser('user123', { plan: 'premium' });

// Conversions
useAnalytics().trackConversion('signup', 99.99);

// Engagement
useAnalytics().trackEngagement('form_submit', { form: 'contact' });

// Plausible-specific events
useAnalytics().trackPlausible('Custom Event', { category: 'feature' });

// Track across all platforms
useAnalytics().trackCustomEvent('User Action', { action: 'click' });

### Example Usage in Components
```typescript
import { useAnalytics } from '../hooks/useAnalytics';

export default function SignupButton() {
  const { trackEvent } = useAnalytics();
  
  const handleClick = () => {
    trackEvent('Signup Button Clicked', {
      location: 'hero_section',
      button_text: 'Get Started'
    });
  };
  
  return <button onClick={handleClick}>Get Started</button>;
}
```

## Testing

### 1. Local Development
1. Create `.env.local` with your tokens
2. Run `npm run dev`
3. Check browser console for analytics initialization
4. Navigate between pages to test page view tracking

### 2. Production Verification
1. Deploy to Vercel
2. Check Google Analytics Real-Time reports
3. Check Mixpanel Live View
4. Verify events are being tracked

## Troubleshooting

### Common Issues
- **Analytics not loading**: Check environment variables are set correctly
- **Events not firing**: Ensure you're calling tracking functions
- **Mixpanel errors**: Verify token is correct and project exists

### Debug Mode
Mixpanel debug mode is automatically enabled in development:
```typescript
debug: process.env.NODE_ENV === 'development'
```

## Next Steps

1. **Get your Mixpanel token** from your project settings
2. **Create `.env.local`** with your actual tokens
3. **Test locally** to ensure tracking works
4. **Deploy and verify** production tracking
5. **Set up custom events** for key user actions

## Support

- **Google Analytics**: [GA4 Help Center](https://support.google.com/analytics/answer/10089681)
- **Mixpanel**: [Mixpanel Documentation](https://developer.mixpanel.com/)
- **Project Issues**: Check the project repository for specific implementation questions
