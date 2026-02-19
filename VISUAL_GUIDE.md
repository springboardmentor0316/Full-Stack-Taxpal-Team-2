# TaxPal Visual Setup & Integration Guide

A step-by-step visual guide to understand and use the TaxPal application.

---

## 📦 Project Structure at a Glance

```
taxpal-app/
│
├── 🎨 frontend/                    (React App - Port 3000)
│   ├── src/
│   │   ├── 🔐 api/                 (API Communication)
│   │   │   ├── authApi.js          ← profile methods added here
│   │   │   ├── budgetApi.js
│   │   │   └── transactionApi.js
│   │   │
│   │   ├── 📄 pages/               (Page Components)
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ...
│   │   │
│   │   ├── 🎛️ components/          (UI Components)
│   │   │   ├── profile.jsx         ← Updated with API calls
│   │   │   ├── add-Exp.jsx
│   │   │   └── ...
│   │   │
│   │   └── 🔗 context/
│   │       └── AuthContext.js      (Global State)
│   │
│   ├── package.json
│   └── .env.example                (← Copy to .env)
│
├── 🔧 backend/                     (Express API - Port 5000)
│   ├── controllers/                (Business Logic)
│   │   └── authController.js       ← Added getProfile, updateProfile
│   │
│   ├── models/                     (Database Schemas)
│   │   └── User.js                 ← Added phone, location, bio fields
│   │
│   ├── routes/                     (API Endpoints)
│   │   └── authRoutes.js           ← Added /profile routes
│   │
│   ├── middleware/
│   │   └── authMiddleware.js       ← Updated with req.userId
│   │
│   ├── server.js                   (Main Server)
│   ├── package.json
│   └── .env.example                (← Copy to .env)
│
├── 📦 package.json                 (Root - Monorepo Config)
│   └── Scripts:
│       ├── npm run dev             (Both servers)
│       ├── npm run dev:backend     (Backend only)
│       └── npm run dev:frontend    (Frontend only)
│
└── 📚 Documentation/               (Guides & Checklists)
    ├── README.md                   (Start here!)
    ├── QUICK_START.md              (5-minute setup)
    ├── INTEGRATION_COMPLETE.md     (Full guide)
    ├── ARCHITECTURE.md             (Technical design)
    ├── VERIFICATION.md             (Testing checklist)
    ├── COMPLETION_SUMMARY.md       (What was done)
    └── VISUAL_GUIDE.md             (This file)
```

---

## 🚀 Installation Flow

```
Step 1: Clone/Extract Project
        ↓
Step 2: npm install
        (Installs root dependencies)
        ↓
Step 3: Setup .env files
        ├── backend/.env
        └── frontend/.env
        ↓
Step 4: Start MongoDB
        (mongod command)
        ↓
Step 5: npm run dev
        (Starts both servers)
        ↓
Step 6: Open http://localhost:3000
        (Frontend loads)
        ↓
🎉 Ready to Use!
```

---

## 🔄 Data Flow Diagram

### User Registration & Login

```
┌─────────────────────────────────────────────────────────────┐
│ User Fills Registration Form                                │
│ ├─ fullName                                                 │
│ ├─ username                                                 │
│ ├─ email                                                    │
│ ├─ password                                                 │
│ └─ confirmPassword                                          │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Frontend Validation                                         │
│ ✓ Check required fields                                     │
│ ✓ Check email format                                        │
│ ✓ Check password match                                      │
│ ✓ Check password strength                                   │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ POST /api/auth/register                                     │
│ Headers:                                                    │
│   Content-Type: application/json                           │
│ Body:                                                       │
│   {fullName, username, email, password, confirmPassword}   │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Backend Processing                                          │
│ 1. Validate input                                           │
│ 2. Check username/email not taken                          │
│ 3. Hash password (bcryptjs)                                │
│ 4. Create user in MongoDB                                  │
│ 5. Generate JWT token                                      │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Response                                                    │
│ {                                                           │
│   message: "User registered successfully",                │
│   token: "eyJhbGc...",                                     │
│   user: {id, fullName, username, email}                   │
│ }                                                           │
└────────────────┬────────────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────────────┐
│ Frontend                                                    │
│ 1. Store token in AuthContext                             │
│ 2. Store user info in AuthContext                         │
│ 3. Redirect to Dashboard                                  │
└─────────────────────────────────────────────────────────────┘
```

### Profile Update

