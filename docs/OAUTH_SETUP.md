# OAuth Provider Setup Guide

This guide explains how to set up Google and Facebook OAuth providers for Pentara authentication.

## Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API and Google OAuth2 API

### 2. Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type
3. Fill in required information:
   - App name: `Pentara`
   - User support email: `coach@pentara.app`
   - Developer contact: `coach@pentara.app`
4. Add scopes: `email`, `profile`, `openid`
5. Add test users if needed

### 3. Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Add authorized redirect URIs:
   - `https://nyeujmrehxtgqvgyioqu.supabase.co/auth/v1/callback`
   - `http://localhost:54321/auth/v1/callback` (for local development)
5. Copy the Client ID and Client Secret

### 4. Environment Variables

Add to your `.env.local`:
```bash
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## Facebook OAuth Setup

### 1. Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **Create App**
3. Choose **Consumer** app type
4. Fill in app details:
   - App name: `Pentara`
   - Contact email: `coach@pentara.app`

### 2. Configure Facebook Login

1. Add **Facebook Login** product to your app
2. Go to **Facebook Login** > **Settings**
3. Add Valid OAuth Redirect URIs:
   - `https://nyeujmrehxtgqvgyioqu.supabase.co/auth/v1/callback`
   - `http://localhost:54321/auth/v1/callback` (for local development)

### 3. Get App Credentials

1. Go to **Settings** > **Basic**
2. Copy the App ID and App Secret
3. Make sure the app is live (not in development mode)

### 4. Environment Variables

Add to your `.env.local`:
```bash
FACEBOOK_CLIENT_ID=your_facebook_app_id_here
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret_here
```

## Supabase Configuration

### 1. Update Supabase Auth Settings

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/nyeujmrehxtgqvgyioqu)
2. Navigate to **Authentication** > **Providers**
3. Enable Google and Facebook providers
4. Enter the respective Client IDs and Secrets

### 2. Configure Redirect URLs

In Supabase Auth settings, add these redirect URLs:
- `https://pentara-app-web-optimaldev.vercel.app/auth/callback`
- `http://localhost:3000/auth/callback`

## Vercel Environment Variables

Set these environment variables in Vercel for all environments:

```bash
# Production, Development, and Preview
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
FACEBOOK_CLIENT_ID=your_facebook_app_id_here
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret_here
```

Use the Vercel CLI:
```bash
vercel env add GOOGLE_CLIENT_ID production
vercel env add GOOGLE_CLIENT_SECRET production
vercel env add FACEBOOK_CLIENT_ID production
vercel env add FACEBOOK_CLIENT_SECRET production

# Repeat for development and preview environments
```

## Testing

### Local Development

1. Start Supabase locally: `supabase start`
2. Start Next.js: `npm run dev`
3. Visit `http://localhost:3000/auth/signin`
4. Test Google and Facebook login buttons

### Production

1. Deploy to Vercel with environment variables set
2. Test on production URL
3. Verify OAuth flows work correctly

## Security Notes

- Keep Client Secrets secure and never expose them in client-side code
- Use HTTPS in production for all OAuth redirects
- Regularly rotate OAuth credentials
- Monitor OAuth usage in provider dashboards
- Set up proper CORS policies

## Troubleshooting

### Common Issues

1. **Invalid redirect URI**: Ensure all redirect URLs are exactly configured in both provider and Supabase
2. **App not approved**: Make sure Facebook app is live and Google app is published
3. **Scope errors**: Verify required scopes are requested and approved
4. **Environment variables**: Double-check all environment variables are set correctly

### Debug Steps

1. Check browser network tab for OAuth requests
2. Verify Supabase logs for authentication errors
3. Check provider developer consoles for error logs
4. Test with different browsers and incognito mode

## Support

For additional help:
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/)
