#!/bin/bash

# TaxPal MERN Development Startup Script
# This script starts both backend and frontend servers

echo "🚀 TaxPal Development Environment Startup"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js not found. Please install Node.js v14 or higher${NC}"
    exit 1
fi

echo -e "${BLUE}Node.js Version:${NC} $(node --version)"
echo ""

# Check if MongoDB is running (optional warning)
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB not found in PATH. Make sure MongoDB is running!${NC}"
    echo "   Start MongoDB with: mongod (on another terminal)"
    echo ""
fi

# Install backend dependencies if needed
if [ ! -d "backend/node_modules" ]; then
    echo -e "${GREEN}📦 Installing backend dependencies...${NC}"
    cd backend
    npm install
    cd ..
fi

# Install frontend dependencies if needed
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${GREEN}📦 Installing frontend dependencies...${NC}"
    cd frontend
    npm install
    cd ..
fi

# Check for .env files
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Backend .env file not found!${NC}"
    echo "   Creating from .env.example..."
    cp backend/.env.example backend/.env
    echo -e "${BLUE}   ✅ Created backend/.env (Please update with your values)${NC}"
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}⚠️  Frontend .env file not found!${NC}"
    echo "   Creating from .env.example..."
    cp frontend/.env.example frontend/.env
    echo -e "${BLUE}   ✅ Created frontend/.env${NC}"
fi

echo ""
echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""
echo -e "${BLUE}Starting servers in 3 seconds...${NC}"
echo ""

# Check if concurrently is installed globally
if command -v concurrently &> /dev/null; then
    echo -e "${GREEN}📌 Using concurrently to run both servers${NC}"
    concurrently "cd backend && npm start" "cd frontend && npm start"
else
    echo -e "${YELLOW}Starting servers separately...${NC}"
    echo -e "${YELLOW}Open another terminal and run: cd frontend && npm start${NC}"
    echo ""
    cd backend
    npm start
fi
