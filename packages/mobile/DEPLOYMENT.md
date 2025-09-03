# Pentara Mobile App Deployment Guide

This guide covers deploying the Pentara mobile app to Expo.dev for testing and distribution.

## Prerequisites

1. **Expo Account**: Create an account at [expo.dev](https://expo.dev)
2. **EAS CLI**: Install the EAS CLI (already installed)
3. **Expo CLI**: Install Expo CLI (already available)

## Step 1: Login to Expo

```bash
# Login to your Expo account
eas login
```

## Step 2: Initialize EAS Project

```bash
# Initialize EAS configuration (if not already done)
eas build:configure
```

## Step 3: Create Expo Project

```bash
# Create a new project on Expo.dev
eas project:create
```

This will:
- Create a new project on Expo.dev
- Update your `app.json` with the correct project ID
- Set up the project for EAS builds

## Step 4: Build for Development

### Development Build (for testing)
```bash
# Build for development (includes development tools)
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Preview Build (for internal testing)
```bash
# Build for preview (simulator/emulator)
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

## Step 5: Build for Production

```bash
# Build for production
eas build --profile production --platform ios
eas build --profile production --platform android
```

## Step 6: Publish Updates

```bash
# Publish JavaScript bundle updates
eas update --branch production --message "Initial release"
```

## Step 7: Submit to App Stores

### iOS App Store
```bash
# Submit to App Store Connect
eas submit --platform ios
```

### Google Play Store
```bash
# Submit to Google Play Console
eas submit --platform android
```

## Configuration Files

### app.json
- Contains app metadata and configuration
- Includes EAS project ID and update URL
- Configured for both iOS and Android

### eas.json
- Defines build profiles (development, preview, production)
- Configures build settings for each platform
- Sets up submission settings for app stores

## Build Profiles Explained

### Development
- Includes development tools and debugging
- For internal testing and development
- Can be installed on physical devices

### Preview
- Optimized for simulator/emulator testing
- Good for QA and internal testing
- Faster build times

### Production
- Optimized for app store submission
- Includes production optimizations
- Ready for public distribution

## Environment Variables

Set up environment variables for different build profiles:

```bash
# Set environment variables
eas secret:create --scope project --name API_BASE_URL --value "https://your-api.vercel.app"
eas secret:create --scope project --name ENVIRONMENT --value "production"
```

## Monitoring and Analytics

### Build Status
- Monitor builds at [expo.dev](https://expo.dev)
- View build logs and status
- Download built apps

### Updates
- Track update deployments
- Monitor update adoption
- View update analytics

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   eas build:list
   eas build:view [BUILD_ID]
   ```

2. **Authentication Issues**
   ```bash
   # Re-login to Expo
   eas logout
   eas login
   ```

3. **Project Configuration**
   ```bash
   # Reconfigure project
   eas project:init
   ```

### Build Optimization

1. **Reduce Bundle Size**
   - Use dynamic imports
   - Optimize images
   - Remove unused dependencies

2. **Faster Builds**
   - Use build caching
   - Optimize dependencies
   - Use preview builds for testing

## Security Considerations

1. **API Keys**: Store sensitive keys as EAS secrets
2. **Environment Variables**: Use different values for dev/prod
3. **Code Signing**: EAS handles iOS code signing automatically
4. **App Signing**: EAS manages Android app signing

## Cost Considerations

- **EAS Build**: Free tier includes 30 builds/month
- **EAS Update**: Free tier includes 30 updates/month
- **Storage**: Free tier includes 1GB storage

## Next Steps

1. **Test the app** using development builds
2. **Gather feedback** from internal testers
3. **Iterate and improve** based on feedback
4. **Submit to app stores** when ready
5. **Monitor performance** and user feedback

## Useful Commands

```bash
# Check project status
eas project:info

# View all builds
eas build:list

# View all updates
eas update:list

# Check EAS CLI version
eas --version

# Get help
eas --help
```

## Support

- **Expo Documentation**: [docs.expo.dev](https://docs.expo.dev)
- **EAS Documentation**: [docs.expo.dev/eas](https://docs.expo.dev/eas)
- **Community**: [forums.expo.dev](https://forums.expo.dev)
- **Discord**: [discord.gg/expo](https://discord.gg/expo)
