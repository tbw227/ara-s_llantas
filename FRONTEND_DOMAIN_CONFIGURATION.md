# Frontend Domain Configuration

## ✅ Configuration Summary

### Frontend Domains:
- **Production:** `www.arasllantas.com` (custom domain)
- **Vercel Preview URLs:** 
  - `aras-llantas-git-main-tbw227s-projects.vercel.app`
  - `aras-llantas-ik0ww0cid-tbw227s-projects.vercel.app`
  - Any other Vercel preview URLs

### Backend URL:
- **All frontend domains connect to:**
  ```
  https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api
  ```

---

## 🔧 How It Works

### API URL Configuration:

**File:** `frontend/src/utils/apiBaseUrl.js`

**Priority Order:**
1. ✅ `REACT_APP_API_URL` environment variable (if set)
2. ✅ Custom domain (`www.arasllantas.com` or `arasllantas.com`) → Uses hardcoded backend URL
3. ✅ Vercel preview URLs → Uses hardcoded backend URL
4. ✅ Fallback → Uses hardcoded backend URL

**Result:** All frontend deployments (custom domain and Vercel previews) connect to the same backend.

---

## ✅ Configuration Details

### For `www.arasllantas.com`:
- Frontend: `https://www.arasllantas.com`
- Backend: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
- ✅ Connected

### For Vercel Preview URLs:
- Frontend: `https://aras-llantas-git-main-tbw227s-projects.vercel.app`
- Backend: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
- ✅ Connected

- Frontend: `https://aras-llantas-ik0ww0cid-tbw227s-projects.vercel.app`
- Backend: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
- ✅ Connected

---

## 🎯 Vercel Configuration

### Frontend Project Settings:

1. **Custom Domain:**
   - Add `www.arasllantas.com` in Vercel Dashboard
   - Add `arasllantas.com` (optional, redirects to www)

2. **Environment Variables:**
   - `REACT_APP_API_URL` is optional (code has hardcoded fallback)
   - If set, it will override the hardcoded URL

### Backend Project Settings:

1. **CORS Configuration:**
   - Set `CORS_ORIGINS` to include:
     ```
     https://www.arasllantas.com,https://arasllantas.com,https://aras-llantas-git-main-tbw227s-projects.vercel.app,https://aras-llantas-ik0ww0cid-tbw227s-projects.vercel.app,https://*.vercel.app
     ```
   - Or use wildcard: `https://*.vercel.app,https://www.arasllantas.com,https://arasllantas.com`

---

## ✅ Status

**All frontend domains are now configured to connect to the correct backend!**

- ✅ `www.arasllantas.com` → Backend connected
- ✅ Vercel preview URLs → Backend connected
- ✅ Hardcoded fallback ensures it always works

**Everything is properly configured!** 🎉

