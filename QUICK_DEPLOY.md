# Quick Deploy - Share Your Website

## Fastest Option: Vercel (5 minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd frontend
vercel
```

### Step 3: Follow Prompts
- It will ask if you want to deploy - say **Yes**
- It will give you a URL like: `https://aras-llantas-abc123.vercel.app`
- **That's your shareable link!** 🎉

### Step 4: Share the Link
Copy the URL and share it with anyone!

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

