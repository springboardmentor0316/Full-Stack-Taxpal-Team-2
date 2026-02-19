# TaxPal Frontend-Backend Integration - Complete

This document outlines the complete integration between the TaxPal frontend (React) and backend (Express/Node.js).

## Project Structure

```
/
├── frontend/                 # React application (Port 3000)
│   ├── src/
│   │   ├── api/            # API calls to backend
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # AuthContext for state management
│   │   └── styles/         # CSS files
│   ├── package.json
│   └── .env.example
│
├── backend/                  # Express/Node.js server (Port 5000)
│   ├── controllers/         # Business logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth, validation, error handling
│   ├── server.js           # Entry point
│   ├── package.json
│   └── .env.example
│
├── package.json             # Root - defines dev scripts
└── INTEGRATION_COMPLETE.md  # This file
```

## What Was Fixed/Integrated

### 1. **Root Configuration**
- ✅ Fixed `package.json` scripts to run both frontend and backend
- ✅ Added `concurrently` dependency to run both servers simultaneously
- ✅ Removed incorrect Next.js configuration

### 2. **Backend Enhancements**
- ✅ Added **Profile Management API**:
  - `GET /api/auth/profile` - Get user profile (protected)
  - `PUT /api/auth/profile` - Update user profile (protected)
- ✅ Enhanced User model with fields: `phone`, `location`, `bio`
- ✅ Updated auth middleware to include `req.userId`
- ✅ Comprehensive error handling and logging

### 3. **Frontend Integration**
- ✅ Added profile API methods: `getProfile()`, `updateProfile()`
- ✅ Updated Profile component to use real API calls
- ✅ Proper error handling and user feedback
- ✅ Authentication token management

### 4. **Environment Configuration**
- ✅ Created `.env.example` files for both frontend and backend
- ✅ Documented all required environment variables

## Prerequisites

- **Node.js** (v14+) and **npm** or **pnpm**
- **MongoDB** (Local or Atlas)
- **Environment Variables** configured

## Installation & Setup

### Step 1: Clone/Extract the Project
```bash
cd taxpal-app
```

### Step 2: Install Root Dependencies
```bash
npm install
# or
pnpm install
```

This automatically installs dependencies for both frontend and backend.

### Step 3: Configure Environment Variables

#### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env and configure:
# - MONGO_URI (default: mongodb://localhost:27017/taxpal)
# - JWT_SECRET (change for production)
# - FRONTEND_URL (http://localhost:3000 for dev)
```

#### Frontend Setup
```bash
cd ../frontend
cp .env.example .env
# The default REACT_APP_API_URL is already set to http://localhost:5000/api
```

### Step 4: Start MongoDB
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (update MONGO_URI in .env)
```

### Step 5: Run the Development Servers

#### Option A: Run Both Servers Together (Recommended)
```bash
npm run dev
# This starts both backend (5000) and frontend (3000)
```

#### Option B: Run Servers Separately
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/resend-code` - Resend verification code
- `POST /api/auth/verify-token` - Verify reset token
- `POST /api/auth/set-password` - Set new password

### Profile Routes (Protected - Requires Auth Token)
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update current user profile

### Transaction Routes
- `GET /api/transaction` - Get all transactions
- `POST /api/transaction` - Create transaction
- `PUT /api/transaction/:id` - Update transaction
- `DELETE /api/transaction/:id` - Delete transaction

### Budget Routes
- `GET /api/budget` - Get all budgets
- `POST /api/budget` - Create budget
- `PUT /api/budget/:id` - Update budget
- `DELETE /api/budget/:id` - Delete budget

### Health Check
- `GET /api/health` - Server status

## Frontend Features

### Pages
1. **Login** - User authentication
2. **Register** - New user registration
3. **ForgotPassword** - Initiate password reset
4. **VerifyCode** - Enter verification code
5. **SetPassword** - Set new password
6. **Dashboard** - Main application (protected)
7. **Profile** - User profile management (protected)

### Components
- **ProtectedRoute** - Protects authenticated routes
- **AddExpenseForm** - Add expense transactions
- **AddIncomeForm** - Add income transactions
- **ProfilePage** - User profile with edit capability

## Authentication Flow

1. **Register** → User creates account
2. **Login** → User receives JWT token
3. **Token Storage** → Token stored in AuthContext
4. **Protected Routes** → Routes check for token
5. **API Calls** → Token included in Authorization header: `Bearer {token}`
6. **Profile Management** → Use token for profile operations

## Key Features Integrated

### ✅ User Authentication
- Secure password hashing (bcryptjs)
- JWT token-based authentication
- Protected routes
- Password reset with email verification

### ✅ Profile Management
- View user profile
- Edit profile information
- Update phone, location, bio
- Profile image support

### ✅ Budget Tracking
- Create budgets
- Track transactions
- View dashboard analytics

### ✅ Error Handling
- Comprehensive error messages
- Proper HTTP status codes
- Console logging for debugging
- User-friendly feedback

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Kill process on port 5000
lsof -ti:5000 | xargs kill
```

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in backend/.env
- For MongoDB Atlas, update connection string

### CORS Errors
- Verify FRONTEND_URL in backend/.env
- Should be `http://localhost:3000` for development
- Check backend CORS configuration in `server.js`

### API Call Failures
- Check backend is running on port 5000
- Verify REACT_APP_API_URL in frontend/.env
- Check browser console for specific error messages
- Use `[v0]` prefix in logs to find debug statements

### Token Expiration
- Default token expiration: 7 days
- Clear browser storage and login again if needed
- Change JWT_SECRET in production

## Development Tips

### Debugging
Look for console logs prefixed with `[v0]` for debugging information:
```
[v0] Login API call
[v0] API Call: POST http://localhost:5000/api/auth/login
[v0] Profile retrieved successfully
```

### Testing API Endpoints
Use tools like **Postman** or **curl**:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Get Profile (replace TOKEN with actual JWT)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Frontend Architecture
- **AuthContext** - Global authentication state
- **Protected Route** - Wrapper for authenticated pages
- **API Layer** - Centralized API calls in `src/api/`
- **Component Structure** - Modular, reusable components

## Production Deployment

### Before Going Live:
1. Change `JWT_SECRET` to a strong random string
2. Update `FRONTEND_URL` and API URLs
3. Set `NODE_ENV=production`
4. Use environment variables properly
5. Enable email notifications
6. Set up MongoDB Atlas or production database
7. Configure CORS appropriately
8. Use HTTPS for all connections

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review console logs (look for `[v0]` prefix)
3. Verify environment variables are set correctly
4. Ensure both frontend and backend are running
5. Check MongoDB connection

---

**Last Updated:** February 2026
**Status:** ✅ Fully Integrated
