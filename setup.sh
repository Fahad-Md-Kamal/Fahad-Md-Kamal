#!/bin/bash

echo "🚀 Setting up your Professional Portfolio..."
echo "----------------------------------------"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check the error messages above."
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit the JSON files in src/data/ to customize your portfolio"
echo "2. Replace public/resume.pdf with your actual resume"
echo "3. Add your project images to public/images/projects/"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "📖 For detailed instructions, check README.md"
echo "🚀 For deployment guide, check DEPLOYMENT.md"