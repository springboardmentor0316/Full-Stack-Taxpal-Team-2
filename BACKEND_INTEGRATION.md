# Backend API Integration Guide

This document outlines the backend API integration for Profile and Alerts sections.

## Overview

The frontend has been updated to connect with the backend APIs for:
1. **Profile Management** - Fetch and update user profile data
2. **Alerts System** - Display and manage user alerts

## Profile Integration

### API Endpoints Used

**GET /api/auth/profile**
- Fetches the current user's profile data
- Requires: JWT token in Authorization header
- Used in: Profile component and Dashboard profile section

**PUT /api/auth/profile**
- Updates the user's profile information
- Requires: JWT token in Authorization header
- Body fields:
  - `fullName` - User's full name
  - `username` - Username (must be unique)
  - `email` - Email address
  - `phone` - Phone number
  - `location` - Location/address
  - `bio` - User bio/about

### Implementation

The profile data is automatically fetched when:
1. User navigates to the Profile page
2. User opens the Dashboard profile section

Profile updates are sent to the backend when the user clicks "Save Changes".

**Files Updated:**
- `/frontend/src/components/profile.jsx` - Profile page component
- `/frontend/src/pages/Dashboard.jsx` - Profile section in dashboard

## Alerts Integration

### API Endpoints Available

The frontend has prepared the following API calls (ready for backend implementation):

**GET /api/alerts**
- Fetches all alerts for the current user
- Requires: JWT token in Authorization header
- Returns: Array of alert objects

**PATCH /api/alerts/:alertId/read**
- Marks a specific alert as read
- Requires: JWT token in Authorization header
- Params: `alertId` - Alert ID

**PATCH /api/alerts/read-all**
- Marks all alerts as read
- Requires: JWT token in Authorization header

**DELETE /api/alerts/:alertId**
- Deletes a specific alert
- Requires: JWT token in Authorization header
- Params: `alertId` - Alert ID

### Current Implementation

The alerts section currently displays mock alerts as a placeholder. The structure is ready for backend integration:

- Alert fields: `id`, `message`, `type` (warning/info/urgent), `read`, `date`
- Click an alert to mark it as read
- Badge shows count of unread alerts

**Files Updated:**
- `/frontend/src/pages/Dashboard.jsx` - Alert UI and state management
- `/frontend/src/api/alertsApi.js` - Alerts API client (new file)

## Environment Variables

Create a `.env` file in the frontend directory:

```bash
REACT_APP_API_URL=http://localhost:5000/api
```

For production:
```bash
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## Backend Requirements

### User Model Should Include
- `fullName` - String
- `username` - String (unique)
- `email` - String (unique)
- `phone` - String (optional)
- `location` - String (optional)
- `bio` - String (optional)
- `profileImage` - String (optional)

### Alert Model (for future implementation)
```javascript
{
  userId: ObjectId,
  message: String,
  type: String (warning/info/urgent),
  read: Boolean (default: false),
  date: Date (default: Date.now),
  createdAt: Date,
  updatedAt: Date
}
```

### Auth Middleware
All endpoints require JWT authentication:
- Token passed in `Authorization: Bearer {token}` header
- Token extracted to `req.userId` for identifying the user

## API Response Format

### Profile Response
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": "...",
    "fullName": "...",
    "username": "...",
    "email": "...",
    "profileImage": "...",
    "phone": "...",
    "location": "...",
    "bio": "..."
  }
}
```

### Update Profile Response
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "...",
    "fullName": "...",
    "username": "...",
    "email": "...",
    ...
  }
}
```

### Alerts Response
```json
{
  "alerts": [
    {
      "_id": "...",
      "message": "Budget alert: Groceries budget is 80% used",
      "type": "warning",
      "read": false,
      "date": "2026-02-18T10:30:00Z"
    }
  ]
}
```

## Testing the Integration

### Profile Flow
1. Login with test credentials
2. Click on profile icon or navigate to profile
3. Data should load from backend
4. Edit any field
5. Click "Save Changes"
6. Verify changes are persisted

### Alerts Flow
1. Click the "Alerts" button in the header
2. See mock alerts display
3. Click an alert to mark as read
4. Unread count badge updates

## Next Steps for Backend

1. **Create Alerts Model** - Define schema and validation
2. **Implement Alerts Routes** - GET, PATCH, DELETE endpoints
3. **Add Alert Triggers** - Create alerts for budget warnings, tax deadlines, etc.
4. **Test Endpoints** - Use provided API client in frontend

## Files Modified

### Frontend
- `/frontend/src/components/profile.jsx` - Profile fetch & update integration
- `/frontend/src/pages/Dashboard.jsx` - Profile and alerts UI integration
- `/frontend/src/api/alertsApi.js` - New alerts API client
- `/frontend/.env.example` - Environment configuration template

### Backend (No changes needed yet)
- Existing auth endpoints already support profile operations
- Future: Add alerts endpoints and model

## Debugging

Enable debug logs by checking the browser console:
- All API calls log: `[v0] API Call: METHOD URL`
- Responses log: `[v0] Profile data fetched:` or `[v0] Error fetching profile:`
- Alert actions log: `[v0] Marking alert as read:` etc.

## Error Handling

The frontend handles errors gracefully:
- Profile: Shows error alert if fetch/update fails, falls back to context data
- Alerts: Logs errors to console but UI remains functional

## Security Considerations

1. **JWT Tokens** - Stored in localStorage via AuthContext
2. **CORS** - Backend should allow frontend domain
3. **HTTPS** - Use HTTPS in production for token transmission
4. **Password Protection** - Profile update endpoint should validate user permissions