```
User clicks "Edit Profile" button
                ↓
Profile form fields become editable
                ↓
User changes values:
├─ fullName
├─ phone
├─ location
└─ bio
                ↓
User clicks "Save Changes"
                ↓
Frontend calls: authApi.updateProfile(token, {changes})
                ↓
HTTP PUT Request constructed:
┌─────────────────────────────────────────────────┐
│ PUT /api/auth/profile                          │
│ Headers:                                        │
│   Authorization: Bearer eyJhbGc...            │
│   Content-Type: application/json              │
│ Body:                                          │
│   {fullName, phone, location, bio}            │
└────────┬────────────────────────────────────────┘
         ↓
Backend Middleware (authMiddleware):
├─ Extracts token from Authorization header
├─ Verifies JWT signature
├─ Decodes token to get userId
└─ Passes request to controller
         ↓
updateProfile Controller:
├─ Find user by userId
├─ Validate username (if changed)
├─ Update fields in user document
├─ Save to MongoDB
└─ Return updated user
         ↓
Response sent:
┌─────────────────────────────────────────────────┐
│ HTTP 200 OK                                    │
│ {                                              │
│   message: "Profile updated successfully",    │
│   user: {                                      │
│     id, fullName, username, email,           │
│     phone, location, bio, profileImage       │
│   }                                           │
│ }                                             │
└────────┬────────────────────────────────────────┘
         ↓
Frontend receives response
         ↓
Update component state with new user data
         ↓
Show success message
         ↓
Exit edit mode
         ↓
Display updated profile
```

---

## 🔐 Authentication & Protection

```
PUBLIC ROUTES (No Token Required)
├─ GET  /                     (Login page)
├─ POST /api/auth/register    (Register user)
├─ POST /api/auth/login       (Login)
├─ POST /api/auth/forgot-password
├─ POST /api/auth/resend-code
├─ POST /api/auth/verify-token
└─ POST /api/auth/set-password

PROTECTED ROUTES (Token Required)
├─ GET  /api/auth/profile     ← Check token → Find user → Return profile
├─ PUT  /api/auth/profile     ← Check token → Verify user → Update → Return
├─ GET  /api/transaction
├─ POST /api/transaction
├─ PUT  /api/transaction/:id
├─ DELETE /api/transaction/:id
├─ GET  /api/budget
├─ POST /api/budget
├─ PUT  /api/budget/:id
└─ DELETE /api/budget/:id

FRONTEND ROUTE PROTECTION
├─ <ProtectedRoute>           (Checks AuthContext.token)
│  ├─ If token exists    → Render component
│  └─ If no token        → Redirect to login
```

---

## 💾 Database Schema

```
USERS Collection
┌────────────────────────────────────┐
│ MongoDB Document Example           │
├────────────────────────────────────┤
│ _id: ObjectId("...")               │
│ fullName: "John Doe"               │
│ username: "johndoe"                │
│ email: "john@example.com"          │
│ password: "$2a$10$hashed..."      │ (bcrypt hash)
│ phone: "+1234567890"               │ NEW FIELD
│ location: "New York, USA"          │ NEW FIELD
│ bio: "Budget enthusiast"           │ NEW FIELD
│ profileImage: null                 │
│ country: "USA"                     │
│ incomeBracket: "$50k-$100k"       │
│ resetToken: null                   │
│ resetTokenExpiry: null             │
│ createdAt: ISODate("2026-02-18")   │
└────────────────────────────────────┘

TRANSACTIONS Collection
┌────────────────────────────────────┐
│ _id: ObjectId(...)                 │
│ userId: ObjectId(...)  (ref: User) │
│ type: "expense"                    │
│ category: "Food"                   │
│ amount: 45.50                      │
│ description: "Lunch at cafe"       │
│ date: ISODate("2026-02-18")        │
│ budget: ObjectId(...)              │
│ createdAt: ISODate("2026-02-18")   │
└────────────────────────────────────┘

BUDGETS Collection
┌────────────────────────────────────┐
│ _id: ObjectId(...)                 │
│ userId: ObjectId(...)  (ref: User) │
│ category: "Food"                   │
│ limit: 500                         │
│ spent: 245.50                      │
│ period: "monthly"                  │
│ startDate: ISODate(...)            │
│ endDate: ISODate(...)              │
│ createdAt: ISODate("2026-02-18")   │
└────────────────────────────────────┘
```

---

## 📊 Component Communication

```
App.jsx (Root)
├── AuthProvider (Global State)
│   ├── token
│   ├── user
│   └── auth methods
│
└── BrowserRouter
    ├── Public Routes
    │   ├── Login (uses authApi)
    │   └── Register (uses authApi)
    │
    └── Protected Routes (via ProtectedRoute)
        ├── Dashboard (uses transactionApi, budgetApi)
        │
        ├── Profile (uses authApi)
        │   ├── Displays user data from AuthContext
        │   ├── Calls authApi.updateProfile on save
        │   └── Updates component state with response
        │
        ├── AddExpenseForm (uses transactionApi)
        │
        └── AddIncomeForm (uses transactionApi)

API Calls:
┌─ authApi
│  ├─ register(userData)
│  ├─ login(credentials)
│  ├─ forgotPassword(email)
│  ├─ getProfile(token)              ← NEW
│  └─ updateProfile(token, data)     ← NEW
│
├─ transactionApi
│  ├─ getTransactions(token)
│  ├─ addTransaction(token, data)
│  ├─ updateTransaction(token, id, data)
│  └─ deleteTransaction(token, id)
│
└─ budgetApi
   ├─ getBudgets(token)
   ├─ addBudget(token, data)
   ├─ updateBudget(token, id, data)
   └─ deleteBudget(token, id)
```

---

## 🎯 Feature Checklist

