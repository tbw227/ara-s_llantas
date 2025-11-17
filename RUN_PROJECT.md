# Running the Project - Verification Guide

## ✅ Console.log Status

All console.log statements are properly wrapped:
- ✅ Only show in development mode (`process.env.NODE_ENV === 'development'`)
- ✅ No console errors in production
- ✅ All properly commented with `eslint-disable-next-line no-console`

## 🚀 Starting the Project

### Step 1: Start Backend Server

Open a terminal and run:
```bash
cd node-backend
npm start
```

**Expected output:**
- Server should start on port 8001
- In development, you'll see startup logs
- In production, logs are suppressed

### Step 2: Start Frontend Server

Open a **new terminal** and run:
```bash
cd frontend
npm start
```

**Expected output:**
- React dev server starts on port 3000
- Browser should open automatically
- In development, you'll see API request logs in console

### Step 3: Verify Connection

1. **Check Backend Health:**
   - Open: http://localhost:8001/api/health
   - Should return: `{"status":"ok"}`

2. **Check Frontend:**
   - Open: http://localhost:3000
   - Open browser DevTools (F12) → Console tab
   - Should see: `🌐 API Request: http://localhost:8001/api/tires` (development only)
   - No errors should appear

3. **Test API Connection:**
   ```bash
   node test-connection.js
   ```

## ✅ Verification Checklist

### Backend:
- [ ] Server starts without errors
- [ ] Health endpoint responds: http://localhost:8001/api/health
- [ ] Tires endpoint responds: http://localhost:8001/api/tires
- [ ] No console errors in terminal

### Frontend:
- [ ] React app starts without errors
- [ ] Browser opens to http://localhost:3000
- [ ] Page loads correctly
- [ ] Browser console shows API requests (development only)
- [ ] No console errors in browser
- [ ] Tires data loads on page
- [ ] Contact form works
- [ ] Newsletter signup works

## 🐛 Troubleshooting

### Backend won't start:
- Check if port 8001 is already in use
- Verify `.env` file exists in `node-backend/`
- Check database connection (if using database)

### Frontend can't connect to backend:
- Verify backend is running on port 8001
- Check browser console for CORS errors
- Verify `REACT_APP_API_URL` is not set (should use localhost in dev)

### Console errors in production:
- All console.log statements are wrapped in development checks
- Production builds should have no console output
- If errors appear, check environment variables

## 📝 Notes

- **Development:** Console logs are enabled for debugging
- **Production:** All console logs are suppressed
- **API URL:** Auto-detects in production, uses localhost in development
- **CORS:** Configured to allow localhost:3000 in development

---

**Everything should work smoothly with no console errors in production!** 🎉

