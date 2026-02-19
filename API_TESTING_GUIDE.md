# TaxPal API Testing Guide

This guide provides curl commands and examples for testing all TaxPal API endpoints.

## Prerequisites

- Backend running on `http://localhost:5000`
- curl or Postman installed
- MongoDB running

## Environment Variables

Set these in your terminal for easier testing:

```bash
# Linux/Mac
export API_URL="http://localhost:5000/api"
export AUTH_TOKEN="your-jwt-token-here"

# Windows (PowerShell)
$API_URL = "http://localhost:5000/api"
$AUTH_TOKEN = "your-jwt-token-here"
```

---

## 📋 Authentication Endpoints

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "message": "Server is running",
  "timestamp": "2024-12-01T10:30:00.000Z",
  "environment": "development"
}
```

### 2. Register New User

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

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f7b123abc456def789gh",
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Common Errors:**
- `400 Bad Request` - Missing required fields
- `400 Bad Request` - Email or username already exists
- `400 Bad Request` - Passwords do not match

### 3. Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "SecurePass123!"
  }'
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f7b123abc456def789gh",
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "profileImage": null
  }
}
```

**Save the token for next requests:**
```bash
# After successful login, save the token
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 4. Forgot Password

```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Expected Response (200):**
```json
{
  "message": "Verification code sent to your email",
  "success": true
}
```

**Note:** Email sending requires proper email configuration in `.env`

### 5. Verify Reset Token

```bash
curl -X POST http://localhost:5000/api/auth/verify-token \
  -H "Content-Type: application/json" \
  -d '{
    "token": "8-char-code-or-full-token",
    "email": "john@example.com"
  }'
```

**Expected Response (200):**
```json
{
  "message": "Token verified successfully"
}
```

### 6. Set New Password

```bash
curl -X POST http://localhost:5000/api/auth/set-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "8-char-code-or-full-token",
    "email": "john@example.com",
    "password": "NewSecurePass123!",
    "confirmPassword": "NewSecurePass123!"
  }'
```

**Expected Response (200):**
```json
{
  "message": "Password reset successfully"
}
```

### 7. Resend Verification Code

```bash
curl -X POST http://localhost:5000/api/auth/resend-code \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Expected Response (200):**
```json
{
  "message": "Verification code resent to your email",
  "success": true
}
```

---

## 💰 Transaction Endpoints (Protected - Require Token)

All transaction endpoints require Bearer token in Authorization header:

```bash
Authorization: Bearer <token>
```

### 1. Add Income

```bash
curl -X POST http://localhost:5000/api/transaction/add-income \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "description": "Monthly Salary",
    "amount": 5000,
    "category": "Salary",
    "date": "2024-12-01T00:00:00Z",
    "notes": "December salary"
  }'
```

**Expected Response (201):**
```json
{
  "_id": "65f7c123abc456def789gh",
  "user": "65f7b123abc456def789gh",
  "type": "income",
  "description": "Monthly Salary",
  "amount": 5000,
  "category": "Salary",
  "date": "2024-12-01T00:00:00.000Z",
  "notes": "December salary",
  "createdAt": "2024-12-01T10:30:00.000Z",
  "updatedAt": "2024-12-01T10:30:00.000Z",
  "__v": 0
}
```

### 2. Add Expense

```bash
curl -X POST http://localhost:5000/api/transaction/add-expense \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "description": "Grocery Shopping",
    "amount": 150.50,
    "category": "Food",
    "date": "2024-12-01T00:00:00Z",
    "notes": "Weekly groceries at Walmart"
  }'
