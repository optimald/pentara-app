#!/bin/bash

# Pentara Mobile App Deployment Script
# This script helps deploy the app to Expo.dev

echo "🚀 Pentara Mobile App Deployment"
echo "================================"

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

# Check if logged in to Expo
echo "🔐 Checking Expo login status..."
if ! eas whoami &> /dev/null; then
    echo "❌ Not logged in to Expo. Please log in:"
    echo "   Run: eas login"
    echo "   Then run this script again."
    exit 1
fi

echo "✅ Logged in to Expo as: $(eas whoami)"

# Initialize EAS project if needed
if [ ! -f "eas.json" ]; then
    echo "📝 Initializing EAS configuration..."
    eas build:configure
fi

# Create Expo project if needed
echo "🏗️  Setting up Expo project..."
eas project:create --non-interactive

# Build for development
echo "🔨 Building development version..."
echo "Choose platform:"
echo "1) iOS"
echo "2) Android" 
echo "3) Both"
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "📱 Building for iOS..."
        eas build --profile development --platform ios
        ;;
    2)
        echo "🤖 Building for Android..."
        eas build --profile development --platform android
        ;;
    3)
        echo "📱🤖 Building for both platforms..."
        eas build --profile development --platform all
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo "✅ Build started! Check progress at: https://expo.dev"
echo "📱 You can install the app using Expo Go or the development build"
echo "🔄 To publish updates, run: eas update --branch production"
