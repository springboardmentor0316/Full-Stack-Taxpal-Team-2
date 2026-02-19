# TaxPal - Quick Start Guide

## 🚀 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### 2. Setup Environment Variables

**Backend** - `backend/.env`
```
MONGO_URI=mongodb://localhost:27017/taxpal
JWT_SECRET=dev-secret-key-change-in-production
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend** - `frontend/.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB
```bash
mongod
```
(Keep this running in a separate terminal)

### 4. Run Both Servers
```bash
npm run dev
```

This will start:
- ✅ Backend: http://localhost:5000
- ✅ Frontend: http://localhost:3000

## 🎯 Test the Integration

### 1. Open Frontend
Visit `http://localhost:3000`

### 2. Create Account
- Click "Register"
- Fill in details (use any test data)
- Click "Register"

### 3. Login
- Use the credentials you just created
- Should redirect to Dashboard

### 4. Update Profile
- Click "My Profile" (if available in dashboard)
- Click "Edit Profile"
- Change any fields (name, phone, location, etc.)
- Click "Save Changes"
- ✅ Profile should update via API

## 📋 What Was Integrated

✅ **Profile Management API** - Get and update user profiles  
✅ **Authentication** - Login, Register, Password Reset  
✅ **Protected Routes** - Dashboard and Profile pages  
✅ **Error Handling** - User-friendly error messages  
✅ **Console Logging** - Debug with `[v0]` prefix  

## 🔧 Running Servers Separately

**Terminal 1 - Backend**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend**
```bash
npm run dev:frontend
```

## ❌ Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `lsof -ti:3000 \| xargs kill` |
| Port 5000 in use | `lsof -ti:5000 \| xargs kill` |
| MongoDB error | Start MongoDB: `mongod` |
| API not connecting | Check REACT_APP_API_URL in frontend/.env |
| Token errors | Clear browser storage, login again |

## 📚 Full Documentation

See `INTEGRATION_COMPLETE.md` for:
- Complete API endpoint documentation
- Detailed troubleshooting guide
- Production deployment guide
- Architecture overview

---

**Status:** ✅ Ready to Use - Both frontend and backend fully integrated!
