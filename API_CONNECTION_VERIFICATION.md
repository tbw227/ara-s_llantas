# API Connection Verification Guide

## ✅ Current Configuration

### Frontend API Configuration

**File:** `frontend/src/utils/apiBaseUrl.js`

**Logic:**
1. ✅ **Development:** Uses `http://localhost:8001/api` (automatic)
2. ✅ **Production:** Uses `REACT_APP_API_URL` environment variable (if set)
3. ✅ **Production Fallback:** Auto-detects backend URL based on domain

**Expected URLs:**
- Development: `http://localhost:8001/api`
- Production: Set via `REACT_APP_API_URL` in Vercel

---

### Backend CORS Configuration

**File:** `node-backend/server.js`

**Logic:**
1. ✅ **Development:** Defaults to `http://localhost:3000` (automatic)
2. ✅ **Production:** Uses `CORS_ORIGINS` environment variable (comma-separated)

**Expected Origins:**
- Development: `http://localhost:3000`
- Production: Set via `CORS_ORIGINS` in Vercel (e.g., `https://www.arasllantas.com,https://arasllantas.com`)

---

## 🧪 Verification Steps

### Step 1: Verify Backend is Running

```bash
# Start backend
cd node-backend
npm start
```

**Expected Output:**
- Server starts on port 8001
- No errors in console

**Test:**
```bash
# In another terminal
curl http://localhost:8001/api/health
```

**Expected Response:**
```json
{"status":"ok"}
```

---

### Step 2: Verify Frontend Configuration

```bash
# Start frontend
cd frontend
npm start
```

**Expected Behavior:**
- React app starts on port 3000
- Browser opens automatically
- In development, console shows: `🌐 API Request: http://localhost:8001/api/tires`

---

### Step 3: Run Verification Script

```bash
# From project root
node verify-api-connection.js
```

This script will test:
- ✅ Backend health endpoint
- ✅ Tires endpoint
- ✅ CORS configuration
- ✅ Contact form endpoint
- ✅ Configuration check

---

### Step 4: Manual Browser Test

1. **Open:** http://localhost:3000
2. **Open DevTools:** Press F12
3. **Go to Console tab:**
   - Should see: `🌐 API Request: http://localhost:8001/api/tires` (development only)
   - No errors should appear

4. **Go to Network tab:**
   - Filter by "XHR" or "Fetch"
   - Should see requests to `http://localhost:8001/api/tires`
   - Status should be `200 OK`

5. **Test Contact Form:**
   - Fill out the exit modal form
   - Submit
   - Check Network tab for POST to `/api/contact`
   - Should return `201 Created` or `200 OK`

---

## 🔧 Configuration Files

### Frontend Environment Variables

**Development:** No configuration needed (uses localhost automatically)

**Production (Vercel):**
```
REACT_APP_API_URL = https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api
```

Or your production backend URL:
```
REACT_APP_API_URL = https://api.arasllantas.com/api
```

---

### Backend Environment Variables

**Development:** No configuration needed (allows localhost:3000 automatically)

**Production (Vercel):**
```
CORS_ORIGINS = https://www.arasllantas.com,https://arasllantas.com,https://aras-llantas.vercel.app
```

---

## ✅ Verification Checklist

### Development:
- [ ] Backend running on port 8001
- [ ] Frontend running on port 3000
- [ ] Health endpoint responds: `http://localhost:8001/api/health`
- [ ] Tires endpoint responds: `http://localhost:8001/api/tires`
- [ ] Browser console shows API requests (development only)
- [ ] No CORS errors in browser console
- [ ] Contact form submits successfully
- [ ] Newsletter signup works

### Production:
- [ ] `REACT_APP_API_URL` set in Vercel frontend project
- [ ] `CORS_ORIGINS` set in Vercel backend project
- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] API requests work from production frontend
- [ ] No console errors in production
- [ ] Forms work in production

---

## 🐛 Troubleshooting

### Backend won't start:
- Check if port 8001 is in use: `netstat -ano | findstr :8001`
- Verify `.env` file exists in `node-backend/`
- Check database connection (if using database)

### Frontend can't connect to backend:
- Verify backend is running on port 8001
- Check browser console for CORS errors
- Verify `REACT_APP_API_URL` is NOT set in development (should use localhost)
- Check Network tab for failed requests

### CORS errors:
- Verify `CORS_ORIGINS` includes the frontend URL
- Check backend logs for CORS configuration
- Ensure frontend URL matches exactly (including protocol and port)

### API requests fail:
- Check backend logs for errors
- Verify API endpoint exists: `http://localhost:8001/api/health`
- Check Network tab for request/response details
- Verify request format matches backend expectations

---

## 📝 Quick Test Commands

```bash
# Test backend health
curl http://localhost:8001/api/health

# Test tires endpoint
curl http://localhost:8001/api/tires

# Test contact endpoint
curl -X POST http://localhost:8001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'

# Run full verification
node verify-api-connection.js
```

---

**Everything should be properly connected!** 🎉

