# Quick Start - Profile & Alerts Integration

## 🚀 Get Started in 5 Minutes

### Step 1: Setup Environment (1 min)

```bash
cd frontend
cp .env.example .env
```

**Edit .env:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 2: Start Servers (1 min)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### Step 3: Test Profile (2 min)

1. Login with your credentials
2. Click **Profile** in sidebar
3. ✅ Data loads from backend
4. Edit any field
5. Click **Save Changes**
6. ✅ See success message

### Step 4: Test Alerts (1 min)

1. Click **Alerts** button (Bell icon)
2. ✅ Dropdown opens with mock alerts
3. Click any alert
4. ✅ Mark as read
5. ✅ Unread badge updates

---

## 📋 What Changed

### Modified (2 files)
- ✅ `/frontend/src/components/profile.jsx` - Fetch & save from backend
- ✅ `/frontend/src/pages/Dashboard.jsx` - Profile & alerts integration

### Created (6 files)
- ✅ `/frontend/src/api/alertsApi.js` - Alerts API client
- ✅ `/frontend/.env.example` - Configuration
- ✅ `BACKEND_INTEGRATION.md` - Technical docs
- ✅ `API_INTEGRATION_SUMMARY.md` - Changes summary
- ✅ `INTEGRATION_TESTING.md` - Testing guide
- ✅ `PROFILE_ALERTS_INTEGRATION.md` - Main docs

---

## ✨ Features

### Profile
- ✅ Fetch user data from backend
- ✅ Edit profile fields
- ✅ Save changes to backend
- ✅ Error handling
- ✅ Success feedback

### Alerts
- ✅ Display alerts in dropdown
- ✅ Unread count badge
- ✅ Mark alerts as read
- ✅ Mock data ready
- ✅ Ready for backend integration

---

## 🔧 How It Works

### Profile Flow
```
Profile page load
    ↓
Call: authApi.getProfile(token)
    ↓
Display user data
    ↓
User edits form
    ↓
Click Save
    ↓
Call: authApi.updateProfile(token, data)
    ↓
Show success/error
```

### Alerts Flow
```
Click Alerts button
    ↓
fetchAlerts() called
    ↓
Display dropdown
    ↓
Click alert
    ↓
markAlertAsRead()
    ↓
Update UI badge
```

---

## 🐛 Debugging

Look for `[v0]` in browser console:

```javascript
[v0] Get profile API call
[v0] API Call: GET http://localhost:5000/api/auth/profile
[v0] Profile data fetched: {...}
[v0] Marking alert as read: 1
```

---

## ✅ Checklist

- [ ] `.env` created in frontend
- [ ] Backend running on 5000
- [ ] Frontend running on 3000
- [ ] Can login
- [ ] Profile loads
- [ ] Profile saves
- [ ] Alerts button works
- [ ] Can mark alert as read

---

## 📚 Full Documentation

| Document | For | Time |
|----------|-----|------|
| `PROFILE_ALERTS_INTEGRATION.md` | Overview & setup | 10 min |
| `BACKEND_INTEGRATION.md` | Technical details | 15 min |
| `INTEGRATION_TESTING.md` | Step-by-step testing | 20 min |
| `API_INTEGRATION_SUMMARY.md` | What changed | 10 min |
| `FILES_UPDATED.md` | File reference | 5 min |

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Profile not loading | Check backend running, verify REACT_APP_API_URL |
| API 404 errors | Ensure backend routes exist |
| CORS errors | Verify backend CORS config |
| No alerts showing | Click button multiple times |
| Token expired | Login again |

---

## 🎯 Next Steps

1. ✅ Complete setup above
2. ✅ Test profile integration
3. ✅ Test alerts system
4. 🔜 Implement alerts backend endpoints
5. 🔜 Deploy to production

---

## 📞 Support

- Read: `BACKEND_INTEGRATION.md` for API specs
- Check: Browser console for `[v0]` debug logs
- Reference: `INTEGRATION_TESTING.md` for examples
- Review: `API_INTEGRATION_SUMMARY.md` for changes

---

**Ready?** Start with Step 1 above! ⬆️
