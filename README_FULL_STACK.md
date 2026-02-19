# 🏛️ TaxPal - Full Stack MERN Application

A complete, production-ready MERN (MongoDB, Express, React, Node.js) stack application for personal tax and expense management.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-v14%2B-green)
![MongoDB](https://img.shields.io/badge/mongodb-latest-green)
![React](https://img.shields.io/badge/react-19.2.3-blue)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Frontend Usage](#-frontend-usage)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## ✨ Features

### Authentication & Security
- ✅ User registration with input validation
- ✅ Secure login with JWT tokens
- ✅ Password reset via email verification
- ✅ Protected routes (frontend & backend)
- ✅ CORS security
- ✅ Password hashing with bcryptjs

### Transaction Management
- ✅ Add income and expense transactions
- ✅ Categorize transactions
- ✅ Date-based tracking
- ✅ Real-time transaction display
- ✅ View transaction history
- ✅ Data persistence in MongoDB

### User Experience
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Modern UI with Lucide icons
- ✅ Real-time form validation
- ✅ Error handling and user feedback
- ✅ Loading states on buttons
- ✅ Smooth animations and transitions

### Developer Experience
- ✅ Debug logging with `[v0]` prefix
- ✅ Comprehensive error messages
- ✅ Environment-based configuration
- ✅ API testing guide included
- ✅ Startup scripts for easy development

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs, CORS
- **Email**: Nodemailer
- **Process Manager**: Nodemon (development)

### Frontend
- **Framework**: React 19.2.3
- **Router**: React Router v7
- **HTTP Client**: Axios + Fetch API
- **Icons**: Lucide React
- **State Management**: React Context API
- **CSS**: CSS (custom styling)

### Deployment Ready
- Express.js for production
- MongoDB Atlas for cloud database
- Environment variable configuration
- CORS configuration for production

---

## 📁 Project Structure

```
TaxPal/
├── backend/                           # Node.js + Express API
│   ├── controllers/
│   │   ├── authController.js          # Auth logic (register, login, password reset)
│   │   └── transactionController.js   # Transaction CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js          # JWT verification
│   │   ├── errorHandler.js            # Global error handling
│   │   └── validation.js              # Input validation
│   ├── models/
│   │   ├── User.js                    # User schema
│   │   └── Transaction.js             # Transaction schema
│   ├── routes/
│   │   ├── authRoutes.js              # Auth endpoints
│   │   └── addtransaction.js          # Transaction endpoints
│   ├── server.js                      # Main server file
│   ├── package.json
│   └── .env.example
│
├── frontend/                          # React Application
│   ├── src/
│   │   ├── api/
│   │   │   ├── authApi.js             # Auth API calls
│   │   │   └── transactionApi.js      # Transaction API calls
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx     # Route protection wrapper
│   │   │   ├── add-Inc.jsx            # Add income modal
│   │   │   ├── add-Exp.jsx            # Add expense modal
│   │   │   └── comstyles/
│   │   ├── context/
│   │   │   └── AuthContext.js         # Auth state management
│   │   ├── pages/
│   │   │   ├── Login.jsx              # Login page
│   │   │   ├── Register.jsx           # Registration page
│   │   │   ├── Dashboard.jsx          # Main dashboard
│   │   │   ├── ForgotPassword.jsx     # Password reset request
│   │   │   ├── VerifyCode.jsx         # Code verification
│   │   │   └── SetPassword.jsx        # New password entry
│   │   ├── styles/                    # Page-specific styles
│   │   ├── App.js                     # Route configuration
│   │   └── index.js                   # Entry point
│   ├── package.json
│   └── .env.example
│
├── MERN_INTEGRATION_GUIDE.md          # Complete integration guide
├── API_TESTING_GUIDE.md               # API testing documentation
├── SETUP_GUIDE.md                     # Original setup guide
├── start-dev.sh                       # Linux/Mac startup script
├── start-dev.bat                      # Windows startup script
├── LICENSE
└── README_FULL_STACK.md               # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v14.0.0 or higher
- **npm/yarn**: Latest version
- **MongoDB**: Local or Atlas account
- **Git**: For version control

### Installation & Running

#### Option 1: Automated Startup (Linux/Mac)
```bash
# Make script executable
chmod +x start-dev.sh

# Run
./start-dev.sh
```

#### Option 2: Automated Startup (Windows)
```bash
# Double-click start-dev.bat
# OR run in Command Prompt
start-dev.bat
```

#### Option 3: Manual Setup

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm start
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
# Keep REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start
# Opens http://localhost:3000
```

### Verify Connection
1. Open http://localhost:3000
2. Register a new account
3. Check browser console (F12) for debug logs starting with `[v0]`
4. Check backend terminal for connection logs
5. Add a transaction to verify full integration

---

## ⚙️ Configuration

### Backend .env

```env
# Database
MONGO_URI=mongodb://localhost:27017/taxpal
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/taxpal

# JWT
JWT_SECRET=your-32-character-secret-key-minimum

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000

# Email (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Frontend .env

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Environment Examples

**Development:**
```env
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/taxpal
FRONTEND_URL=http://localhost:3000
```

**Production:**
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/taxpal
FRONTEND_URL=https://yourdomain.com
JWT_SECRET=<generate-strong-secret>
```

---

## 📚 API Documentation

### Authentication

**Register:**
```bash
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
```

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123!"
}
```

### Transactions (Authenticated)

**Add Income:**
```bash
POST /api/transaction/add-income
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Monthly Salary",
  "amount": 5000,
  "category": "Salary",
  "date": "2024-12-01T00:00:00Z",
  "notes": "December salary"
}
```

**Add Expense:**
```bash
POST /api/transaction/add-expense
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Groceries",
  "amount": 150,
  "category": "Food",
  "date": "2024-12-01T00:00:00Z",
  "notes": "Weekly shopping"
}
```

**Get Transactions:**
```bash
GET /api/transaction
Authorization: Bearer <token>
```

See [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) for complete API documentation and curl examples.

---

## 💻 Frontend Usage

### Login/Register Flow
1. User lands on login page (/)
2. Click "Sign up" to register
3. Fill registration form (validation applied)
4. Automatically logged in after registration
5. Redirected to dashboard

### Dashboard Features
- View user profile
- Add income/expenses via modal
- View transaction history
- Responsive sidebar navigation
- Logout button

### Protected Routes
- `/Dashboard` - Requires authentication
- `/AddExpenseForm` - Requires authentication
- `/AddIncomeForm` - Requires authentication

Unauthenticated users are redirected to login.

### State Management

```javascript
// In any component
import { useAuth } from "../context/AuthContext";

