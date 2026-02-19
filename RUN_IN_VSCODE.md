# How to Run TaxPal in VS Code

## Prerequisites
- VS Code installed
- Node.js (v14+) and npm installed
- MongoDB running locally or MongoDB Atlas connection string
- Git (optional)

---

## Step 1: Open Project in VS Code

1. Open VS Code
2. Click **File → Open Folder**
3. Navigate to your project folder and open it
4. You'll see the project structure:
   ```
   ├── backend/
   ├── frontend/
   ├── package.json
   └── other files...
   ```

---

## Step 2: Create Environment Files

### Create Backend Environment File
1. In VS Code, right-click on **backend** folder → **New File**
2. Name it `.env`
3. Paste this content:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taxpal
JWT_SECRET=your_secret_key_here_change_this_to_something_random
NODE_ENV=development
```

**If using MongoDB Atlas instead:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taxpal?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here_change_this_to_something_random
NODE_ENV=development
```

### Create Frontend Environment File
1. Right-click on **frontend** folder → **New File**
2. Name it `.env.local`
3. Paste this content:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BASE_URL=http://localhost:5000
```

---

## Step 3: Install Dependencies

### Open Terminal in VS Code
Press `Ctrl + `` (backtick) to open the integrated terminal

### Install Backend Dependencies
```bash
cd backend
npm install
```
Wait for it to complete (2-3 minutes)

### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```
Wait for it to complete (3-5 minutes)

---

## Step 4: Start MongoDB (if using local)

Open a new terminal and run:
```bash
mongod
```

If MongoDB is not installed locally, use MongoDB Atlas instead (update MONGODB_URI in backend/.env)

---

## Step 5: Start Both Servers

### Option A: Run in Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
You should see:
```
Server running on port 5000
Connected to MongoDB
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
You should see:
```
Compiled successfully!
Local: http://localhost:3000
```
Browser will open automatically.

---

### Option B: Run Both from Root with Script

In the root terminal:
```bash
npm run dev
```

---

## Step 6: Test the Application

Open your browser and go to: `http://localhost:3000`

### Quick Test:
1. **Register** - Click "Sign Up" and create account
2. **Login** - Log in with your credentials
3. **Add Income** - Click "Add Income" button
4. **Add Expense** - Click "Add Expense" button
5. **View Dashboard** - See all transactions and stats

---

## Using VS Code Split Terminal (Advanced)

You can see both terminals at once:

1. Open terminal: `Ctrl + ``
2. Start backend: `cd backend && npm start`
3. Click the **Split Terminal** icon (right side of terminal tab)
4. In the new terminal: `cd frontend && npm start`

Now you can see both servers running side-by-side!

---

## Common Issues & Solutions

### Issue 1: "Port 5000 already in use"
**Solution:** 
```bash
# Kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

Then restart: `npm start`

---

### Issue 2: "MongoDB connection failed"
**Solution:**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `backend/.env` is correct
- If using Atlas, verify IP whitelist includes your IP

---

### Issue 3: "npm modules not found"
**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### Issue 4: Port 3000 already in use (React)
**Solution:**
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

---

### Issue 5: CORS Error in Console
**Solution:** Make sure `REACT_APP_API_URL` in `frontend/.env.local` matches your backend URL
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Then restart frontend: `npm start`

---

## Useful VS Code Extensions

Install these for better development:

1. **Thunder Client** or **REST Client** - Test API calls
2. **MongoDB for VS Code** - Browse MongoDB databases
3. **ES7+ React/Redux/React-Native snippets** - React snippets
4. **Prettier - Code formatter** - Auto-format code
5. **Error Lens** - Show errors inline

---

## File Structure Reference

```
FullStackTaxpalTeam2devtest2/
├── backend/
│   ├── controllers/         # Business logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth, error handling
│   ├── .env               # Environment variables
│   ├── server.js          # Main server file
│   └── package.json
│
├── frontend/
│   ├── public/            # Static files
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── components/    # React components
│   │   ├── api/           # API calls
│   │   ├── context/       # Auth context
│   │   ├── styles/        # CSS files
│   │   └── App.js         # Main app
│   ├── .env.local         # Frontend env vars
│   └── package.json
│
└── package.json           # Root package (optional)
```

---

## API Endpoints Reference

Once backend is running, test these endpoints:

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Reset password
- `POST /api/auth/verify-code` - Verify reset code
- `POST /api/auth/set-password` - Set new password

### Transactions
- `GET /api/transactions` - Get all user transactions
- `POST /api/transactions/add` - Add new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Budgets
- `GET /api/budgets` - Get all user budgets
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

---

## Debugging Tips

### Debug Backend
1. Open `backend/server.js`
2. Click left margin on line numbers to add breakpoints (red dots)
3. Run with: `npm start`
4. Execution pauses at breakpoints

### Debug Frontend
1. Press `F12` in browser to open Developer Tools
2. Go to **Console** tab to see logs
3. Go to **Network** tab to see API calls
4. Go to **Application** tab to see stored data

### View Logs
```bash
# Backend logs show in terminal where you ran: npm start
# Frontend logs show in terminal where you ran: npm start
```

---

## Production Deployment Checklist

Before deploying:
- [ ] Update `REACT_APP_API_URL` to production backend URL
- [ ] Update `JWT_SECRET` to strong random string
- [ ] Update `MONGODB_URI` to production database
- [ ] Set `NODE_ENV=production`
- [ ] Remove debug console.log statements
- [ ] Test all features thoroughly

---

## Next Steps

1. Start both servers using the steps above
2. Test registration and login
3. Add some transactions
4. Check the dashboard
5. Read `CONNECTION_VERIFICATION_CHECKLIST.md` to verify all connections work

**Everything is ready to run!** 🚀
