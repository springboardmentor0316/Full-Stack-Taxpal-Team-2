# Integration Testing Guide

## Quick Start

### 1. Setup Environment

Create `.env` file in `/frontend` directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 2. Start Backend & Frontend

Backend:
```bash
cd backend
npm install
npm start
# Should run on http://localhost:5000
```

Frontend:
```bash
cd frontend
npm install
npm start
# Should run on http://localhost:3000
```

## Testing Profile Integration

### Step 1: Register & Login
1. Go to http://localhost:3000
2. Register with test credentials
3. Login to access Dashboard

### Step 2: Test Profile Fetch
1. Navigate to **Profile** section (click profile icon in sidebar)
2. **Check browser console** for logs:
   ```
   [v0] Get profile API call
   [v0] API Call: GET http://localhost:5000/api/auth/profile
   [v0] Profile data fetched: {...}
   ```
3. Profile fields should populate with data from backend
4. Fields displayed: Full Name, Username, Email, Phone, Location, Bio

### Step 3: Test Profile Update
1. Click **"Edit Profile"** button
2. Modify any field (e.g., update Bio)
3. Click **"Save Changes"**
4. **Check browser console** for logs:
   ```
   [v0] Update profile API call with: {...}
   [v0] API Call: PUT http://localhost:5000/api/auth/profile
   [v0] Profile saved successfully: {...}
   ```
5. Success alert should appear: "Profile updated successfully!"
6. Verify changes persist on page reload

### Step 4: Test Profile Error Handling
1. Modify `.env` to invalid URL:
   ```
   REACT_APP_API_URL=http://localhost:9999/api
   ```
2. Refresh page
3. Should see error in console and fallback to context data
4. Edit and save should show error: "Error saving profile. Please try again."

## Testing Alerts Integration

### Step 1: View Alerts
1. Look for **"Alerts"** button in header (Bell icon)
2. Click the button
3. Dropdown should appear with mock alerts (3 sample alerts provided)

### Step 2: Alert Features
1. **Unread Badge**: Should show count of unread alerts (initially 2)
2. **Alert List**: Shows message, type, and timestamp
3. **Read Status**: Unread alerts have blue dot indicator
4. **Hover Effect**: Alert background changes on hover

### Step 3: Mark as Read
1. Click any unread alert (red background ones)
2. **Check browser console** for log:
   ```
   [v0] Marking alert as read: {alertId}
   ```
3. Alert background changes to white
4. Blue dot indicator disappears
5. Unread badge count decreases

### Step 4: Alert Badge Count
1. Start with 2 unread alerts (badge shows "2")
2. Mark first alert as read → Badge shows "1"
3. Mark second alert as read → Badge shows "0"
4. All alerts marked as read → Badge disappears

## Console Logging

All API calls include debug logs. Look for `[v0]` prefix:

### Profile Logs
```
[v0] Auth API URL: http://localhost:5000/api
[v0] Get profile API call
[v0] API Call: GET http://localhost:5000/api/auth/profile
[v0] Profile data fetched: {user: {...}}
[v0] Update profile API call with: {...}
[v0] API Call: PUT http://localhost:5000/api/auth/profile
[v0] Profile saved successfully: {user: {...}}
```

### Alert Logs
```
[v0] Notification button clicked!
[v0] Fetching alerts from backend
[v0] Marking alert as read: 1
```

## API Request/Response Examples

### Get Profile Request
```http
GET /api/auth/profile HTTP/1.1
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

### Get Profile Response
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "location": "New York, USA",
    "bio": "Finance enthusiast and tax planner"
  }
}
```

### Update Profile Request
```http
PUT /api/auth/profile HTTP/1.1
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "fullName": "John Doe Updated",
  "phone": "+91 9876543210",
  "location": "New York, USA",
  "bio": "Updated bio text"
}
```

### Update Profile Response
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe Updated",
    "username": "johndoe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "location": "New York, USA",
    "bio": "Updated bio text"
  }
}
```

## Troubleshooting

### Profile Not Loading
1. Check if backend is running: `curl http://localhost:5000/api/auth/profile`
2. Check `.env` file has correct `REACT_APP_API_URL`
3. Check browser console for error messages
4. Check JWT token is valid in localStorage

### Alerts Not Showing
1. Click "Alerts" button multiple times to trigger fetch
2. Check console for `[v0] Fetching alerts from backend`
3. Currently shows mock alerts (replace with backend call when ready)

### API Errors
1. **401 Unauthorized**: JWT token expired or invalid
   - Solution: Login again to get new token
2. **404 Not Found**: Endpoint doesn't exist
   - Solution: Verify backend route is implemented
3. **500 Server Error**: Backend error
   - Solution: Check backend console for error details

### CORS Issues
If you see CORS errors in browser:
1. Add CORS middleware to backend:
   ```javascript
   app.use(cors({
     origin: "http://localhost:3000",
     credentials: true
   }));
   ```
2. Restart backend after CORS config change

## Performance Testing

### Network Tab (Chrome DevTools)
1. Open DevTools → Network tab
2. Click "Alerts" button
3. Check request/response times
4. Verify payload sizes are reasonable
5. No errors in Status column

### Console Timing
1. Check how long API calls take
2. Log shows: `[v0] API Call: GET http://localhost:5000/api/auth/profile`
3. Response should appear within 500ms for localhost

## Security Testing

### Token Validation
1. Open localStorage (DevTools → Application → Local Storage)
2. Should see token saved after login
3. Each API request sends: `Authorization: Bearer {token}`

### No Sensitive Data in Console
1. Passwords never logged
2. Full tokens visible in logs (for debugging only)
3. Remove debug logs before production

## Checklist for Production

- [ ] Remove all `[v0]` debug logs from console
- [ ] Update `.env` with production API URL
- [ ] Test with HTTPS
- [ ] Verify CORS is properly configured
- [ ] Set JWT_SECRET in backend .env
- [ ] Test with real browser (not just localhost)
- [ ] Test network failures and retries
- [ ] Load test with multiple concurrent requests
- [ ] Test on mobile devices
- [ ] Verify error messages are user-friendly
