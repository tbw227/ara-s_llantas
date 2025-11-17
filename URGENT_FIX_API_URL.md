# URGENT: Fix API URL Configuration

## ❌ Current Error

**Error:** `Expected JSON response but got text/html`

**Root Cause:** The frontend is making API requests to the **frontend domain** instead of the **backend domain**.

---

## 🔍 How to Diagnose

### Check Browser Console:
Open DevTools (F12) → Console, you should see:
```
🔧 Production API Base URL: [URL]
🌐 Production API Request: [FULL URL]
```

**If you see:**
- ❌ `https://aras-llantas.vercel.app/api/...` → **WRONG** (frontend domain)
- ✅ `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/...` → **CORRECT** (backend domain)

---

## 🛠️ IMMEDIATE FIX

### Step 1: Check Vercel Environment Variable

1. Go to **Vercel Dashboard**
2. Select your **Frontend Project** (not backend)
3. Go to **Settings** → **Environment Variables**
4. Look for `REACT_APP_API_URL`

### Step 2: Fix or Delete It

**If `REACT_APP_API_URL` exists and is wrong:**
- **Option A (Recommended):** DELETE it
  - The code has a hardcoded fallback that will work
- **Option B:** Set it to the correct value:
  ```
  https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api
  ```

**If it doesn't exist:**
- The code should use the hardcoded backend URL
- If it's still wrong, there might be a build cache issue

### Step 3: Redeploy Frontend

1. After fixing/deleting the environment variable
2. Go to **Deployments** tab
3. Click **⋯** on latest deployment
4. Click **Redeploy**
5. Wait for deployment to complete

---

## ✅ Correct Configuration

### Frontend Project (Vercel):
- **Environment Variable:** `REACT_APP_API_URL` (optional)
- **Value (if set):** `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
- **Or:** Delete it - code has hardcoded fallback

### Backend Project (Vercel):
- **Environment Variable:** `CORS_ORIGINS`
- **Value:** `https://www.arasllantas.com,https://arasllantas.com,https://*.vercel.app`

---

## 🧪 Verify After Fix

1. **Check Console:**
   - Should see: `🔧 Production API Base URL: https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
   - Should NOT see errors about using frontend domain

2. **Check Network Tab:**
   - Request URL should be backend URL
   - Response should be JSON (not HTML)
   - Status should be 200

3. **Test the Site:**
   - Tires should load
   - Contact form should work
   - No console errors

---

## 🎯 Summary

**The issue:** `REACT_APP_API_URL` in Vercel is probably set to the wrong value (frontend domain).

**The fix:** Delete it or set it to the backend URL, then redeploy.

**The code:** Already has the correct backend URL hardcoded, so it will work once the environment variable is fixed/removed.

**After redeploying, the error should be fixed!** 🚀

