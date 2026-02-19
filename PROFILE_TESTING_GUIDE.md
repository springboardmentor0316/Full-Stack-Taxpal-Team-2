# Profile Section - Complete Testing Guide

## Prerequisites

Before testing, ensure you have:
1. ✅ MongoDB running locally or connection string in `.env`
2. ✅ Backend server running on `http://localhost:5000`
3. ✅ Frontend running on `http://localhost:3000`
4. ✅ A test user account created (register via signup)

## Step-by-Step Testing

### 1. **Initial Setup & Registration**

```bash
# Terminal 1 - Start Backend
cd backend
npm install
npm start
# Should see: "[v0] 🚀 Server running on port 5000"

# Terminal 2 - Start Frontend  
cd frontend
npm install
npm start
# Should see: Frontend running on http://localhost:3000
```

### 2. **Test User Registration**

1. Open browser to `http://localhost:3000`
2. Click "Sign Up" or navigate to register page
3. Fill in registration form:
   - Full Name: `John Doe`
   - Username: `johndoe`
   - Email: `john@example.com`
   - Password: `Password123!`
   - Confirm Password: `Password123!`
4. Click "Register"
5. Should be redirected to login page

### 3. **Test User Login**

1. Navigate to login page
2. Enter credentials:
   - Username: `johndoe`
   - Password: `Password123!`
3. Click "Login"
4. Should be redirected to dashboard
5. Open browser console (F12) and verify:
   - Token is stored in AuthContext
   - No errors in console

### 4. **Test Profile Page Access**

1. From dashboard, click on profile icon or "Profile" link
2. Should load profile page at `/profile`
3. Browser console should show:
   ```
   [v0] Get profile API call
   [v0] Fetching budgets...
   [v0] Fetching transactions...
   [v0] Profile data fetched: {...}
   [v0] Budgets fetched: [...]
   [v0] Transactions fetched: [...]
   ```

### 5. **Test Profile Data Display**

Verify the following data is displayed correctly:
- ✅ User avatar with first letter (A for "Doe")
- ✅ Full name: "John Doe"
- ✅ Username: "@johndoe"
- ✅ Email: "john@example.com"
- ✅ Phone: (empty or entered value)
- ✅ Location: (empty or entered value)
- ✅ Bio: (empty or entered value)
- ✅ Joined date: Should show current month/year
- ✅ Statistics showing:
  - Budgets: 0 (unless budgets created)
  - Transactions: 0 (unless transactions created)
  - Reports: 0

### 6. **Test Profile Edit Mode**

1. Click "Edit Profile" button (top right)
2. Button should change to "Cancel"
3. All profile fields should become editable inputs
4. Try editing:
   - Change Full Name to: `Jane Doe`
   - Change Username to: `janedoe123`
   - Change Phone to: `+1234567890`
   - Change Location to: `New York, USA`
   - Change Bio to: `Software Engineer from NYC`

### 7. **Test Profile Save**

1. After making changes, click "Save Changes" button
2. Browser console should show:
   ```
   [v0] Saving profile: {fullName, username, phone, location, bio}
   [v0] Update profile API call with: {...}
   [v0] Profile saved successfully: {...}
   ```
3. Should see success alert: "Profile updated successfully!"
4. Profile page should refresh with new data
5. Fields should return to read-only mode

### 8. **Test Profile Persistence**

1. Refresh the page (F5)
2. Profile page should reload
3. All updated data should still be displayed
4. Console should show fresh API fetch with updated data
5. No "Loading..." spinner should persist longer than 2 seconds

### 9. **Test Email Field Protection**

1. Click "Edit Profile"
2. Email field should NOT be editable
3. Email should be shown in read-only format
4. Message below should state: "Email cannot be changed for security reasons"
5. When saving, email is NOT included in update payload

### 10. **Test Cancellation**

1. Click "Edit Profile"
2. Make some changes
3. Click "Cancel" button
4. All fields should return to read-only mode
5. Any unsaved changes should be discarded
6. Profile should still show original values

### 11. **Test Statistics Updates**

1. Go to dashboard
2. Create a new budget
3. Return to profile
4. Budget count should increase by 1
5. Create a new transaction (income or expense)
6. Budget count should increase by 1
7. Refresh page - counts should persist

### 12. **Test Error Handling**

#### Test Missing Token Error:
1. Open browser console
2. Clear all local storage: `localStorage.clear()`
3. Manually navigate to `/profile`
4. Should redirect to login page
5. No errors in console

#### Test Invalid Token Error:
1. Open browser console
2. Get current token: `localStorage.getItem('authToken')`
3. Modify it: `localStorage.setItem('authToken', 'invalid_token')`
4. Navigate to profile
5. Should show error and fallback to cached data (if available)

