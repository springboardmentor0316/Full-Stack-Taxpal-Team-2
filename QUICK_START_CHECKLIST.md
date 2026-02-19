# 🚀 TaxPal - Quick Start Checklist

Follow this checklist to get TaxPal running in minutes!

---

## ✅ Pre-Installation

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] MongoDB installed locally OR MongoDB Atlas account created
- [ ] Text editor/IDE ready (VS Code recommended)

---

## 🗂️ Project Structure Check

Verify you have these directories:

- [ ] `backend/` folder with server files
- [ ] `frontend/` folder with React app
- [ ] `.env.example` files in both backend and frontend

---

## 📦 Backend Setup (5 minutes)

```bash
cd backend
```

- [ ] Copy `.env.example` to `.env`
  ```bash
  cp .env.example .env
  ```

- [ ] Edit `backend/.env`:
  ```
  MONGO_URI=mongodb://localhost:27017/taxpal
  JWT_SECRET=your-32-char-secret-key-here
  PORT=5000
  NODE_ENV=development
  FRONTEND_URL=http://localhost:3000
  ```

- [ ] Install dependencies:
  ```bash
  npm install
  ```

- [ ] Expected packages:
  - [ ] express (✓ in package.json)
  - [ ] mongoose (✓ in package.json)
  - [ ] jsonwebtoken (✓ in package.json)
  - [ ] bcryptjs (✓ in package.json)
  - [ ] cors (✓ in package.json)
  - [ ] dotenv (✓ in package.json)

- [ ] Start backend:
  ```bash
  npm start
  ```

- [ ] You should see:
  ```
  [v0] ✅ MongoDB connected successfully
  [v0] 🚀 Server running on port 5000
  [v0] 🌐 API Base URL: http://localhost:5000/api
  ```

- [ ] Keep this terminal open ⚠️

---

## 📱 Frontend Setup (5 minutes)

**In a new terminal:**

```bash
cd frontend
```

- [ ] Copy `.env.example` to `.env`
  ```bash
  cp .env.example .env
  ```

- [ ] Verify `frontend/.env` contains:
  ```
  REACT_APP_API_URL=http://localhost:5000/api
  ```

- [ ] Install dependencies:
  ```bash
  npm install
  ```

- [ ] Expected packages:
  - [ ] react (19.2.3)
  - [ ] react-router-dom (7.12.0)
  - [ ] axios (1.13.4)
  - [ ] lucide-react

- [ ] Start frontend:
  ```bash
  npm start
  ```

- [ ] Browser should open automatically to `http://localhost:3000`

- [ ] You should see:
  ```
  [v0] Auth API URL: http://localhost:5000/api
  [v0] Transaction API URL: http://localhost:5000/api/transaction
  ```
  in the console (F12)

---

## 🔗 Verify Connection (2 minutes)

1. [ ] Both servers running:
   - [ ] Backend: `http://localhost:5000/api/health`
   - [ ] Frontend: `http://localhost:3000`

2. [ ] Open browser console (F12 → Console tab)

3. [ ] You should see `[v0]` debug messages

4. [ ] No CORS errors ✓

---

## 👤 Test Registration (3 minutes)

1. [ ] Click "Sign up" on login page

2. [ ] Fill registration form:
   - [ ] Full Name: `Test User`
   - [ ] Username: `testuser`
   - [ ] Email: `test@example.com`
   - [ ] Password: `TestPass123!`
   - [ ] Confirm Password: `TestPass123!`
   - [ ] Country: Select any
   - [ ] Income Bracket: Select any

3. [ ] Click "Create Account"

4. [ ] Should redirect to dashboard

5. [ ] Dashboard shows:
   - [ ] Your full name in sidebar
   - [ ] Your username (@testuser)
   - [ ] Empty transaction table
   - [ ] "No transactions yet" message

6. [ ] Check browser console for:
   ```
   [v0] Register API call with: {...}
   [v0] Setting auth: test@example.com
   ```

7. [ ] Check backend terminal for:
   ```
   [v0] Register request: {...}
   [v0] User registered: test@example.com
   [v0] ✅ MongoDB connected successfully
   ```

---

## 💰 Test Transactions (3 minutes)

### Add Income

1. [ ] Click "+ Income" button
2. [ ] Fill form:
   - [ ] Description: `Freelance Project`
   - [ ] Amount: `2000`
   - [ ] Category: `Freelance`
   - [ ] Date: Today's date
   - [ ] Notes: `Web development`
3. [ ] Click "Save"
4. [ ] Should see success message
5. [ ] Transaction appears in table immediately
6. [ ] Amount shows as green color

### Add Expense

1. [ ] Click "+ Expense" button
2. [ ] Fill form:
   - [ ] Description: `Groceries`
   - [ ] Amount: `150.50`
   - [ ] Category: `Food`
   - [ ] Date: Today's date
   - [ ] Notes: `Weekly shopping`
3. [ ] Click "Save"
4. [ ] Should see success message
5. [ ] Transaction appears in table immediately
6. [ ] Amount shows as red color

### Check Transactions

1. [ ] Verify both transactions in table:
   - [ ] Income: Freelance Project - ₹2000 (green)
   - [ ] Expense: Groceries - ₹150.50 (red)
2. [ ] Verify dates are correct
3. [ ] Verify categories are correct

---

## 🔒 Test Authentication (2 minutes)

