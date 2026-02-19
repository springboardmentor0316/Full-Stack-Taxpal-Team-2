# TaxPal Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│                    http://localhost:3000                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              Pages & Components                         │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │  • Login / Register                                    │    │
│  │  • Dashboard (Protected)                              │    │
│  │  • Profile (Protected)                                │    │
│  │  • Add Expense / Income                               │    │
│  │  • Password Reset Flow                                │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          ↓                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │         API Layer & State Management                    │    │
│  ├─────────────────────────────────────────────────────────┤    │
│  │  • authApi.js                                         │    │
│  │  • budgetApi.js                                       │    │
│  │  • transactionApi.js                                  │    │
│  │  • AuthContext (Global State)                         │    │
│  │  • ProtectedRoute (Auth Guard)                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          ↓                                       │
│              HTTP Requests (JSON + JWT Token)                   │
│              Authorization: Bearer {token}                      │
│                          ↓                                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ↓
┌──────────────────────────────────────────────────────────────────┐
│                    BACKEND (Express.js)                          │
│                   http://localhost:5000                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Route Handlers                         │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  POST   /api/auth/register                              │ │
│  │  POST   /api/auth/login                                 │ │
│  │  GET    /api/auth/profile          [Protected]          │ │
│  │  PUT    /api/auth/profile          [Protected]          │ │
│  │  POST   /api/auth/forgot-password                       │ │
│  │  POST   /api/transaction                                │ │
│  │  GET    /api/transaction                                │ │
│  │  POST   /api/budget                                     │ │
│  │  GET    /api/budget                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  Middleware Stack                        │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  1. CORS Configuration                                 │ │
│  │  2. Body Parser (JSON)                                 │ │
│  │  3. Authentication (verify JWT)                        │ │
│  │  4. Validation (input checks)                          │ │
│  │  5. Error Handler                                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Controllers                           │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  • authController                                      │ │
│  │    - register()                                        │ │
│  │    - login()                                           │ │
│  │    - getProfile()                                      │ │
│  │    - updateProfile()                                   │ │
│  │    - forgotPassword()                                  │ │
│  │    - setPassword()                                     │ │
│  │  • transactionController                              │ │
│  │  • budgetController                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓                                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Models (Schemas)                     │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  • User Schema                                         │ │
│  │    {                                                   │ │
│  │      fullName, username, email, password,            │ │
│  │      profileImage, phone, location, bio,             │ │
│  │      country, incomeBracket, resetToken,             │ │
│  │      resetTokenExpiry, createdAt                      │ │
│  │    }                                                   │ │
│  │  • Transaction Schema                                 │ │
│  │  • Budget Schema                                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                          ↓                                       │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ↓
┌──────────────────────────────────────────────────────────────────┐
│                    DATABASE (MongoDB)                            │
│            localhost:27017 or MongoDB Atlas Cloud               │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Collections:                                                     │
│  • users                    (User documents)                     │
│  • transactions             (Expense/Income records)             │
│  • budgets                  (Budget records)                     │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

## Component Architecture

```
FRONTEND COMPONENT TREE
├── App (Router setup)
│   └── BrowserRouter
│       ├── Routes
│       │   ├── Public Routes
│       │   │   ├── Login
│       │   │   ├── Register
│       │   │   ├── ForgotPassword
│       │   │   ├── VerifyCode
│       │   │   └── SetPassword
│       │   │
│       │   └── Protected Routes (ProtectedRoute wrapper)
│       │       ├── Dashboard
│       │       ├── Profile
│       │       ├── AddExpenseForm
│       │       └── AddIncomeForm
│       │
│       └── AuthProvider (AuthContext)
│           └── Global state management
│               ├── token
│               ├── user
│               └── auth methods
```

## Data Flow - Profile Update Example