```

**Expected Response (201):**
```json
{
  "_id": "65f7d123abc456def789gh",
  "user": "65f7b123abc456def789gh",
  "type": "expense",
  "description": "Grocery Shopping",
  "amount": 150.50,
  "category": "Food",
  "date": "2024-12-01T00:00:00.000Z",
  "notes": "Weekly groceries at Walmart",
  "createdAt": "2024-12-01T10:32:00.000Z",
  "updatedAt": "2024-12-01T10:32:00.000Z",
  "__v": 0
}
```

### 3. Get All Transactions

```bash
curl -X GET http://localhost:5000/api/transaction \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response (200):**
```json
[
  {
    "_id": "65f7c123abc456def789gh",
    "user": "65f7b123abc456def789gh",
    "type": "income",
    "description": "Monthly Salary",
    "amount": 5000,
    "category": "Salary",
    "date": "2024-12-01T00:00:00.000Z",
    "createdAt": "2024-12-01T10:30:00.000Z"
  },
  {
    "_id": "65f7d123abc456def789gh",
    "user": "65f7b123abc456def789gh",
    "type": "expense",
    "description": "Grocery Shopping",
    "amount": 150.50,
    "category": "Food",
    "date": "2024-12-01T00:00:00.000Z",
    "createdAt": "2024-12-01T10:32:00.000Z"
  }
]
```

---

## 🔐 Authentication Errors

### Missing Token
```bash
curl -X GET http://localhost:5000/api/transaction
```

**Response (401):**
```json
{
  "message": "Not authorized - missing token"
}
```

### Invalid Token Format
```bash
curl -X GET http://localhost:5000/api/transaction \
  -H "Authorization: InvalidTokenFormat"
```

**Response (401):**
```json
{
  "message": "Not authorized - invalid token format"
}
```

### Expired Token
```bash
curl -X GET http://localhost:5000/api/transaction \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.old.token"
```

**Response (401):**
```json
{
  "message": "Token expired"
}
```

---

## 📊 Complete Testing Workflow

### Step 1: Register a User

```bash
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123!",
    "confirmPassword": "TestPass123!",
    "country": "USA",
    "incomeBracket": "$50,000 - $100,000"
  }')

echo "Register Response:"
echo $REGISTER_RESPONSE | jq .
```

### Step 2: Extract and Save Token

```bash
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
echo "Token: $TOKEN"
```

### Step 3: Add Income

```bash
curl -X POST http://localhost:5000/api/transaction/add-income \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "description": "Freelance Project",
    "amount": 2000,
    "category": "Freelance",
    "date": "2024-12-01T00:00:00Z",
    "notes": "Web development project"
  }' | jq .
```

### Step 4: Add Expense

```bash
curl -X POST http://localhost:5000/api/transaction/add-expense \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "description": "Software License",
    "amount": 99.99,
    "category": "Software",
    "date": "2024-12-01T00:00:00Z",
    "notes": "Annual license renewal"
  }' | jq .
```

### Step 5: Get All Transactions

```bash
curl -X GET http://localhost:5000/api/transaction \
  -H "Authorization: Bearer $TOKEN" | jq .
```

---

## 🧪 Using Postman

1. Download Postman from [postman.com](https://postman.com)
2. Create a new Collection: "TaxPal API"
3. Create requests for each endpoint
4. Set up environment variables:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (save from login response)

### Postman Variables Script

In the "Tests" tab after login, add:
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
pm.environment.set("userId", jsonData.user.id);
```

Then use `{{token}}` in Authorization headers for protected routes.

---

## 🐛 Debugging Tips

### See Full Request/Response with Headers

```bash
curl -v -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "SecurePass123!"}'
```

### Pretty Print JSON Response

```bash
curl -s http://localhost:5000/api/health | jq .
```

### Save Response to File

```bash
curl -s http://localhost:5000/api/health > response.json
```

### Check Backend Logs

Monitor these messages in backend terminal:
```
[v0] Login request: {...}
[v0] Token verified for user: 65f7b123abc456def789gh
[v0] Adding income: {...}
```

---

## 📝 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `Connection refused` | Backend not running. Start with `npm start` in backend folder |
| `CORS error` | Check `FRONTEND_URL` in backend `.env` |
| `Missing token` | Add `Authorization: Bearer <token>` header |
| `Invalid token` | Token expired or malformed. Login again |
| `Username already exists` | Use different username or delete user from MongoDB |
| `Email not sent` | Configure email in `.env` or check console |

---

## 🚀 Advanced Testing

### Load Testing (with Apache Bench)

```bash
# Test endpoint with 1000 requests
ab -n 1000 -c 10 http://localhost:5000/api/health
```

### Monitor Network Traffic

```bash
# Linux/Mac
tcpdump -i lo0 -n port 5000

# Windows
netsh trace start capture=yes
netsh trace stop
```

---

**Last Updated:** December 2024
