# Vercel Deployment Guide

## ⚠️ Important: Deploy Frontend and Backend Separately!

**The error you're seeing:**
```
ENOENT: no such file or directory, stat '/var/task/frontend/build/index.html'
```

This happens because Vercel is trying to deploy your **backend** which is looking for frontend files that don't exist in the serverless environment.

**Solution:** Deploy **frontend** and **backend** as **TWO SEPARATE Vercel projects**.

---

## Step 1: Deploy Frontend to Vercel

### Option A: Via Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? **Yes**
   - Which scope? (Choose your account)
   - Link to existing project? **No**
   - Project name: `aras-llantas-frontend` (or your choice)
   - Directory: `./`
   - Override settings? **No**

5. **Get your frontend URL:**
   - Use your custom domain: `https://arasllantas.com`

### Option B: Via Vercel Dashboard

1. Go to `https://vercel.com`
2. Click "New Project"
3. Import your Git repository
4. **Root Directory:** Set to `frontend`
5. **Framework Preset:** Create React App
6. **Build Command:** `npm run build`
7. **Output Directory:** `build`
8. **Install Command:** `npm install`
9. Click **Deploy**
10. In Project → Settings → Domains, add:
    - `arasllantas.com`
    - `www.arasllantas.com`

---

## Step 2: Deploy Backend to Vercel (Serverless Functions)

### Option A: Deploy Backend as Separate Vercel Project

1. **Navigate to backend folder:**
   ```bash
   cd node-backend
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow prompts:**
   - Set up and deploy? **Yes**
   - Link to existing project? **No**
   - Project name: `aras-llantas-api` (or your choice)
   - Directory: `./`
   - Override settings? **No**

4. **Get your backend URL:**
   - Use your custom subdomain: `https://api.arasllantas.com`

5. In Project → Settings → Domains, add:
   - `api.arasllantas.com`

### Option B: Deploy Backend via Dashboard

1. Go to `https://vercel.com`
2. Click "New Project"
3. Import your Git repository
4. **Root Directory:** Set to `node-backend`
5. **Framework Preset:** Other
6. **Build Command:** (leave empty or `npm install`)
7. **Output Directory:** (leave empty)
8. Click **Deploy**
9. Add domain `api.arasllantas.com` to this project

---

## Step 3: Configure Environment Variables

### For Frontend Project:

In Vercel Dashboard → Your Frontend Project → Settings → Environment Variables:

```
REACT_APP_API_URL = https://api.arasllantas.com/api
```

### For Backend Project:

In Vercel Dashboard → Your Backend Project → Settings → Environment Variables:

**Option 1: Connection String (Recommended)**
```
NODE_ENV = production
DATABASE_URL = postgresql://user:password@host:5432/database_name
CORS_ORIGINS = https://arasllantas.com,https://www.arasllantas.com
```

**Option 2: Individual Parameters**
```
NODE_ENV = production
DB_HOST = your-database-host
DB_USER = your-database-user
DB_PASSWORD = your-database-password
DB_NAME = aras_llantas
DB_PORT = 5432
DB_SSL = true
CORS_ORIGINS = https://arasllantas.com,https://www.arasllantas.com
```

**Important:** After adding environment variables, **redeploy** both projects!

---

## Step 4: Database Setup

Vercel serverless functions need an external database. Options:

### Option A: Vercel Postgres (Recommended for Vercel)

1. In Vercel Dashboard → Your Backend Project
2. Go to **Storage** → **Create Database** → **Postgres**
3. Follow the setup wizard (database name, region, etc.)
4. Vercel will automatically add `POSTGRES_URL` to your environment variables
5. Add `DATABASE_URL` = `POSTGRES_URL` (or use the connection string directly)
6. **Redeploy** your backend project
7. Run migrations (see `node-backend/POSTGRES_SETUP.md`)

### Option B: External Database Service

Use services like:
- Railway (Postgres, free tier available)
- Render (Postgres, free tier available)
- Supabase (Postgres, free tier)
- Neon (Postgres, free tier)

Then update `DATABASE_URL` or `DB_HOST`, `DB_USER`, `DB_PASSWORD` in Vercel environment variables.

**See `node-backend/POSTGRES_SETUP.md` for detailed setup instructions.**

---

## Step 5: Update API URL in Frontend

After backend is deployed, update frontend's environment variable:

```
REACT_APP_API_URL = https://api.arasllantas.com/api
```

Redeploy frontend after updating.

---

## Alternative: Deploy Backend Elsewhere

If you prefer not to use Vercel for backend, you can deploy it to:

### Railway (Recommended)
1. Go to `https://railway.app`
2. New Project → Deploy from GitHub
3. Select your repo
4. Set root directory to `node-backend`
5. Add environment variables
6. Deploy

### Render
1. Go to `https://render.com`
2. New → Web Service
3. Connect GitHub repo
4. Root directory: `node-backend`
5. Build command: `npm install`
6. Start command: `node server.js`
7. Add environment variables
8. Deploy

Then update frontend's `REACT_APP_API_URL` to point to your backend.

---

## Troubleshooting

### Frontend can't connect to backend

**Common Issues:**

1. **Environment Variable Not Set:**
   - ✅ Go to Frontend Project → Settings → Environment Variables
   - ✅ Add `REACT_APP_API_URL` = `https://your-backend-url.vercel.app/api`
   - ✅ **MUST redeploy frontend after adding environment variable**

2. **CORS Errors:**
   - ✅ Go to Backend Project → Settings → Environment Variables
   - ✅ Add `CORS_ORIGINS` = `https://your-frontend-url.vercel.app`
   - ✅ Include both `www` and non-`www` versions if needed
   - ✅ **MUST redeploy backend after adding environment variable**

3. **Backend Not Accessible:**
   - ✅ Test backend URL directly: `https://your-backend-url.vercel.app/api/health`
   - ✅ Check backend deployment logs in Vercel
   - ✅ Verify backend URL is correct (no typos)

4. **404 Errors:**
   - ✅ Make sure backend URL ends with `/api`
   - ✅ Check backend routes are set up correctly

**Quick Checklist:**
- [ ] `REACT_APP_API_URL` is set in frontend environment variables
- [ ] `CORS_ORIGINS` is set in backend environment variables
- [ ] Both projects have been **redeployed** after adding environment variables
- [ ] Backend health endpoint works: `/api/health`
- [ ] Frontend can make API calls (check browser console)

### Backend errors
- Check environment variables are set
- Verify database connection
- Check Vercel function logs
- Make sure all dependencies are in `package.json`

### Build errors
- Make sure you're deploying from the correct directory
- Check `package.json` has all dependencies
- Verify build commands are correct

---

## Quick Deploy Commands

**Frontend:**
```bash
cd frontend
vercel
```

**Backend:**
```bash
cd node-backend
vercel
```

**Update environment variables in Vercel dashboard, then redeploy!**

---

## Your URLs

After deployment:
- **Frontend:** `https://arasllantas.com`
- **Backend API:** `https://api.arasllantas.com/api`

Share your frontend URL! 🚀

