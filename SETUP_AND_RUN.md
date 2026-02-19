# TaxPal MERN Stack - Complete Setup and Run Guide

## ✅ All Issues Fixed

- ✅ MongoDB deprecation warning removed
- ✅ Email configuration made optional for development
- ✅ Environment files created with correct settings
- ✅ Asset import issues resolved
- ✅ All error handling improved

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js and npm installed
- MongoDB running locally: `mongod`
- Two terminal windows or VS Code split terminal

### Step 1: Start MongoDB
```bash
mongod
```
Keep this running in a terminal

### Step 2: Start Backend
```bash
cd backend
npm install
npm start
```

Expected output:
```
[v0] ✅ MongoDB connected successfully
[v0] 🚀 Server running on port 5000
[v0] 🌐 API Base URL: http://localhost:5000/api
[v0] ⚠️ Email credentials not configured. (This is OK for development)
```

### Step 3: Start Frontend
```bash
cd frontend
npm install
npm start
```

Expected output:
```
Compiled successfully!
Localhost: http://localhost:3000
```

---

## 🧪 Test the Application

### 1. Register a New User
- Go to http://localhost:3000
- Click "Register"
- Fill in all fields:
  - Full Name: John Doe
  - Username: johndoe
  - Email: test@example.com
  - Password: password123
  - Confirm Password: password123
  - Country: USA
  - Income Bracket: $50k-$100k
- Click Register

Expected response:
```
User registered successfully
Token: [jwt-token-here]
```

### 2. Login
- Click Login
- Enter username: `johndoe`
- Enter password: `password123`
- Click Login

Expected: Redirects to Dashboard

### 3. Add Transactions
- Click "Add Income" or "Add Expense"
- Fill in details
- Click Submit

Expected: Transaction appears in list, MongoDB persists data

### 4. Test Forgot Password (Development Mode)
- On Login page, click "Forgot Password"
- Enter email: `test@example.com`
- **Check backend console** for verification code (no email sent in dev mode)
- Copy the code and enter it
- Set new password
- Login with new password

---

## 📁 Project Structure

```
taxpal/
├── backend/
│   ├── .env (Created - has default config)
│   ├── controllers/
│   │   ├── authController.js (Fixed - email optional)
│   │   └── transactionController.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js (Fixed - MongoDB warning removed)
│   └── package.json
├── frontend/
│   ├── .env (Created - API URL set)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── context/
│   │   └── assets/ (Created - img1.svg)
│   ├── public/
│   └── package.json
└── Documentation files
```

---

## 🔧 Environment Configuration

### Backend .env
Located at: `backend/.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taxpal
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
# Email is optional - leave empty for development
```

### Frontend .env
Located at: `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error: "MongoDB connection error"**
- Make sure MongoDB is running: `mongod`
- Check MongoDB is on port 27017
- Try: `mongod --port 27017`

**Error: "Port 5000 already in use"**
```bash
# Kill process on port 5000
# On Mac/Linux:
lsof -i :5000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Won't Start

**Error: "Port 3000 already in use"**
```bash
# On Mac/Linux:
lsof -i :3000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Error: "Module not found"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Login Fails

1. Check backend console for error messages
2. Verify username exists in MongoDB
3. Clear browser localStorage: Press F12 → Application → LocalStorage → Clear
4. Try registering again

### Transactions Not Saving

1. Check MongoDB is connected (look for green [v0] ✅ message)
2. Check user is authenticated (JWT token in browser LocalStorage)
3. Open DevTools (F12) → Network tab → Check API calls
4. Look for [v0] logs in backend console

### Image Not Loading

- Already fixed! Using SVG placeholder now
- Located at: `frontend/src/assets/img1.svg`

---

## 📝 Development Console Logs

The app logs everything with `[v0]` prefix for easy debugging:

**Backend Console:**
```
[v0] Server Configuration:
[v0] Frontend URL: http://localhost:3000
[v0] ✅ MongoDB connected successfully
[v0] Register request: {...}
[v0] Login request: {...}
```

**Frontend Console (F12):**
```
[v0] Auth API URL: http://localhost:5000/api
[v0] Register API call with: {...}
[v0] Login API call
```

---

## 🔐 Security Features Implemented

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes (redirect to login if not authenticated)
- CORS protection (only localhost:3000 allowed)
- Input validation on both frontend and backend
- HttpOnly cookies for sensitive data (future enhancement)

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/verify-token` - Verify reset token
- `POST /api/auth/set-password` - Set new password
- `POST /api/auth/resend-code` - Resend verification code

### Transactions (Protected)
- `GET /api/transaction/` - Get all transactions
- `POST /api/transaction/add-income` - Add income
- `POST /api/transaction/add-expense` - Add expense

All transaction endpoints require `Authorization: Bearer <token>` header

---

## 📈 What Works Now

✅ User registration with validation
✅ Secure login with JWT
✅ Protected dashboard (redirects if not logged in)
✅ Add income/expense transactions
✅ View transaction history
✅ Password reset flow (dev mode shows code in console)
✅ Logout functionality
✅ MongoDB persistence
✅ CORS communication between frontend and backend

---

## 🎯 Next Steps

1. Run the app using the Quick Start guide above
2. Test all features (register, login, add transactions)
3. Check console logs for debugging
4. Once working, you can customize:
   - Add more features
   - Deploy to Vercel/Heroku
   - Set up email for production
   - Add database backups

---

## 📞 Still Have Issues?

Check these files for more details:
- `MERN_INTEGRATION_GUIDE.md` - Complete integration guide
- `API_TESTING_GUIDE.md` - Test API endpoints with curl
- `QUICK_START_CHECKLIST.md` - 15-minute checklist

**Happy coding!** 🚀