```
User clicks "Save Changes" in Profile
              ↓
handleSave() function called
              ↓
authApi.updateProfile(token, profileData) called
              ↓
HTTP PUT Request to /api/auth/profile
Headers: {
  Authorization: Bearer {jwt_token},
  Content-Type: application/json
}
Body: {
  fullName: "John Doe",
  phone: "+1234567890",
  location: "New York, USA",
  bio: "Budget enthusiast"
}
              ↓
Backend receives request
              ↓
authMiddleware:
  - Extract token from header
  - Verify JWT signature
  - Extract userId
  - Pass to controller
              ↓
updateProfile controller:
  - Find user by ID
  - Validate username (if changed)
  - Update fields
  - Save to MongoDB
  - Return updated user
              ↓
Response sent to frontend:
{
  message: "Profile updated successfully",
  user: { updated data }
}
              ↓
Frontend receives response
              ↓
Component state updated
              ↓
User sees confirmation
```

## Authentication Flow

```
REGISTRATION
┌──────────────┐
│ User submits │
│ registration │
└──────┬───────┘
       ↓
┌─────────────────────────────┐
│ Frontend validates input    │
│ • Email format              │
│ • Password strength         │
└──────┬──────────────────────┘
       ↓
┌─────────────────────────────┐
│ POST /api/auth/register     │
│ Body: {                     │
│   fullName,                 │
│   username,                 │
│   email,                    │
│   password,                 │
│   confirmPassword           │
│ }                           │
└──────┬──────────────────────┘
       ↓
┌─────────────────────────────┐
│ Backend validates           │
│ • Check required fields     │
│ • Check email/username      │
│   not already exists        │
│ • Hash password (bcryptjs)  │
└──────┬──────────────────────┘
       ↓
┌─────────────────────────────┐
│ Save User to MongoDB        │
└──────┬──────────────────────┘
       ↓
┌─────────────────────────────┐
│ Generate JWT Token          │
│ Payload: { userId, email }  │
│ Expires: 7 days             │
└──────┬──────────────────────┘
       ↓
┌─────────────────────────────┐
│ Return token + user info    │
└──────┬──────────────────────┘
       ↓
┌─────────────────────────────┐
│ Frontend stores token in    │
│ AuthContext                 │
└──────┬──────────────────────┘
       ↓
┌─────────────────────────────┐
│ Redirect to Dashboard       │
└─────────────────────────────┘


LOGIN
┌──────────────┐
│ User submits │
│ credentials  │
└──────┬───────┘
       ↓
┌─────────────────────────────┐
│ POST /api/auth/login        │
│ Body: {                     │
│   username,                 │
│   password                  │
│ }                           │
└──────┬──────────────────────┘
       ↓
┌─────────────────────────────┐
│ Find user by username       │
└──────┬──────────────────────┘
       ↓
┌─────────────────────────────┐
│ Compare password with hash  │
│ (bcryptjs.compare)          │
└──────┬──────────────────────┘
       ↓
     Success?
    /         \
  Yes         No
  ↓           ↓
Generate    Error:
JWT Token   Invalid
Expires:7d  Credentials
  ↓           ↓
Return      Error
token       Response
```

## Middleware Stack (Request Processing)

```
HTTP Request arrives
     ↓
CORS Middleware
  ├── Check origin
  ├── Allow methods
  └── Set headers
     ↓
Express JSON Parser
  ├── Parse request body
  └── Set req.body
     ↓
Is Authentication Required?
  ├── YES → authMiddleware
  │         ├── Extract token
  │         ├── Verify JWT
  │         └── Set req.userId
  │           ↓
  └── NO → Skip auth
          ↓
Route Handler Reached
  ├── Validate input
  ├── Call controller
  └── Return response
     ↓
Error Handler (if error)
  ├── Log error
  ├── Format response
  └── Send to client
```

## Database Schema Relationships

