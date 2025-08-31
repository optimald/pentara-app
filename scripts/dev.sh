#!/bin/bash

# Kill any existing processes on port 3003
echo "🔍 Checking for processes on port 3003..."
lsof -ti:3003 | xargs kill -9 2>/dev/null || echo "No processes found on port 3003"

# Wait a moment for the port to be freed
sleep 1

echo "🚀 Starting Pentara development server on port 3003..."

# Change to the web package directory and start the dev server
cd packages/web && npm run dev -- -p 3003
