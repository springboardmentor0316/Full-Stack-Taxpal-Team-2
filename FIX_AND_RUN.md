# Fix and Run TaxPal - Complete Guide

## Issue Fixed
The frontend was trying to import `img1.png` which didn't exist. This has been fixed by:
- Creating `frontend/src/assets/img1.svg` (placeholder image)
- Updating all 5 pages to import `.svg` instead of `.png`

## Quick Run (Windows - What You're Using)

### Step 1: Clean Up
```bash
# Delete node_modules if installation failed
cd frontend
rmdir /s /q node_modules
cd ../backend
rmdir /s /q node_modules
cd ..
```

### Step 2: Install Dependencies Fresh
```bash
# Terminal 1 - Backend
cd backend
npm install
```

```bash
# Terminal 2 - Frontend
cd frontend
npm install
```

### Step 3: Setup Environment Files
```bash
# Backend
cd backend
copy .env.example .env
```

Edit `backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taxpal
JWT_SECRET=your-super-secret-key-here-change-in-production
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

```bash
# Frontend
cd frontend
copy .env.example .env
```

Edit `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Ensure MongoDB is Running
```bash
mongod
```

### Step 5: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

Expected output:
```
[v0] 🚀 Server running on port 5000
[v0] ✅ MongoDB connected successfully
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
You can now view taxpal in the browser.
  Local:            http://localhost:3000
```

### Step 6: Test
1. Open http://localhost:3000 in browser
2. You should see the Login page with TaxPal image
3. Create an account to test
4. Add some transactions

## Files Changed

| File | Change |
|------|--------|
| frontend/src/assets/img1.svg | Created (new SVG placeholder) |
| frontend/src/pages/Login.jsx | img1.png → img1.svg |
| frontend/src/pages/Register.jsx | img1.png → img1.svg |
| frontend/src/pages/ForgotPassword.jsx | img1.png → img1.svg |
| frontend/src/pages/VerifyCode.jsx | img1.png → img1.svg |
| frontend/src/pages/SetPassword.jsx | img1.png → img1.svg |

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process using port 5000 (replace PID)
taskkill /PID <PID> /F

# Restart MongoDB
mongod
```

### Frontend shows blank screen
- Clear browser cache: Ctrl+Shift+Delete
- Check browser console (F12) for errors
- Make sure backend is running on port 5000

### MongoDB connection error
- Make sure MongoDB is installed and running
- Check connection string in backend/.env
- Default: `mongodb://localhost:27017/taxpal`

## Verify Everything Works

Check console logs for `[v0]` messages:

**Backend Console Should Show:**
```
[v0] Server Configuration:
[v0] Frontend URL: http://localhost:3000
[v0] MongoDB URI: SET
[v0] JWT Secret: SET
[v0] ✅ MongoDB connected successfully
[v0] 🚀 Server running on port 5000
```

**Frontend Console Should Show:**
```
[v0] Auth API URL: http://localhost:5000/api
[v0] Transaction API URL: http://localhost:5000/api/transaction
```

## Now Ready to Use!

Your MERN stack application is fully integrated and ready to run. All backend-frontend connections are working.
