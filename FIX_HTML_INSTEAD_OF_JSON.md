# Fixed: HTML Instead of JSON Error

## ✅ Problem Identified

**Error:** Frontend is receiving HTML instead of JSON
**Cause:** API requests are hitting the frontend domain instead of the backend domain

**Example:**
- ❌ Wrong: `https://aras-llantas.vercel.app/api/tires` (hits frontend, returns HTML)
- ✅ Correct: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/tires` (hits backend, returns JSON)

---

## ✅ What I Fixed

### Updated `frontend/src/utils/apiBaseUrl.js`:

**Key Changes:**
1. ✅ **All Vercel preview URLs** now use the backend URL (separate deployment)
2. ✅ **Custom domain** uses `api.arasllantas.com` (if configured) or backend URL
3. ✅ **No relative URLs in production** - always uses full backend URL
4. ✅ **Clear separation** - frontend and backend are separate deployments

**Configuration:**
- Development: `/api` (proxied to localhost:8001)
- Production (Vercel): `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
- Production (Custom Domain): `https://api.arasllantas.com/api` (or backend URL)

---

## 🧪 Verify the Fix

### 1. Check Browser Console:
Open DevTools (F12) → Console, you should see:
```
🔧 API Base URL determined: https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api
🌐 API Request: https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/tires
```

### 2. Check Network Tab:
Open DevTools (F12) → Network → Filter by "XHR"
- Request URL should be: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/tires`
- Response should be JSON, not HTML
- Status should be 200

### 3. Test Backend Directly:
Open in browser:
```
https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/tires
```
Should return JSON, not HTML.

---

## 🔧 Vercel Configuration

### Frontend Project:
**Environment Variable (Optional):**
```
REACT_APP_API_URL = https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api
```
*Note: Not required - code now has this hardcoded as fallback*

### Backend Project:
**CORS Configuration:**
```
CORS_ORIGINS = https://www.arasllantas.com,https://arasllantas.com,https://*.vercel.app
```

---

## ✅ Result

**All API requests now go to the correct backend URL:**
- ✅ Vercel preview URLs → Backend URL
- ✅ Custom domain → API subdomain or Backend URL
- ✅ No more HTML responses
- ✅ JSON responses from backend

**The error should be fixed!** 🎉

