# How to Find Your Backend URL on Vercel

## 🔍 What is the "Root URL"?

The **root URL** is the base URL of your backend, without any specific endpoints.

**Examples:**
- ✅ Root URL: `https://aras-llantas-api.vercel.app`
- ✅ With endpoint: `https://aras-llantas-api.vercel.app/api/health`

---

## 📍 Step-by-Step: Find Your Backend URL

### Method 1: Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com
   - Log in to your account

2. **Find Your Backend Project:**
   - Look for your backend project (e.g., `aras-llantas-api`)
   - Click on it

3. **Check the Domains Section:**
   - In your project, look for **"Domains"** or **"Deployments"** tab
   - You'll see URLs like:
     - `https://aras-llantas-api.vercel.app` (Production URL - this is what you want!)
     - `https://aras-llantas-api-abc123.vercel.app` (Preview URL - temporary)

4. **Use the Production URL:**
   - The production URL is the **stable** one that doesn't change
   - It looks like: `https://your-project-name.vercel.app`
   - **This is your root URL!**

---

### Method 2: Check Deployment Status

1. **Go to your backend project in Vercel**
2. **Click "Deployments" tab**
3. **Look for the latest deployment:**
   - Status should be **"Ready"** (green checkmark)
   - If it says "Error" or "Failed", the deployment didn't work

4. **Click on the deployment:**
   - You'll see the URL at the top
   - Use the **production** URL (not preview URLs)

---

### Method 3: Via CLI

If you deployed via CLI, the URL was shown after deployment:

```bash
cd node-backend
vercel --prod
```

The output will show:
```
✅ Production: https://aras-llantas-api.vercel.app [copied to clipboard]
```

---

## ⚠️ Common Mistakes

### ❌ Using Preview URLs
**Wrong:**
```
https://aras-llantas-api-gq84v-abc123.vercel.app
```
These expire and cause `DEPLOYMENT_NOT_FOUND` errors.

**Correct:**
```
https://aras-llantas-api.vercel.app
```
This is the stable production URL.

---

### ❌ Using Wrong Project URL
Make sure you're using the **backend** project URL, not the frontend URL!

**Backend URL:** `https://aras-llantas-api.vercel.app`  
**Frontend URL:** `https://aras-llantas-frontend.vercel.app` (different!)

---

## ✅ Test Your Backend URL

Once you have the correct root URL, test it:

1. **Root endpoint:**
   ```
   https://your-backend-url.vercel.app/
   ```
   Should show API information

2. **Health endpoint:**
   ```
   https://your-backend-url.vercel.app/api/health
   ```
   Should return: `{"status":"ok",...}`

3. **API root:**
   ```
   https://your-backend-url.vercel.app/api
   ```
   Should show available endpoints

---

## 🚨 If You Still Get DEPLOYMENT_NOT_FOUND

### Check 1: Is the deployment successful?
- Go to Vercel Dashboard → Your Backend Project
- Check if latest deployment shows **"Ready"** (green)
- If it shows "Error" or "Failed", the deployment didn't work

### Check 2: Are you using the right project?
- Make sure you're looking at the **backend** project, not frontend
- Backend project name should be something like `aras-llantas-api`

### Check 3: Redeploy if needed
If the deployment failed or you can't find it:

```bash
cd node-backend
vercel --prod
```

This will create a new deployment and show you the URL.

---

## 📝 Quick Reference

**Your Backend Root URL should look like:**
```
https://[your-project-name].vercel.app
```

**Examples:**
- `https://aras-llantas-api.vercel.app`
- `https://my-api-backend.vercel.app`
- `https://api-backend-123.vercel.app`

**NOT:**
- ❌ `https://aras-llantas-api-gq84v-abc123.vercel.app` (preview URL - expires)
- ❌ `https://aras-llantas-frontend.vercel.app` (frontend URL - wrong project)

---

## 🎯 Next Steps

Once you have your backend root URL:

1. **Test it:** Visit `https://your-backend-url.vercel.app/api/health`
2. **Set frontend environment variable:**
   - Go to Frontend Project → Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.vercel.app/api`
3. **Redeploy frontend** after adding the environment variable

---

**Still having issues?** Check the Vercel deployment logs for error messages!

