# Configure Backend URL

## Your Backend URL

You provided: `ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app`

**Note:** This looks like a **preview URL** (temporary). You should use the **production URL** instead.

---

## Step 1: Find Your Production Backend URL

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com
   - Click on your **backend project**

2. **Check the URL:**
   - Look at the top of the project page
   - You should see a URL like: `https://aras-llantas-api.vercel.app` (production)
   - Or check **Domains** section

3. **Production URL format:**
   - Should be: `https://your-project-name.vercel.app`
   - NOT: `https://your-project-name-xxxxx-xxxxx.vercel.app` (that's a preview URL)

---

## Step 2: Configure Frontend Environment Variable

### Option A: Use Production URL (Recommended)

1. **Go to Vercel Dashboard** → Your **Frontend Project**
2. **Settings** → **Environment Variables**
3. **Add:**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://your-production-backend-url.vercel.app/api`
   - **Environments:** Select all (Production, Preview, Development)
4. **Save**

### Option B: Use the URL You Provided (Temporary)

If you want to use the preview URL you provided:

1. **Go to Vercel Dashboard** → Your **Frontend Project**
2. **Settings** → **Environment Variables**
3. **Add:**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
   - **Environments:** Select all
4. **Save**

**⚠️ Warning:** Preview URLs expire! Use production URL for permanent solution.

---

## Step 3: Redeploy Frontend

**IMPORTANT:** After adding environment variable, you MUST redeploy!

1. **Go to Deployments tab**
2. **Click three dots (⋯)** on latest deployment
3. **Click "Redeploy"**
4. **Wait for deployment to complete**

---

## Step 4: Configure Backend CORS

Make sure backend allows your frontend:

1. **Go to Vercel Dashboard** → Your **Backend Project**
2. **Settings** → **Environment Variables**
3. **Add/Update:**
   - **Key:** `CORS_ORIGINS`
   - **Value:** `https://arasllantas.com,https://www.arasllantas.com`
   - **Environments:** Select all
4. **Save**
5. **Redeploy backend**

---

## Step 5: Test Backend

Test if your backend is accessible:

### Test with the URL you provided:
```
https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/health
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

### Test contact endpoint:
```
https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api/contact
```

---

## Quick Configuration

**For Frontend (Vercel Dashboard):**
```
REACT_APP_API_URL = https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api
```

**For Backend (Vercel Dashboard):**
```
CORS_ORIGINS = https://arasllantas.com,https://www.arasllantas.com
```

**Then redeploy both projects!**

---

## Verify It Works

After redeploying:

1. **Open:** `https://www.arasllantas.com`
2. **Open Developer Tools** (F12) → **Console**
3. **Try submitting contact form**
4. **Check if error is gone**

---

## 🎯 Next Steps

1. ✅ Set `REACT_APP_API_URL` in frontend environment variables
2. ✅ Set `CORS_ORIGINS` in backend environment variables
3. ✅ Redeploy both projects
4. ✅ Test the contact form
5. ✅ Find and use production backend URL (instead of preview URL)

