# Update CORS_ORIGINS for Multiple Frontend URLs

## Your Frontend URLs

You have:
- `https://www.arasllantas.com` (custom domain)
- `https://aras-llantas.vercel.app` (Vercel default domain)

---

## Update CORS_ORIGINS

### Step 1: Update Backend Environment Variable

1. **Go to Vercel Dashboard** → Your **Backend Project**
2. **Settings** → **Environment Variables**
3. **Find `CORS_ORIGINS`** in the list
4. **Click the three dots (⋯)** next to it
5. **Click "Edit"**
6. **Update the Value to:**
   ```
   https://www.arasllantas.com,https://arasllantas.com,https://aras-llantas.vercel.app
   ```
   (Include both `www` and non-`www` versions, plus the Vercel domain)
7. **Make sure all environments are selected** (Development, Preview, Production)
8. **Save**

### Step 2: Redeploy Backend

**IMPORTANT:** After updating, you MUST redeploy!

1. **Go to Deployments tab**
2. **Click three dots (⋯)** on latest deployment
3. **Click "Redeploy"**
4. **Wait for deployment to complete**

---

## Complete CORS_ORIGINS Value

```
https://www.arasllantas.com,https://arasllantas.com,https://aras-llantas.vercel.app
```

This includes:
- ✅ `https://www.arasllantas.com` - Your custom domain with www
- ✅ `https://arasllantas.com` - Your custom domain without www (in case someone visits without www)
- ✅ `https://aras-llantas.vercel.app` - Your Vercel default domain

---

## Verify Frontend Environment Variable

Also make sure your **frontend** has the correct backend URL:

1. **Go to Vercel Dashboard** → Your **Frontend Project**
2. **Settings** → **Environment Variables**
3. **Check `REACT_APP_API_URL`:**
   - Should be: `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
   - Or your production backend URL

---

## Test After Redeploy

After redeploying backend:

1. **Test from custom domain:**
   - Visit: `https://www.arasllantas.com`
   - Try submitting contact form
   - Check console for errors

2. **Test from Vercel domain:**
   - Visit: `https://aras-llantas.vercel.app`
   - Try submitting contact form
   - Check console for errors

Both should work now! 🎉