### ✅ Authentication
- [x] Register new account
- [x] Login with credentials
- [x] JWT token generation
- [x] Protected routes
- [x] Password reset flow
- [x] Token validation

### ✅ Profile Management (NEW)
- [x] View profile information
- [x] Edit profile details
- [x] Update phone, location, bio
- [x] Save changes to database
- [x] Data persistence
- [x] Real API integration

### ✅ Transactions
- [x] Add expense
- [x] Add income
- [x] View transaction list
- [x] Delete transactions
- [x] Transaction history

### ✅ Budgets
- [x] Create budget
- [x] Set budget limits
- [x] Track spending
- [x] View budget status

### ✅ Dashboard
- [x] Overview page
- [x] Statistics display
- [x] Recent transactions
- [x] Budget summary

---

## 🧪 Testing Checklist

### Step-by-Step Testing

**1. Setup**
- [ ] Clone project
- [ ] Run `npm install`
- [ ] Create .env files
- [ ] Start MongoDB

**2. Start Servers**
- [ ] Run `npm run dev`
- [ ] Backend logs show "listening on port 5000"
- [ ] Frontend loads on http://localhost:3000

**3. Registration**
- [ ] Click Register
- [ ] Fill form with test data
- [ ] Click Register button
- [ ] Should redirect to login or dashboard
- [ ] Check browser console for API logs

**4. Login**
- [ ] Enter credentials
- [ ] Click Login
- [ ] Should redirect to Dashboard
- [ ] Check AuthContext has token

**5. Profile Management** (NEW FEATURE)
- [ ] Navigate to Profile page
- [ ] Verify profile displays user info
- [ ] Click "Edit Profile"
- [ ] Fields become editable
- [ ] Edit phone field (add "+1234567890")
- [ ] Edit location field (add "New York, USA")
- [ ] Click "Save Changes"
- [ ] Check browser console for `[v0] Profile saved successfully`
- [ ] Verify response shows updated data
- [ ] Refresh page - changes should persist
- [ ] ✅ Profile update working!

**6. Error Handling**
- [ ] Try login with wrong password
- [ ] Should show error message
- [ ] Try saving profile without token
- [ ] Should redirect to login
- [ ] Try accessing protected route without login
- [ ] Should redirect to login

---

## 🔍 Debugging Tips

### Browser Console
Look for logs prefixed with `[v0]`:
```javascript
[v0] Login API call
[v0] API Call: POST http://localhost:5000/api/auth/login
[v0] Profile saved successfully
[v0] Error saving profile: ...
```

### Backend Console
Watch for server logs:
```
[v0] Server running on port 5000
[v0] MongoDB connected
[v0] Token verified for user: 507f1f77bcf86cd799439011
[v0] Profile updated for: john@example.com
```

### Common Issues

```
Issue: "Port 3000 already in use"
Fix:   lsof -ti:3000 | xargs kill

Issue: "MongoDB connection failed"
Fix:   Start MongoDB: mongod

Issue: "API returns 401 Unauthorized"
Fix:   Token expired or missing
       - Clear browser storage
       - Login again
       - Check Authorization header

Issue: "CORS error"
Fix:   Check FRONTEND_URL in backend/.env
       Should be: http://localhost:3000
```

---

## 📱 Frontend Pages

```
Login Page (/)
├── Username input
├── Password input
├── Login button
└── Link to Register

Register Page (/Register)
├── Full Name input
├── Username input
├── Email input
├── Password input
├── Confirm Password input
├── Country selector
├── Income Bracket selector
└── Register button

Dashboard (/Dashboard) [Protected]
├── User greeting
├── Balance overview
├── Recent transactions
├── Budget status
├── Quick action buttons
└── Logout button

Profile Page (/ProfilePage) [Protected]
├── Profile header with user avatar
├── User info display
│   ├── Full Name
│   ├── Username
│   ├── Email
│   ├── Phone (NEW)
│   └── Location (NEW)
├── Edit button
│   ├── Edit mode - fields become inputs
│   ├── Save button
│   └── Cancel button
├── Bio section (NEW)
└── Security settings

Add Expense (/AddExpenseForm) [Protected]
├── Category selector
├── Amount input
├── Description
├── Date picker
└── Add button

Add Income (/AddIncomeForm) [Protected]
├── Source input
├── Amount input
├── Description
├── Date picker
└── Add button
```

---

## ✨ Summary

**What You Have:**
1. ✅ Complete frontend-backend integration
2. ✅ Real profile management API
3. ✅ Secure authentication
4. ✅ Protected routes
5. ✅ Error handling
6. ✅ Comprehensive documentation

**What You Can Do:**
1. Run both servers with `npm run dev`
2. Register and login
3. View and edit your profile
4. Add transactions and budgets
5. Track your finances
6. Deploy to production

**Next Steps:**
1. Test the application
2. Read the documentation
3. Customize as needed
4. Deploy to production

---

**The TaxPal application is ready to use! 🚀**

For more details, see:
- [README.md](./README.md)
- [QUICK_START.md](./QUICK_START.md)
- [INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md)