const { token, user, setAuth, logout, isAuthenticated } = useAuth();

// After login
setAuth(token, userData);

// Logout
logout();
```

---

## 🌍 Deployment

### Deploy Backend (Heroku Example)

```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=<your-mongo-atlas-uri>
heroku config:set JWT_SECRET=<your-secret>
heroku config:set FRONTEND_URL=<your-frontend-url>
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs -t
```

### Deploy Frontend (Vercel Example)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
# REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

### MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud](https://www.mongodb.com/cloud)
2. Create a cluster
3. Create database user
4. Whitelist your IP
5. Copy connection string
6. Update `MONGO_URI` in backend `.env`

---

## 🐛 Troubleshooting

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update `FRONTEND_URL` in backend `.env` and restart backend

### MongoDB Connection Error
```
MongoDB connection error: connect ECONNREFUSED
```
**Solution:** Ensure MongoDB is running or update `MONGO_URI` for Atlas

### Token Expired/Invalid
```
"Invalid token" or "Token expired"
```
**Solution:** Clear localStorage and login again

### API Not Found (404)
```
Cannot POST /api/auth/register
```
**Solution:** Check `REACT_APP_API_URL` in frontend `.env` and verify backend is running

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill process on port or change PORT in `.env`

See [MERN_INTEGRATION_GUIDE.md](MERN_INTEGRATION_GUIDE.md) for more troubleshooting.

---

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  fullName: String (required),
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed, required),
  country: String,
  incomeBracket: String,
  profileImage: String,
  resetToken: String,
  resetTokenExpiry: Date,
  createdAt: Date
}
```

### Transaction Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  type: String ("income" | "expense", required),
  description: String,
  amount: Number,
  category: String,
  date: Date,
  notes: String,
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
}
```

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token verification on protected routes
- ✅ CORS protection
- ✅ Input validation on both frontend and backend
- ✅ Error messages don't leak sensitive info
- ✅ Protected routes prevent unauthorized access
- ✅ Database constraints (unique email/username)

### Security Best Practices Implemented

1. **Password Security**
   - Bcryptjs hashing with salt rounds
   - Never stored in plain text
   - Verification on login

2. **Token Security**
   - JWT with expiration (7 days default)
   - Stored in localStorage (browser)
   - Sent in Authorization header
   - Verified on backend for protected routes

3. **API Security**
   - CORS whitelist for frontend only
   - Request validation
   - Error handling without leaking details
   - Rate limiting ready (can be added)

4. **Database Security**
   - Mongoose schema validation
   - Unique constraints on email/username
   - References between collections

---

## 📈 Performance

- Optimized MongoDB queries with indexes
- Lazy loading of components
- Real-time UI updates
- Efficient state management
- API response caching ready

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

---

## 📞 Support

For issues and questions:

1. Check [MERN_INTEGRATION_GUIDE.md](MERN_INTEGRATION_GUIDE.md)
2. See [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md)
3. Review debug logs in console (F12) and terminal
4. Verify `.env` configuration
5. Ensure MongoDB is running

---

## 🚀 Next Steps

After successful setup:

1. Customize styling and branding
2. Add more transaction categories
3. Implement budget tracking
4. Create financial reports
5. Add data export (CSV/PDF)
6. Implement notifications
7. Add social login (Google, GitHub)
8. Deploy to production

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT.io](https://jwt.io/)
- [Mongoose ODM](https://mongoosejs.com/)
- [Axios Documentation](https://axios-http.com/)

---

## ✅ Quick Checklist

- [ ] Node.js v14+ installed
- [ ] MongoDB running (local or Atlas)
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Backend started (`npm start` in backend/)
- [ ] Frontend started (`npm start` in frontend/)
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Dashboard loads with user info
- [ ] Can add income/expense
- [ ] Transactions appear in table
- [ ] Can logout

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Status**: Production Ready ✅

---

## 🎉 Thank You!

This is a complete, production-ready MERN application. All frontend and backend are fully integrated and connected. Happy coding!
