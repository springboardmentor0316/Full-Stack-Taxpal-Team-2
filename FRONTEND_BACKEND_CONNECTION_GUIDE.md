# Frontend-Backend Connection Guide ✅

This guide ensures your TaxPal frontend is fully connected to the backend.

## Status Summary

✅ **Frontend UI** - Fully built and styled  
✅ **Backend APIs** - All endpoints created  
✅ **Authentication** - JWT implementation ready  
✅ **Transaction Management** - Income/Expense CRUD ready  
✅ **Budget Management** - Budget CRUD ready  
🔧 **Connection Issues Fixed** - Dashboard variable references updated

---

## What's Been Fixed

### 1. Dashboard Bug Fix ✅
**Issue:** `displayedTransactions` was undefined when rendering transaction table  
**Fix:** Added definition to show limited transactions (5) or all based on toggle  
**File:** `frontend/src/pages/Dashboard.jsx` (line 494-496)

---

## Setup & Connection Steps

### Step 1: Backend Setup

**1.1 Create .env file**
```bash
cd backend
cp .env.example .env
```

**1.2 Configure .env with your values:**
```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/taxpal
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taxpal

# JWT Configuration (change this to something secure)
JWT_SECRET=your-super-secret-key-min-32-characters-long

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional - for password reset emails)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

**1.3 Install dependencies & start backend**
```bash
npm install
npm start
```

You should see: `[v0] 🚀 Server running on port 5000`

### Step 2: Frontend Setup

**2.1 Create .env file**
```bash
cd frontend
cp .env.example .env
```

**2.2 Configure .env**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**2.3 Install dependencies & start frontend**
```bash
npm install
npm start
```

Frontend will open at `http://localhost:3000`

### Step 3: Verify Connection

1. Open browser console (F12) and check for debug logs
2. Register a new account at login page
3. You should see in console: `[v0] Register API call with: {...}`
4. After registration, dashboard should load with user data

---

## Frontend API Integration Status

### ✅ Authentication APIs (All Connected)

**Files:**
- Frontend: `frontend/src/api/authApi.js`
- Backend: `backend/routes/authRoutes.js` + `backend/controllers/authController.js`

**Working Endpoints:**
- ✅ Register: `POST /api/auth/register`
- ✅ Login: `POST /api/auth/login`
- ✅ Forgot Password: `POST /api/auth/forgot-password`
- ✅ Verify Token: `POST /api/auth/verify-token`
- ✅ Set Password: `POST /api/auth/set-password`
- ✅ Resend Code: `POST /api/auth/resend-code`

**Frontend Pages Using Auth APIs:**
- `Login.jsx` - Uses login endpoint ✅
- `Register.jsx` - Uses register endpoint ✅
- `ForgotPassword.jsx` - Uses forgot-password endpoint ✅
- `VerifyCode.jsx` - Uses verify-token endpoint ✅
- `SetPassword.jsx` - Uses set-password endpoint ✅

---

### ✅ Transaction APIs (All Connected)

**Files:**
- Frontend: `frontend/src/api/transactionApi.js`
- Backend: `backend/routes/addtransaction.js` + `backend/controllers/transactionController.js`

**Working Endpoints:**
- ✅ Add Income: `POST /api/transaction/add-income` 
- ✅ Add Expense: `POST /api/transaction/add-expense`
- ✅ Get Transactions: `GET /api/transaction`

**Frontend Components Using Transaction APIs:**
- `Dashboard.jsx` - Add income/expense, fetch transactions ✅
- `add-Inc.jsx` - Income form (calls addIncome API) ✅
- `add-Exp.jsx` - Expense form (calls addExpense API) ✅

**How It Works:**
1. User clicks "Add Income" or "Add Expense" button
2. Form popup opens with fields: description, amount, category, date, notes
3. User fills form and clicks "Save"
4. API call is made with Bearer token in Authorization header
5. Backend creates transaction and returns it
6. Transaction is added to state and displayed in table

---

### ✅ Budget APIs (All Connected)

**Files:**
- Frontend: `frontend/src/api/budgetApi.js`
- Backend: `backend/routes/budgetRoutes.js` + `backend/controllers/budgetController.js`

**Working Endpoints:**
- ✅ Create Budget: `POST /api/budget`
- ✅ Get Budgets: `GET /api/budget`
- ✅ Update Budget: `PUT /api/budget/:id` (structure ready, not actively used in UI)
- ✅ Delete Budget: `DELETE /api/budget/:id` (structure ready, not actively used in UI)

**Frontend Components Using Budget APIs:**
- `Dashboard.jsx` - Budget tab (create & fetch budgets) ✅

