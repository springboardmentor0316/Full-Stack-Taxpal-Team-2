@echo off
REM TaxPal MERN Development Startup Script for Windows
REM This script starts both backend and frontend servers

cls
echo.
echo ==================================================
echo     TaxPal Development Environment Startup
echo ==================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install Node.js v14 or higher
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js Version: 
node --version
echo.

REM Check for MongoDB
mongod --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: MongoDB not found in PATH
    echo Make sure MongoDB is running in another terminal!
    echo Start MongoDB with: mongod
    echo.
    pause
)

REM Install backend dependencies if needed
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

REM Check for .env files
if not exist "backend\.env" (
    echo WARNING: Backend .env file not found!
    echo Creating from .env.example...
    copy backend\.env.example backend\.env
    echo Created backend\.env (Please update with your values)
)

if not exist "frontend\.env" (
    echo WARNING: Frontend .env file not found!
    echo Creating from .env.example...
    copy frontend\.env.example frontend\.env
    echo Created frontend\.env
)

echo.
echo All checks passed!
echo.
echo Starting servers...
echo.
echo IMPORTANT NOTES:
echo - Backend will run on: http://localhost:5000
echo - Frontend will run on: http://localhost:3000
echo - Close this window to stop the backend
echo - Check console for debug logs starting with [v0]
echo.
echo Waiting 3 seconds before starting...
timeout /t 3 /nobreak

REM Try to use npm-run-all if available, otherwise start backend in this window
where npm-run-all >nul 2>&1
if errorlevel 1 (
    echo Starting backend only in this window...
    echo Open another Command Prompt and run: cd frontend ^&^& npm start
    echo.
    cd backend
    call npm start
) else (
    cd backend
    call npm start
)
