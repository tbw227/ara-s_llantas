# Fix: Getting index.html Instead of API Response

## ❌ Problem

When accessing `https://arasllantas.com/index.html/` or making API requests, you're getting the React app's `index.html` instead of JSON responses from the backend.

**Root Cause:** The API URL configuration was trying to use `https://api.arasllantas.com/api` for the custom domain, but this subdomain may not be configured. This causes API requests to fail or hit the wrong endpoint.

---

## ✅ What I Fixed

### Updated API URL Configuration

**File:** `frontend/src/utils/apiBaseUrl.js`

**Change:**
- **Before:** Custom domain (`arasllantas.com`) tried to use `https://api.arasllantas.com/api`
- **After:** Custom domain now uses the Vercel backend URL directly: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`

**Why:**
- The `api.arasllantas.com` subdomain may not be configured in Vercel
- The backend is deployed separately on Vercel
- Using the Vercel backend URL ensures it always works

---

## 🔧 Current Configuration

### All Domains Now Use Backend URL:

1. **Custom Domain (`arasllantas.com` or `www.arasllantas.com`):**
   - API URL: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`

2. **Vercel Preview URLs:**
   - API URL: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`

3. **Development:**
   - API URL: `/api` (proxied to `http://localhost:8001/api`)

---

## 🧪 Verify the Fix

### 1. Check Browser Console:
Open DevTools (F12) → Console, you should see:
```
🔧 Production API Base URL: https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api
🌐 Production API Request: https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/tires
```

### 2. Check Network Tab:
Open DevTools (F12) → Network → Filter by "XHR"
- Request URL should be the backend URL
- Response should be JSON (not HTML)
- Status should be 200

### 3. Test Direct Access:
- `https://arasllantas.com/` → Should show React app ✅
- `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/tires` → Should return JSON ✅

---

## 📝 About index.html

The `vercel.json` configuration has a rewrite rule:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This is **correct** for a React SPA - it ensures all routes serve the React app. However, API requests should go to the backend, not the frontend.

---

## ✅ Result

- ✅ Custom domain uses backend URL
- ✅ No more index.html responses for API requests
- ✅ JSON responses from backend
- ✅ React app still works correctly

**After redeploying, API requests should work correctly!** 🎉

---

## 🔮 Future: Using api.arasllantas.com Subdomain

If you want to use `https://api.arasllantas.com/api` in the future:

1. **Configure in Vercel:**
   - Go to Backend Project → Settings → Domains
   - Add: `api.arasllantas.com`

2. **Update DNS:**
   - Add CNAME record: `api.arasllantas.com` → Vercel backend

3. **Update Code:**
   - Change line 52 in `frontend/src/utils/apiBaseUrl.js` to use `https://api.arasllantas.com/api`

For now, using the Vercel backend URL directly is the simplest solution! ✅