**How It Works:**
1. User clicks "Budget" tab in sidebar
2. Sees form to create new budget with: category, amount, month, description
3. User fills form and clicks "Create Budget"
4. API call creates budget in database
5. List of budgets displays with spent amount and percentage used

---

## Data Flow Diagram

```
USER LOGS IN
    ↓
Login.jsx calls authApi.login()
    ↓
Backend verifies credentials, creates JWT token
    ↓
Frontend receives token, stores in AuthContext & localStorage
    ↓
Dashboard.jsx mounted with token
    ↓
Dashboard fetches transactions and budgets using token
    ↓
DASHBOARD DISPLAYS:
├── Monthly stats (income, expenses, estimated tax, savings)
├── Income vs Expenses chart
├── Expense breakdown pie chart
├── Recent transactions table
├── Budget management section
├── Tax estimator calculator
├── Financial reports generator
└── User profile section

WHEN USER ADDS TRANSACTION:
    ↓
Click "Add Income" or "Add Expense" button
    ↓
Form popup opens with fields
    ↓
User fills and submits
    ↓
transactionApi.addIncome() or addExpense() called with token
    ↓
Backend creates transaction with user ID from JWT
    ↓
Frontend receives transaction data
    ↓
Added to state and visible in table immediately
    ↓
Charts auto-update with new transaction data
```

---

## Complete Feature Checklist

### Authentication (Pages & APIs)
- [ ] Register new account
  - Expected: User created in database, JWT token received, auto-login
  - Debug: Check browser console for `[v0] Register API call`
  - Backend debug: Check terminal for `[v0] User registered: email@example.com`

- [ ] Login with credentials
  - Expected: Token stored, redirect to dashboard
  - Debug: Check localStorage for `authToken`

- [ ] Logout
  - Expected: Token cleared, redirect to login
  - Debug: localStorage should be empty

- [ ] Forgot Password
  - Expected: Verification code sent (or shown in dev mode)
  - Debug: Check backend console for `[v0] ✅ Reset email sent successfully`

- [ ] Verify Reset Code
  - Expected: Code validated, redirect to set password
  - Debug: Check backend for token validation logs

- [ ] Set New Password
  - Expected: Password updated, redirect to login
  - Debug: Should be able to login with new password

### Dashboard Features
- [ ] Load user transactions
  - Expected: Transactions appear in table on dashboard load
  - Debug: Browser console should show `[v0] Transactions loaded:`

- [ ] Display monthly statistics
  - Expected: 4 stat cards (income, expenses, tax, savings)
  - Debug: Stats calculated from actual transaction data

- [ ] Show income vs expenses chart
  - Expected: Bar chart with monthly breakdown
  - Debug: Only shows if transactions exist

- [ ] Show expense breakdown pie chart
  - Expected: Pie chart with expense categories
  - Debug: Only shows if expenses exist

- [ ] Add income transaction
  - Expected: Income added to table and affects charts
  - Debug: Check `[v0] Adding income:` in console
  - Backend debug: Check `USER FROM TOKEN` and transaction created

- [ ] Add expense transaction
  - Expected: Expense added to table and affects charts
  - Debug: Check `[v0] Adding expense:` in console

- [ ] Create budget
  - Expected: Budget appears in budget list with progress circle
  - Debug: Check `[v0] Creating budget:` in console

- [ ] View budgets
  - Expected: Budgets display with spent amount and percentage
  - Debug: Check `[v0] Budgets loaded:` in console

- [ ] Calculate estimated tax
  - Expected: Tax summary displays with calculations
  - Debug: Check `[v0] Tax calculated:` in console

- [ ] Generate financial reports
  - Expected: Report preview shows income, expenses, net income
  - Debug: Check `[v0] Report generated:` in console

- [ ] Download report
  - Expected: Text file downloads with report data
  - Debug: Check browser downloads folder

---

## Common Issues & Solutions

### ❌ CORS Error
```
Access to XMLHttpRequest from 'http://localhost:3000' has been blocked
```
**Solution:**
1. Verify backend is running on port 5000
2. Check `FRONTEND_URL` in backend `.env` is `http://localhost:3000`
3. Restart backend server
4. Clear browser cache (Ctrl+Shift+Delete)

### ❌ "Cannot POST /api/auth/register"
**Solution:**
1. Check backend terminal shows routes registered
2. Verify `REACT_APP_API_URL` in frontend `.env`
3. Check database connection logs in backend terminal
4. Restart frontend

### ❌ "Invalid token" or "Not authorized"
**Solution:**
1. Clear localStorage: Open DevTools → Application → Clear Storage
2. Log out and log back in
3. Check JWT_SECRET matches between backend and frontend

