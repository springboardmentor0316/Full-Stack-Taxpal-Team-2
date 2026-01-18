# TaxPal MERN Stack Setup Guide

This is a complete MERN (MongoDB, Express, React, Node.js) stack application with authentication, password reset, and user registration.

## Project Structure

```
FullStackTaxpalTeam2dev/
├── backend/                    # Node.js/Express server
│   ├── controllers/           # Auth logic
│   ├── middleware/            # Validation & error handling
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API routes
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies
│   └── .env.example           # Environment variables template
│
└── frontend/                   # React app
    ├── src/
    │   ├── pages/             # Login, Register, ForgotPassword, etc.
    │   ├── context/           # AuthContext for state management
    │   ├── api/               # API service
    │   ├── utils/             # Validation utilities
    │   ├── styles/            # CSS files
    │   ├── assets/            # Images
    │   ├── App.js             # Router setup
    │   └── index.js           # Entry point with AuthProvider
    ├── package.json
    └── .env.example
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your values:
   ```
   MONGODB_URI=mongodb://localhost:27017/taxpal
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taxpal
   
   JWT_SECRET=your-super-secret-key-change-this
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   
   # For email functionality (optional, uses Gmail SMTP)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   ```

5. Start the server:
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. Start the development server:
   ```bash
   npm start
   ```
   
   App will open on `http://localhost:3000`

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register new user
  ```json
  {
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "country": "USA",
    "incomeBracket": "$50,000 - $100,000"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```

- `POST /api/auth/forgot-password` - Request password reset
  ```json
  {
    "email": "john@example.com"
  }
  ```

- `POST /api/auth/verify-token` - Verify reset token
  ```json
  {
    "token": "reset-token-here",
    "email": "john@example.com"
  }
  ```

- `POST /api/auth/set-password` - Set new password
  ```json
  {
    "token": "reset-token-here",
    "email": "john@example.com",
    "password": "newpassword123",
    "confirmPassword": "newpassword123"
  }
  ```

## Features Implemented

### Backend
- Express.js server with CORS support
- MongoDB integration with Mongoose ODM
- JWT authentication
- Password hashing with bcryptjs
- Email verification with nodemailer
- Input validation middleware
- Error handling middleware
- Reset token generation and expiry

### Frontend
- React with React Router for navigation
- AuthContext for global state management
- Form validation on client side
- API service layer for clean code
- Error handling and user feedback
- Loading states on buttons
- Protected routes ready (can be added)

## File Descriptions

### Backend Files

**server.js**
- Main server entry point
- Connects to MongoDB
- Sets up middleware and routes
- Error handler middleware

**controllers/authController.js**
- Register logic
- Login logic
- Forgot password flow
- Password reset logic
- Email sending

**models/User.js**
- User schema with fields: fullName, username, email, password, country, incomeBracket, resetToken, resetTokenExpiry

**routes/authRoutes.js**
- All authentication endpoints

**middleware/validation.js**
- Input validation for register, login, forgot password
- Email format validation

**middleware/errorHandler.js**
- Global error handling

### Frontend Files

**context/AuthContext.js**
- Global auth state management
- setAuth function to save token and user
- logout function
- useAuth hook for components

**api/authApi.js**
- API service with methods: register, login, forgotPassword, verifyResetToken, setPassword
- Error handling and logging

**pages/Login.jsx**
- Login form with username and password
- Integrates with authApi.login()
- Stores token in AuthContext
- Links to register and forgot password

**pages/Register.jsx**
- Registration form with all user fields
- Client-side validation
- Integrates with authApi.register()
- Redirects to login on success

**pages/ForgotPassword.jsx**
- Email input form
- Calls authApi.forgotPassword()
- Redirects to verify code page

**pages/VerifyCode.jsx**
- Verification code input
- Calls authApi.verifyResetToken()
- Redirects to set password

**pages/SetPassword.jsx**
- New password form
- Calls authApi.setPassword()
- Redirects to login

**utils/validation.js**
- Email validation
- Password validation
- Username validation
- Form validation for different forms

## Running Both Servers

### Option 1: In Separate Terminals
1. Terminal 1 (Backend):
   ```bash
   cd backend && npm run dev
   ```

2. Terminal 2 (Frontend):
   ```bash
   cd frontend && npm start
   ```

### Option 2: Using concurrently (from root)
1. Install concurrently in root:
   ```bash
   npm install -g concurrently
   ```

2. From root directory:
   ```bash
   concurrently "cd backend && npm run dev" "cd frontend && npm start"
   ```

## Testing the Application

1. Open `http://localhost:3000`
2. Click "Sign up" to register a new account
3. Fill in the registration form and click "Create Account"
4. You should be logged in and redirected
5. To test forgot password:
   - Click logout (or go to Login page)
   - Click "Forgot password?"
   - Enter email (you won't receive actual email unless configured)
   - Enter the verification code
   - Set new password

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your Atlas connection string
- Check `.env` file has correct `MONGODB_URI`

### CORS Error
- Make sure backend is running on port 5000
- Check `FRONTEND_URL` in backend `.env`

### API Not Found
- Verify `REACT_APP_API_URL` in frontend `.env`
- Check backend console for errors

### Email Not Sending
- Configure Gmail app password in `.env`
- Enable "Less secure apps" on Gmail account

## Security Notes

- Change `JWT_SECRET` in production
- Use environment variables for all sensitive data
- Implement HTTPS in production
- Add rate limiting for API endpoints
- Implement JWT refresh tokens for production
- Add input sanitization for production

## Next Steps

- Add protected routes that check for valid token
- Add user profile page
- Add logout functionality
- Add remember me functionality
- Implement email verification on signup
- Add social authentication (Google, GitHub)
- Deploy to production (Vercel for frontend, Heroku/Railway for backend)
