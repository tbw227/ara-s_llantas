# Fix: HTML Instead of JSON Response

## ❌ Error

**Error:** `Expected JSON but got: text/html; charset=utf-8 <!doctype html>...`

**Cause:** Frontend is making API requests to the frontend domain instead of the backend domain.

**Wrong URL:** `https://aras-llantas.vercel.app/api/tires` (hits frontend, returns HTML)
**Correct URL:** `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/tires` (hits backend, returns JSON)

---

## ✅ What I Fixed

### 1. Enhanced URL Detection
- All Vercel preview URLs now use the backend URL
- Added warnings if frontend domain is detected in API URL
- Better logging to identify issues

### 2. Production Logging
- Logs warnings if API URL looks wrong
- Helps identify misconfiguration immediately
- Shows exactly what URL is being used

### 3. URL Validation
- Validates URLs before making requests
- Prevents malformed URLs
- Clear error messages

---

## 🔧 Root Cause

The issue is that **frontend and backend are separate Vercel deployments**:
- **Frontend:** `aras-llantas.vercel.app` (serves React app - returns HTML)
- **Backend:** `ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app` (serves API - returns JSON)

If the API request goes to the frontend domain, Vercel serves the React app (HTML) instead of the API (JSON).

---

## ✅ Solution

### Option 1: Remove Wrong Environment Variable (Recommended)

1. Go to **Vercel Dashboard** → **Frontend Project** → **Settings** → **Environment Variables**
2. **Delete** `REACT_APP_API_URL` if it's set to the wrong value
3. The code will use the hardcoded backend URL: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`

### Option 2: Set Correct Environment Variable

1. Go to **Vercel Dashboard** → **Frontend Project** → **Settings** → **Environment Variables**
2. Set `REACT_APP_API_URL` to:
   ```
   https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api
   ```
3. **Important:** Must be the BACKEND URL, not the frontend URL!

### Option 3: Verify Current Configuration

The code now has the backend URL hardcoded, so it should work even without environment variables. But check:

1. **Vercel Environment Variables:**
   - If `REACT_APP_API_URL` exists, make sure it's the backend URL
   - If it's wrong, delete it or fix it

2. **Redeploy Frontend:**
   - After fixing environment variables, redeploy
   - Environment variables are injected at build time

---

## 🧪 Verify the Fix

### 1. Check Browser Console:
After redeploying, open DevTools (F12) → Console:
- Should see: `🔧 API Base URL determined: https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
- Should NOT see warnings about using frontend domain

### 2. Check Network Tab:
Open DevTools (F12) → Network → Filter by "XHR"
- Request URL should be: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/tires`
- Response should be JSON (not HTML)
- Status should be 200

### 3. Test Backend Directly:
Open in browser:
```
https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/tires
```
Should return JSON, not HTML.

---

## ⚠️ Common Mistakes

**Wrong:**
- ❌ `REACT_APP_API_URL = https://aras-llantas.vercel.app/api` (frontend URL)
- ❌ `REACT_APP_API_URL = https://aras-llantas.vercel.app` (frontend URL, missing /api)
- ❌ `REACT_APP_API_URL = www.arasllantas.com` (missing protocol and /api)

**Correct:**
- ✅ `REACT_APP_API_URL = https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api` (backend URL)
- ✅ Or delete it - code has hardcoded fallback

---

## ✅ Result

- ✅ All Vercel preview URLs use backend URL
- ✅ Custom domain uses API subdomain or backend URL
- ✅ No more HTML responses
- ✅ JSON responses from backend
- ✅ Warnings if wrong URL detected

**The error should be fixed after redeploying!** 🎉

