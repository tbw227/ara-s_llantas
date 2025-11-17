# Debug API Connection Issues

## 🔍 Quick Debug Steps

### Step 1: Check What URL the Frontend is Using

Open your browser console on `https://www.arasllantas.com` and run:

```javascript
console.log('API URL:', process.env.REACT_APP_API_URL || 'http://localhost:8001/api');
```

This will show you what URL the frontend is trying to use.

---

### Step 2: Check Network Tab

1. Open **Developer Tools** (F12)
2. Go to **Network** tab
3. Try submitting the contact form
4. Look for the failed request
5. Check:
   - **Request URL** - What URL is it trying to call?
   - **Status** - What error code?
   - **CORS** - Any CORS errors?

---

### Step 3: Verify Backend is Accessible

Test your backend directly in browser:

```
https://your-backend-url.vercel.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": ...,
  "environment": "production"
}
```

---

## 🛠️ Common Fixes

### Fix 1: Environment Variable Not Set

**Problem:** `REACT_APP_API_URL` is not set in Vercel

**Solution:**
1. Go to **Vercel Dashboard** → Your Frontend Project
2. **Settings** → **Environment Variables**
3. Add: `REACT_APP_API_URL` = `https://your-backend-url.vercel.app/api`
4. **Redeploy** frontend

---

### Fix 2: Frontend Not Redeployed

**Problem:** Environment variable is set but frontend wasn't redeployed

**Solution:**
1. Go to **Vercel Dashboard** → Your Frontend Project
2. **Deployments** tab
3. Click **three dots (⋯)** on latest deployment
4. Click **Redeploy**
5. Wait for deployment to complete

---

### Fix 3: Wrong Backend URL

**Problem:** Backend URL is incorrect

**Solution:**
1. Verify your backend URL in Vercel Dashboard
2. Make sure it ends with `/api`
3. Update `REACT_APP_API_URL` with correct URL
4. Redeploy

---

### Fix 4: CORS Error

**Problem:** Backend is blocking frontend requests

**Solution:**
1. Go to **Vercel Dashboard** → Your Backend Project
2. **Settings** → **Environment Variables**
3. Add/Update: `CORS_ORIGINS` = `https://arasllantas.com,https://www.arasllantas.com`
4. **Redeploy** backend

---

### Fix 5: Backend Not Deployed

**Problem:** Backend doesn't exist or isn't deployed

**Solution:**
1. Check if backend project exists in Vercel
2. Verify backend is deployed and accessible
3. Test backend health endpoint

---

## 📋 Verification Checklist

- [ ] `REACT_APP_API_URL` is set in Vercel frontend environment variables
- [ ] Frontend has been **redeployed** after setting environment variable
- [ ] Backend URL is correct and accessible
- [ ] Backend health endpoint works: `/api/health`
- [ ] `CORS_ORIGINS` is set in backend environment variables
- [ ] Backend includes frontend domain in CORS
- [ ] Backend has been **redeployed** after setting CORS

---

## 🧪 Test Commands

### Test Backend Health:
```bash
curl https://your-backend-url.vercel.app/api/health
```

### Test Contact Endpoint:
```bash
curl -X POST https://your-backend-url.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

---

## 🆘 Still Not Working?

1. **Check Vercel Logs:**
   - Frontend: Vercel Dashboard → Frontend Project → Deployments → View Function Logs
   - Backend: Vercel Dashboard → Backend Project → Deployments → View Function Logs

2. **Check Browser Console:**
   - Look for specific error messages
   - Check Network tab for failed requests

3. **Verify URLs:**
   - Frontend: `https://www.arasllantas.com`
   - Backend: `https://your-backend-url.vercel.app`

