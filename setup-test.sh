#!/bin/bash

echo "🚀 Setting up Wall Street English Assessment System for Testing"
echo "=============================================================="

# Check if PostgreSQL is needed
echo ""
echo "⚠️  IMPORTANT: Make sure you have PostgreSQL running and update DATABASE_URL in .env.local"
echo "Example: postgresql://username:password@localhost:5432/wse_online?schema=public"
echo ""
read -p "Have you updated the DATABASE_URL in .env.local? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Please update DATABASE_URL in .env.local first, then run this script again."
    exit 1
fi

echo ""
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo ""
echo "🔧 Generating Prisma client..."
npm run db:generate

echo ""
echo "🗄️  Pushing database schema..."
npm run db:push

echo ""
echo "🌱 Seeding assessment sections..."
npm run db:seed

echo ""
echo "🧪 Creating test data..."
npm run db:test-seed

echo ""
echo "✅ Setup complete! You can now test the system."
echo ""
echo "🚀 To start the development server:"
echo "npm run dev"
echo ""
echo "Then open: http://localhost:3000"
