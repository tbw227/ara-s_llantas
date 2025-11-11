# Quick Deploy - Share Your Website

## ⚠️ Important: Deploy Frontend and Backend Separately!

You need to create **TWO separate Vercel projects**:
1. **Frontend** (React app) - This is your main website
2. **Backend** (Node.js API) - This handles forms and database

---

## Fastest Option: Vercel (5 minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy Frontend
```bash
cd frontend
vercel
```

### Step 3: Follow Prompts
- It will ask if you want to deploy - say **Yes**
- Project name: `aras-llantas-frontend` (or your choice)
- It will give you a URL like: `https://aras-llantas-frontend.vercel.app`
- **Save this URL!** 🎉

### Step 4: Deploy Backend (Separate Project)
```bash
cd ../node-backend
vercel
```

- Project name: `aras-llantas-api` (or your choice)
- It will give you a URL like: `https://aras-llantas-api.vercel.app`
- **Save this URL!**

### Step 5: Connect Frontend to Backend
1. Go to Vercel Dashboard → Your Frontend Project
2. Settings → Environment Variables
3. Add: `REACT_APP_API_URL` = `https://aras-llantas-api.vercel.app/api`
4. **Redeploy** the frontend project

### Step 6: Share the Link
Copy your **frontend URL** and share it with anyone! 🎉

---

## Alternative: Netlify (Also Fast)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Build Your Site
```bash
cd frontend
npm run build
```

### Step 3: Deploy
```bash
netlify deploy --prod --dir=build
```

### Step 4: Get Your Link
Netlify will give you a URL like: `https://aras-llantas.netlify.app`

---

## What You Get

✅ **Free hosting**  
✅ **HTTPS (secure)**  
✅ **Shareable URL**  
✅ **Works on mobile & desktop**  
✅ **Fast loading**

---

## Important Notes

1. **Backend API**: If your backend is on a different server, make sure to set the `REACT_APP_API_URL` environment variable in Vercel/Netlify dashboard

2. **Database**: Newsletter subscriptions will work if your backend is also deployed and accessible

3. **Custom Domain**: You can add your own domain later (optional)

---

## Need Help?

If you run into issues:
- Make sure you're in the `frontend` folder
- Make sure you've run `npm install` first
- Check that `npm run build` works locally

---

## Quick Commands

**Vercel:**
```bash
cd frontend
vercel
```

**Netlify:**
```bash
cd frontend
npm run build
netlify deploy --prod --dir=build
```

That's it! You'll have a live, shareable website in minutes! 🚀