```
┌─────────────────────────────────────────────────────┐
│                      USER                           │
├─────────────────────────────────────────────────────┤
│ _id (ObjectId)                                      │
│ fullName (String)                                   │
│ username (String) [UNIQUE]                          │
│ email (String) [UNIQUE]                             │
│ password (String) [Hashed]                          │
│ profileImage (String)                               │
│ phone (String)                                      │
│ location (String)                                   │
│ bio (String)                                        │
│ country (String)                                    │
│ incomeBracket (String)                              │
│ resetToken (String)                                 │
│ resetTokenExpiry (Date)                             │
│ createdAt (Date)                                    │
└───────────┬──────────────────────────────────────────┘
            │ 1:Many
            │
            ├──→ ┌──────────────────────────────────┐
            │    │      TRANSACTION                 │
            │    ├──────────────────────────────────┤
            │    │ _id (ObjectId)                   │
            │    │ userId (Reference to User)       │
            │    │ type (Expense/Income)            │
            │    │ category (String)                │
            │    │ amount (Number)                  │
            │    │ description (String)             │
            │    │ date (Date)                      │
            │    │ budget (Reference to Budget)     │
            │    │ createdAt (Date)                 │
            │    └──────────────────────────────────┘
            │
            └──→ ┌──────────────────────────────────┐
                 │        BUDGET                    │
                 ├──────────────────────────────────┤
                 │ _id (ObjectId)                   │
                 │ userId (Reference to User)       │
                 │ category (String)                │
                 │ limit (Number)                   │
                 │ spent (Number)                   │
                 │ period (Monthly/Yearly)          │
                 │ startDate (Date)                 │
                 │ endDate (Date)                   │
                 │ createdAt (Date)                 │
                 └──────────────────────────────────┘
```

## File Structure in Detail

```
taxpal-app/
├── frontend/                        # React Application
│   ├── src/
│   │   ├── api/
│   │   │   ├── authApi.js          # Auth API calls
│   │   │   ├── budgetApi.js        # Budget API calls
│   │   │   └── transactionApi.js   # Transaction API calls
│   │   │
│   │   ├── components/
│   │   │   ├── profile.jsx         # Profile management
│   │   │   ├── add-Exp.jsx         # Add expense form
│   │   │   ├── add-Inc.jsx         # Add income form
│   │   │   ├── ProtectedRoute.jsx  # Auth guard
│   │   │   └── comstyles/          # Component styles
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── VerifyCode.jsx
│   │   │   └── SetPassword.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js      # Global auth state
│   │   │
│   │   ├── styles/                 # Page styles
│   │   ├── utils/                  # Utilities
│   │   ├── App.js                  # Root component
│   │   └── index.js                # React entry
│   │
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── backend/                         # Express Application
│   ├── controllers/
│   │   ├── authController.js       # Auth logic
│   │   ├── budgetController.js     # Budget logic
│   │   └── transactionController.js# Transaction logic
│   │
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   ├── Budget.js               # Budget schema
│   │   └── Transaction.js          # Transaction schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── budgetRoutes.js         # Budget endpoints
│   │   └── addtransaction.js       # Transaction endpoints
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification
│   │   ├── validation.js           # Input validation
│   │   └── errorHandler.js         # Error handling
│   │
│   ├── server.js                   # Express app entry
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── package.json                    # Monorepo root
├── QUICK_START.md                  # Quick start guide
├── INTEGRATION_COMPLETE.md         # Full documentation
├── INTEGRATION_CHANGES.md          # Changes made
└── ARCHITECTURE.md                 # This file
```

## Deployment Considerations

### Frontend (React)
- Build: `npm run build` → Creates optimized bundle
- Hosting: Vercel, Netlify, AWS S3 + CloudFront, etc.
- Environment: `REACT_APP_API_URL` points to production backend

### Backend (Express)
- Process Manager: PM2 for production
- Hosting: Heroku, AWS EC2, Railway, etc.
- Database: MongoDB Atlas (Cloud)
- Environment Variables: Set on hosting platform

### API Gateway Options
- API Gateway for rate limiting
- Load balancer for multiple backend instances
- CDN for frontend assets
- WAF for security

---

**Architecture Created:** February 2026
**Last Updated:** February 2026
**Status:** Production Ready