### ❌ MongoDB connection error
**Solution:**
1. If using local MongoDB: Start with `mongod` command
2. If using MongoDB Atlas: Update `MONGO_URI` with correct credentials
3. Check connection string format:
   - Local: `mongodb://localhost:27017/taxpal`
   - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/taxpal`

### ❌ Transactions not loading
**Solution:**
1. Check browser console for API error
2. Check backend terminal for database query errors
3. Verify user ID is being extracted from JWT correctly
4. Check database has data for logged-in user

### ❌ Charts not showing
**Solution:**
1. Add at least 3 transactions (income and expenses)
2. Check console for `getChartData()` output
3. Verify data structure in transactions array
4. Make sure transaction dates are valid

---

## Development & Debugging

### Enable Full Debugging

**Check Frontend Logs:**
```
Open browser DevTools (F12) → Console
Look for messages starting with [v0]
```

**Check Backend Logs:**
```
Look at backend terminal output
Messages starting with [v0] show execution flow
```

### Sample Debug Logs for Successful Connection

**Browser Console (Login Flow):**
```
[v0] Auth API URL: http://localhost:5000/api
[v0] API Call: POST http://localhost:5000/api/auth/login
[v0] Login API call
[v0] Setting auth: john@example.com
```

**Backend Terminal (Login Flow):**
```
[v0] Server running on port 5000
[v0] ✅ MongoDB connected successfully
[v0] Login request: { username: 'johndoe', password: '...' }
[v0] User logged in: john@example.com
```

**Browser Console (Dashboard Load):**
```
[v0] Transaction API URL: http://localhost:5000/api/transaction
[v0] Fetching transactions...
[v0] Transactions loaded: [{...}, {...}]
[v0] Budgets loaded: [{...}]
```

---

## File Structure Reference

```
Frontend API Layer:
├── frontend/src/api/authApi.js          ← Auth endpoints
├── frontend/src/api/transactionApi.js   ← Transaction endpoints
└── frontend/src/api/budgetApi.js        ← Budget endpoints

Frontend Context:
└── frontend/src/context/AuthContext.js  ← Global auth state

Frontend Pages:
├── frontend/src/pages/Login.jsx         ← Uses authApi
├── frontend/src/pages/Register.jsx      ← Uses authApi
├── frontend/src/pages/Dashboard.jsx     ← Uses all APIs
└── frontend/src/pages/ForgotPassword.jsx ← Uses authApi

Backend API Layer:
├── backend/routes/authRoutes.js         ← Auth routes
├── backend/routes/addtransaction.js     ← Transaction routes
└── backend/routes/budgetRoutes.js       ← Budget routes

Backend Logic:
├── backend/controllers/authController.js ← Auth logic
├── backend/controllers/transactionController.js ← Transaction logic
└── backend/controllers/budgetController.js ← Budget logic

Backend Middleware:
├── backend/middleware/authMiddleware.js  ← JWT verification
├── backend/middleware/validation.js      ← Input validation
└── backend/middleware/errorHandler.js    ← Error handling
```

---

## API Request Examples

### Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!",
    "country": "USA",
    "incomeBracket": "$50,000 - $100,000"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "SecurePass123!"
  }'
```

### Add Income (with token)
```bash
curl -X POST http://localhost:5000/api/transaction/add-income \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "description": "Monthly Salary",
    "amount": 5000,
    "category": "Salary",
    "date": "2024-12-01",
    "notes": "December salary"
  }'
```

### Get Transactions (with token)
```bash
curl -X GET http://localhost:5000/api/transaction \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Next Steps

1. **Start Backend**
   ```bash
   cd backend && npm start
   ```

2. **Start Frontend**
   ```bash
   cd frontend && npm start
   ```

3. **Test Features in Order**
   - Register new account
   - Login
   - Add transactions
   - View dashboard
   - Create budgets
   - Calculate taxes
   - Generate reports

4. **Monitor Logs**
   - Keep browser DevTools open (F12)
   - Watch backend terminal
   - Look for `[v0]` prefixed debug messages

5. **Deployment Ready**
   - Frontend: Deploy to Vercel
   - Backend: Deploy to Heroku/Railway/Render
   - Update API URLs in .env files

---

## Support & Troubleshooting

If you encounter issues:

1. Check the debug logs (both browser and backend terminal)
2. Look for `[v0]` messages - they indicate execution flow
3. Verify .env files are correctly configured
4. Ensure MongoDB is running and connected
5. Clear browser cache and localStorage
6. Restart both servers

All features are now fully connected and ready to use! 🚀
