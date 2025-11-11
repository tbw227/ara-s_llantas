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

```
NODE_ENV = production
DB_HOST = your-database-host
DB_USER = your-database-user
DB_PASSWORD = your-database-password
DB_NAME = aras_llantas
CORS_ORIGINS = https://arasllantas.com,https://www.arasllantas.com
```

**Important:** After adding environment variables, **redeploy** both projects!

---

## Step 4: Database Setup

Vercel serverless functions need an external database. Options:

### Option A: Vercel Postgres (Recommended for Vercel)

1. In Vercel Dashboard → Your Backend Project
2. Go to **Storage** → **Create Database** → **Postgres**
3. Update your backend to use Postgres instead of MySQL
4. Update connection string in environment variables

### Option B: External Database Service

Use services like:
- Railway (free tier available)
- Render (free tier available)
- PlanetScale (MySQL compatible, free tier)
- Supabase (Postgres, free tier)

Then update `DB_HOST`, `DB_USER`, `DB_PASSWORD` in Vercel environment variables.

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
- Check `REACT_APP_API_URL` is set to `https://api.arasllantas.com/api`
- Verify backend is deployed and accessible
- Check CORS settings in backend
- Make sure backend allows your frontend domain

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