#### Test Network Error:
1. Open DevTools Network tab
2. Simulate offline: DevTools → Network → Offline
3. Try to edit and save profile
4. Should show error alert
5. Should preserve previous data
6. Go back online and retry - should work

### 13. **Test Browser Compatibility**

Test on different browsers:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari (Mac)
- ✅ Edge

### 14. **Test Responsive Design**

1. Open profile page
2. Use DevTools to test different screen sizes:
   - Desktop (1920px) - 2 column layout
   - Tablet (768px) - 1 column layout
   - Mobile (375px) - Stacked layout
3. Verify all elements are readable and functional
4. Test edit mode on mobile - all inputs should be accessible

### 15. **Test with Multiple Users**

1. Create second test account:
   - Username: `testuser`
   - Email: `test@example.com`
2. Login with new account
3. Verify profile shows correct data for new user
4. Logout and login with original user
5. Verify original profile data is restored

## Debugging Console Logs

When testing, look for these debug messages with `[v0]` prefix:

**Successful Profile Load:**
```
[v0] Get profile API call
[v0] Profile data fetched: {message: "...", user: {...}}
[v0] Fetching budgets...
[v0] Budgets fetched: [...]
[v0] Fetching transactions...
[v0] Transactions fetched: [...]
```

**Successful Profile Update:**
```
[v0] Saving profile: {...}
[v0] Update profile API call with: {...}
[v0] Profile saved successfully: {...}
```

**Error Cases:**
```
[v0] Error fetching profile: [error message]
[v0] Note: Could not fetch statistics - [error message]
[v0] Error saving profile: [error message]
```

## Expected API Responses

### GET /api/auth/profile (Success)
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "Jane Doe",
    "username": "janedoe123",
    "email": "john@example.com",
    "phone": "+1234567890",
    "location": "New York, USA",
    "bio": "Software Engineer from NYC",
    "profileImage": null,
    "country": null,
    "incomeBracket": null,
    "createdAt": "2026-02-19T10:30:00.000Z"
  }
}
```

### PUT /api/auth/profile (Success)
Returns same structure as GET with updated user data

### Error Response (401 Unauthorized)
```json
{
  "message": "Not authorized - missing token"
}
```

### Error Response (400 Bad Request)
```json
{
  "message": "Username already exists"
}
```

## Common Issues & Solutions

### Issue: Profile page shows "Loading..." indefinitely
**Solution:**
- Check browser console for API errors
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check that token exists: `console.log(localStorage.getItem('authToken'))`

### Issue: "Not authorized" error
**Solution:**
- Token might be expired (expires after 7 days)
- Try logging out and logging back in
- Clear local storage and restart

### Issue: Email field appears editable
**Solution:**
- This is a UI bug - verify using dev tools that email is not in update payload
- Check console during save to confirm email is not being sent

### Issue: Statistics showing 0 even with budgets/transactions
**Solution:**
- Budget/Transaction API might be returning different format
- Check console logs for actual response format
- Verify they're created under same user account

### Issue: Avatar letter not displaying correctly
**Solution:**
- Verify fullName is being fetched correctly
- Check if fullName contains special characters
- Avatar uses first character of fullName

## Performance Testing

### Load Testing
- Measure time from profile page load to full render
- Should be < 2 seconds on good connection
- Check for unnecessary re-renders in React DevTools

### Memory Testing
- Edit profile multiple times
- Check for memory leaks in DevTools
- Navigate away and back - memory should be released

## Data Persistence Testing

1. Make profile changes and save
2. Close browser tab completely
3. Open new tab and navigate to profile
4. All changes should still be there
5. Edit page should load fresh data from backend

## API Integration Checklist

- ✅ GET /api/auth/profile returns user data
- ✅ PUT /api/auth/profile saves changes
- ✅ GET /api/budget returns budgets array
- ✅ GET /api/transaction returns transactions array
- ✅ Authorization header format: "Bearer {token}"
- ✅ CORS headers allow frontend origin
- ✅ Error responses have proper status codes
- ✅ Response data structure matches frontend expectations

## Sign-Off

Profile section is **PRODUCTION READY** when:
- ✅ All 15 tests pass successfully
- ✅ No console errors during normal usage
- ✅ Error handling works correctly
- ✅ Data persists across sessions
- ✅ Works on multiple browsers
- ✅ Responsive design works properly
- ✅ API integration is stable

---

**Testing Date**: [Add date when testing completed]
**Tester Name**: [Add your name]
**Status**: [PASS/FAIL]
