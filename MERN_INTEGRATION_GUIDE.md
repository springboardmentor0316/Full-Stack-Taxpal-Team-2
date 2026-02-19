# TaxPal MERN Stack - Complete Integration Guide

This document covers the full MERN (MongoDB, Express, React, Node.js) stack setup and connection between frontend and backend.

## Project Overview

```
TaxPal - Full Stack Application
├── Backend (Node.js + Express + MongoDB)
├── Frontend (React)
├── Authentication (JWT)
└── Transaction Management (Income/Expense Tracking)
```

---

## 🚀 QUICK START

### Prerequisites
- Node.js v14+ (LTS recommended)
- MongoDB (local or Atlas account)
- npm or yarn

### Step 1: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your values (see Configuration section below)
# Then start the backend
npm start
```

**Backend runs on:** `http://localhost:5000`

### Step 2: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Frontend .env should contain:
# REACT_APP_API_URL=http://localhost:5000/api

# Start the frontend
npm start
```

**Frontend runs on:** `http://localhost:3000`

### Step 3: Test the Connection

1. Open browser to `http://localhost:3000`
2. Try registering a new account
3. Check browser console (F12) for `[v0]` debug logs
4. Check backend terminal for `[v0]` debug logs
5. If both show successful logs, connection is working! ✅

---

## 📋 Configuration

### Backend .env File

```env
# MongoDB - LOCAL (for development)
MONGO_URI=mongodb://localhost:27017/taxpal

# MongoDB - ATLAS (for production/cloud)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taxpal

# JWT Secret - CHANGE THIS IN PRODUCTION!
JWT_SECRET=your-super-secret-key-min-32-characters-long

# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional - for password reset)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### Frontend .env File

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📊 Architecture

### Backend Structure

```
backend/
├── controllers/
│   ├── authController.js      # Login, Register, Password Reset
│   └── transactionController.js # Income/Expense CRUD
├── middleware/
│   ├── authMiddleware.js       # JWT Token Verification
│   ├── errorHandler.js         # Error Handling
│   └── validation.js           # Input Validation
├── models/
│   ├── User.js                 # User Schema
│   └── Transaction.js          # Transaction Schema
├── routes/
│   ├── authRoutes.js           # Auth Endpoints
│   └── addtransaction.js       # Transaction Endpoints
├── server.js                   # Main Server File
└── package.json
```

### Frontend Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── authApi.js          # Auth API Calls
│   │   └── transactionApi.js   # Transaction API Calls
│   ├── components/
│   │   ├── ProtectedRoute.jsx  # Route Protection
│   │   ├── add-Inc.jsx         # Add Income Form
│   │   └── add-Exp.jsx         # Add Expense Form
│   ├── context/
│   │   └── AuthContext.js      # Auth State Management
│   ├── pages/
│   │   ├── Login.jsx           # Login Page
│   │   ├── Register.jsx        # Registration Page
│   │   ├── Dashboard.jsx       # Main Dashboard
│   │   ├── ForgotPassword.jsx  # Forgot Password
│   │   ├── VerifyCode.jsx      # Code Verification
│   │   └── SetPassword.jsx     # Password Reset
│   ├── App.js                  # Router Setup
│   └── index.js                # Entry Point
└── package.json
```

---

## 🔌 API Endpoints

### Authentication Endpoints

#### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "country": "USA",
  "incomeBracket": "$50,000 - $100,000"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "65f7b...",
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### 2. Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123!"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "65f7b...",
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### 3. Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}

Response:
{
  "message": "Verification code sent to your email",
  "success": true
}
```

#### 4. Verify Reset Token
```
POST /api/auth/verify-token
Content-Type: application/json

{
  "token": "verification-code-or-token",
  "email": "john@example.com"
}

Response:
{
  "message": "Token verified successfully"
}
```

#### 5. Set New Password
```
POST /api/auth/set-password
Content-Type: application/json

{
  "token": "verification-code-or-token",
  "email": "john@example.com",
  "password": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}

Response:
{
  "message": "Password reset successfully"
}
```

### Transaction Endpoints (Require Authentication)

All transaction endpoints require Bearer token in Authorization header:
```
Authorization: Bearer <token>
```

#### 1. Add Income
```
POST /api/transaction/add-income
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Monthly Salary",
  "amount": 5000,
  "category": "Salary",
  "date": "2024-12-01",
  "notes": "December salary"
}

Response:
{
  "_id": "65f7b...",
  "user": "65f7b...",
  "type": "income",
  "description": "Monthly Salary",
  "amount": 5000,
  "category": "Salary",
  "date": "2024-12-01T00:00:00.000Z",
  "notes": "December salary",
  "createdAt": "2024-12-01T10:30:00.000Z"
}
```

#### 2. Add Expense
```
POST /api/transaction/add-expense
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Grocery Shopping",
  "amount": 150,
  "category": "Food",
  "date": "2024-12-01",
  "notes": "Weekly groceries"
}

Response:
{
  "_id": "65f7b...",
  "user": "65f7b...",
  "type": "expense",
  "description": "Grocery Shopping",
  "amount": 150,
  "category": "Food",
  "date": "2024-12-01T00:00:00.000Z",
  "notes": "Weekly groceries",
  "createdAt": "2024-12-01T10:32:00.000Z"
}
```

#### 3. Get All Transactions
```
GET /api/transaction
Authorization: Bearer <token>

