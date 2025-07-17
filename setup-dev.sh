#!/bin/bash

# EngageTrack React Package Setup Script
echo "🚀 Setting up EngageTrack React package..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the package
echo "🔨 Building the package..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm test

# Setup example project
echo "📋 Setting up example project..."
cd example
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "📋 Available commands:"
echo "  npm run build        - Build the package"
echo "  npm run build:watch  - Build and watch for changes"
echo "  npm test            - Run tests"
echo "  npm run test:watch  - Run tests in watch mode"
echo "  npm run lint        - Run linting"
echo "  npm run example     - Run the example project"
echo ""
echo "🎯 To use the package:"
echo "  1. Build it: npm run build"
echo "  2. Link it: npm link"
echo "  3. In your project: npm link @engagetrack/react"
echo ""
echo "📖 See README.md for full documentation"