1. [ ] Click "Logout" button
   - [ ] Redirects to login page ✓

2. [ ] Try to access `/Dashboard` directly:
   - [ ] Redirects to login page ✓

3. [ ] Log back in:
   ```
   Username: testuser
   Password: TestPass123!
   ```
   - [ ] Login successful ✓
   - [ ] Dashboard loads with previous transactions ✓

---

## 🧪 Monitor Debug Logs

**Browser Console (F12 → Console):**
```
✓ [v0] Auth API URL: http://localhost:5000/api
✓ [v0] Register API call with: {...}
✓ [v0] Setting auth: test@example.com
✓ [v0] Adding income: {...}
✓ [v0] Fetching transactions...
```

**Backend Terminal:**
```
✓ [v0] ✅ MongoDB connected successfully
✓ [v0] Register request: {...}
✓ [v0] User registered: test@example.com
✓ [v0] Login request: {...}
✓ [v0] Token verified for user: 65f7b...
✓ [v0] Adding income: {...}
✓ [v0] Fetching transactions...
```

If you see these logs, **connection is working!** ✅

---

## 📋 Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| **Can't start backend** | Check MongoDB running, port 5000 free, .env file exists |
| **Can't start frontend** | Check npm install completed, REACT_APP_API_URL set |
| **CORS Error** | Restart backend, verify FRONTEND_URL in .env |
| **Login fails** | Check backend logs, verify user in MongoDB |
| **Transactions won't save** | Check token valid, verify backend response in Network tab |
| **No debug logs** | Open DevTools (F12), check Console tab, look for [v0] prefix |
| **Blank dashboard** | Check browser console for errors, reload page |
| **Port 5000 in use** | Kill process: `lsof -i :5000` (Mac/Linux) or use different port |

---

## 🎯 What Should Work

After completing all checks:

✅ **Authentication**
- Register new user
- Login with credentials
- Logout
- Protected routes
- Token in localStorage

✅ **Transactions**
- Add income
- Add expense
- View all transactions
- Real-time updates
- Correct amounts and categories

✅ **Connection**
- Frontend calls backend API
- Backend responds correctly
- Data persists in MongoDB
- No CORS errors
- Debug logs show flow

✅ **UI**
- Dashboard displays user info
- Responsive layout
- Forms validate input
- Success/error messages
- Logout works

---

## 📚 Next Steps

Once everything is working:

1. [ ] Read [MERN_INTEGRATION_GUIDE.md](MERN_INTEGRATION_GUIDE.md) for deep dive
2. [ ] Check [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) to test APIs manually
3. [ ] Review [README_FULL_STACK.md](README_FULL_STACK.md) for features
4. [ ] Explore code in `backend/` and `frontend/`
5. [ ] Start customizing for your needs

---

## 🚀 Startup Options for Next Time

### Option 1: Scripts (Easiest)
```bash
# Linux/Mac
./start-dev.sh

# Windows
start-dev.bat
```

### Option 2: Manual (Two Terminals)
```bash
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm start
```

---

## 💡 Pro Tips

1. **Keep both terminals open** while developing
2. **Check console frequently** for `[v0]` debug logs
3. **Reload page** if you get blank screens
4. **Check Network tab** (F12 → Network) to see API calls
5. **Use MongoDB Compass** to view database
6. **Clear localStorage** if token issues: DevTools → Application → Storage

---

## ✨ Common Issues & Fixes

**"Cannot find module 'express'"**
```bash
cd backend && npm install
```

**"CORS error" in browser**
```
Restart backend after updating .env FRONTEND_URL
```

**"MongoDB connection error"**
```
Make sure: mongod is running or MONGO_URI points to Atlas
```

**"Token invalid" after logout**
```
Normal behavior - log in again with credentials
```

**"Page keeps redirecting to login"**
```
Check localStorage - should have authToken
Token might be expired - login again
```

---

## 📞 Get Help

1. Check debug logs first:
   - [ ] Browser console (F12)
   - [ ] Backend terminal
   - [ ] Look for [v0] prefixed messages

2. Read documentation:
   - [ ] MERN_INTEGRATION_GUIDE.md
   - [ ] API_TESTING_GUIDE.md
   - [ ] Troubleshooting section

3. Verify configuration:
   - [ ] Both .env files exist
   - [ ] URLs match (localhost:3000 ↔ localhost:5000)
   - [ ] MongoDB connection string is correct

4. Restart servers:
   - [ ] Stop both servers (Ctrl+C)
   - [ ] Clear browser cache (Ctrl+Shift+Delete)
   - [ ] Run again

---

## ✅ Final Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected
- [ ] Can register user
- [ ] Can login
- [ ] Can add transactions
- [ ] Can logout
- [ ] Debug logs visible
- [ ] No errors in console
- [ ] Both terminals open

**If all ✅, you're ready to develop!** 🎉

---

## 🎓 Learning Resources

- [Express.js Guide](https://expressjs.com/)
- [MongoDB Tutorial](https://docs.mongodb.com/manual/)
- [React Documentation](https://react.dev/)
- [REST API Best Practices](https://restfulapi.net/)
- [JWT Authentication](https://jwt.io/)

---

**Status**: ✅ Ready to Code  
**Time to Complete**: ~15-20 minutes  
**Difficulty**: Beginner Friendly  

Good luck! 🚀