Response:
[
  {
    "_id": "65f7b...",
    "user": "65f7b...",
    "type": "income",
    "description": "Monthly Salary",
    "amount": 5000,
    "category": "Salary",
    "date": "2024-12-01T00:00:00.000Z",
    "createdAt": "2024-12-01T10:30:00.000Z"
  },
  {
    "_id": "65f7c...",
    "user": "65f7b...",
    "type": "expense",
    "description": "Grocery Shopping",
    "amount": 150,
    "category": "Food",
    "date": "2024-12-01T00:00:00.000Z",
    "createdAt": "2024-12-01T10:32:00.000Z"
  }
]
```

---

## 🔐 Authentication Flow

### JWT Token Flow

1. **User Registration/Login**
   - Backend generates JWT token: `jwt.sign({ userId, email }, JWT_SECRET)`
   - Frontend stores token in `AuthContext` and `localStorage`

2. **Protected Requests**
   - Frontend attaches token: `Authorization: Bearer <token>`
   - Backend middleware verifies token
   - Request proceeds if valid, else returns 401

3. **Token Validation**
   - Backend extracts token from `Authorization` header
   - Verifies signature using `JWT_SECRET`
   - Extracts `userId` and attaches to request

### Frontend Auth Context

```javascript
// Usage in components
const { token, user, setAuth, logout } = useAuth();

// After login
setAuth(token, userData);

// When logging out
logout(); // Clears token and user
```

---

## 🔧 Troubleshooting

### Issue: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
1. Check backend `.env` has correct `FRONTEND_URL`
2. Verify frontend `.env` has correct `REACT_APP_API_URL`
3. Restart both servers after changing .env

### Issue: MongoDB Connection Error
```
MongoDB connection error: connect ECONNREFUSED
```

**Solutions:**
1. Start MongoDB locally: `mongod`
2. Or use MongoDB Atlas and update `MONGO_URI` in `.env`
3. Check `.env` file exists and has correct URI

### Issue: Token Expired / Invalid Token
```
"Invalid token" or "Token expired"
```

**Solutions:**
1. Clear `localStorage` in browser (DevTools > Application > Storage)
2. Log out and log back in
3. Check `JWT_SECRET` matches between backend and frontend

### Issue: 404 on API Endpoints
```
Cannot POST /api/auth/register
```

**Solutions:**
1. Verify backend server is running on port 5000
2. Check `/api/auth` routes are registered in `server.js`
3. Check `REACT_APP_API_URL` is correct in frontend `.env`

### Issue: Database Errors / Duplicate Key
```
E11000 duplicate key error
```

**Solutions:**
1. Email or username already exists in database
2. Check MongoDB for existing users
3. Drop database and start fresh: `db.dropDatabase()`

---

## 🧪 Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend loads at `http://localhost:3000`
- [ ] Can register new user
- [ ] Can login with registered user
- [ ] Dashboard shows user info
- [ ] Can add income transaction
- [ ] Can add expense transaction
- [ ] Transactions appear in table
- [ ] Logout works
- [ ] Protected routes redirect to login
- [ ] Browser console shows no errors

---

## 📱 Debug Logging

All components use `console.log("[v0] ...")` for debugging:

**In Browser Console (F12):**
```
[v0] Auth API URL: http://localhost:5000/api
[v0] Login API call
[v0] Setting auth: john@example.com
```

**In Backend Terminal:**
```
[v0] Server Configuration:
[v0] Frontend URL: http://localhost:3000
[v0] ✅ MongoDB connected successfully
[v0] Login request: { username: 'johndoe', password: '...' }
```

---

## 🚀 Production Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables on hosting platform:
   - `MONGO_URI` (MongoDB Atlas URL)
   - `JWT_SECRET` (strong, random 32+ char string)
   - `FRONTEND_URL` (your frontend domain)
   - `NODE_ENV=production`

2. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel)

1. Update `REACT_APP_API_URL` in `.env.production`:
   ```
   REACT_APP_API_URL=https://api.yourbackend.com/api
   ```

2. Deploy to Vercel:
   ```bash
   npm run build
   vercel --prod
   ```

---

## 📚 Key Features

✅ **Authentication**
- User registration with validation
- Secure login with JWT
- Password reset via email
- Protected routes

✅ **Transaction Management**
- Add income and expenses
- Categorize transactions
- Track by date
- View all transactions
- Real-time UI updates

✅ **Security**
- Password hashing with bcryptjs
- JWT token verification
- CORS protection
- Error handling

✅ **Database**
- MongoDB with Mongoose ODM
- User schema with reset tokens
- Transaction schema with user references
- Timestamps for all records

---

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [React Documentation](https://react.dev/)
- [Mongoose ODM](https://mongoosejs.com/)

---

## 💡 Next Steps

1. Add user profile management
2. Implement budget tracking
3. Add transaction filters and search
4. Create financial reports
5. Add tax calculation features
6. Implement notifications
7. Add data export (PDF/CSV)
8. Deploy to production

---

## 🤝 Support

If you encounter issues:

1. Check debug logs in browser console and terminal
2. Verify `.env` files are configured correctly
3. Ensure both servers are running
4. Clear browser cache and localStorage
5. Restart both backend and frontend servers

---

**Last Updated:** December 2024
**MERN Stack Version:** v1.0.0
