# Ara's Llanta's - Complete Setup Guide

This is a comprehensive step-by-step guide to set up the Ara's Llanta's project from scratch. Follow these instructions to get the project running on your local machine.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Database Setup (Optional)](#database-setup-optional)
6. [Running the Application](#running-the-application)
7. [Verifying Everything Works](#verifying-everything-works)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required:
- **Node.js** (version 18 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version` (should show v18.x.x or higher)
  - Verify npm: `npm --version` (should show 9.x.x or higher)

- **Git** (for cloning the repository)
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

### Optional (for full functionality):
- **MySQL** (version 8.0 or higher)
  - Download from: https://dev.mysql.com/downloads/
  - Or use a cloud MySQL service (e.g., PlanetScale, AWS RDS)
  - **Note**: The app works without MySQL (uses in-memory storage as fallback)

### Recommended Tools:
- **VS Code** (or your preferred code editor)
- **Postman** or **Insomnia** (for testing API endpoints)

---

## Initial Setup

### Step 1: Clone or Download the Repository

If you have the repository on GitHub:
```bash
git clone <repository-url>
cd ara's_llantas
```

If you have the project files locally, navigate to the project directory:
```bash
cd "C:\Users\YourName\Desktop\my work\ara's_llantas"
```

### Step 2: Verify Project Structure

You should see the following structure:
```
ara's_llantas/
├── frontend/          # React frontend application
├── node-backend/      # Express.js backend API
├── README.md          # Main project documentation
├── SETUP_GUIDE.md     # This file
└── ... (other files)
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd node-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`. This may take a few minutes.

**Expected output:**
```
added 234 packages, and audited 235 packages in 15s
```

### Step 3: Create Environment File

Create a new file named `.env` in the `node-backend` directory.

**On Windows (PowerShell):**
```powershell
New-Item -Path .env -ItemType File
```

**On Mac/Linux:**
```bash
touch .env
```

### Step 4: Configure Environment Variables

Open the `.env` file and add the following content:

```env
# Server Configuration
PORT=8001
NODE_ENV=development

# Database Configuration (Optional - app works without MySQL)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=aras_llantas

# CORS Configuration
CORS_ORIGINS=http://localhost:3000

# JWT Secret (generate a random string)
JWT_SECRET=your_random_secret_key_here_min_32_characters
```

**Important Notes:**
- Replace `your_password_here` with your MySQL password (if using MySQL)
- Replace `your_random_secret_key_here_min_32_characters` with a secure random string
- If you're not using MySQL, you can leave the DB_* variables as-is (the app will use in-memory storage)

**Generate a JWT Secret (optional):**
```bash
# On Mac/Linux
openssl rand -base64 32

# On Windows (PowerShell)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### Step 5: Verify Backend Setup

Test that the backend can start:

```bash
npm start
```

**Expected output:**
```
🚀 Starting Ara's Llanta's API Server...
📊 Environment: development
🔌 Port: 8001
✅ Server running on http://localhost:8001
```

**Press `Ctrl+C` to stop the server.**

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a **new terminal window** (keep the backend terminal open if it's running) and navigate to the frontend:

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all React dependencies. This may take a few minutes.

**Expected output:**
```
added 1456 packages, and audited 1457 packages in 45s
```

### Step 3: Create Environment File (Optional)

The frontend works with default settings, but you can create a `.env` file for custom configuration:

**On Windows (PowerShell):**
```powershell
New-Item -Path .env -ItemType File
```

**On Mac/Linux:**
```bash
touch .env
```

Add the following (if you want to customize the API URL):

```env
REACT_APP_API_URL=http://localhost:8001/api
```

**Note:** The default is `http://localhost:8001/api`, so you only need this if your backend runs on a different port.

---

## Database Setup (Optional)

The application works **without a database** (uses in-memory storage), but for production use, you'll want to set up MySQL.

### Step 1: Install MySQL

- **Windows**: Download MySQL Installer from https://dev.mysql.com/downloads/installer/
- **Mac**: `brew install mysql` or download from MySQL website
- **Linux**: `sudo apt-get install mysql-server` (Ubuntu/Debian)

### Step 2: Start MySQL Service

**Windows:**
- MySQL should start automatically after installation
- Or use Services app to start "MySQL80"

**Mac:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

### Step 3: Create Database

Connect to MySQL:

```bash
mysql -u root -p
```

Enter your MySQL root password when prompted.

Create the database:

```sql
CREATE DATABASE aras_llantas;
EXIT;
```

### Step 4: Run Migrations

Navigate to the backend directory:

```bash
cd node-backend
```

Run migrations to create tables:

```bash
npm run db:migrate
```

**Expected output:**
```
Using environment: development
Batch 1 run: 3 migrations
```

### Step 5: Seed Database (Optional)

Populate the database with sample tire data:

```bash
npm run db:seed
```

**Expected output:**
```
Seeded: 001_tires.js
```

---

## Running the Application

### Option 1: Run Both Servers Manually

**Terminal 1 - Backend:**
```bash
cd node-backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Option 2: Use Development Scripts (Backend)

For backend auto-reload on file changes:

```bash
cd node-backend
npm run dev
```

### Option 3: Use Batch Scripts (Windows)

If you're on Windows, you can use the provided batch scripts:

**Start both servers:**
```bash
start-both-servers.bat
```

**Or start individually:**
```bash
start-backend-server.bat
start-frontend-server.bat
```

---

## Verifying Everything Works

### Step 1: Check Backend Health

Open your browser or use curl:

**Browser:**
```
http://localhost:8001/api/health
```

**Command Line:**
```bash
curl http://localhost:8001/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "database": "connected" // or "in-memory" if no DB
}
```

### Step 2: Check Frontend

Open your browser:
```
http://localhost:3000
```

You should see:
- The Ara's Llanta's homepage
- Hero section with logo
- Tire showcase section
- About section
- Email signup form
- Footer

### Step 3: Test API Endpoints

**Get all tires:**
```
http://localhost:8001/api/tires
```

**Get tire categories:**
```
http://localhost:8001/api/tires/categories
```

**Get tire brands:**
```
http://localhost:8001/api/tires/brands
```

### Step 4: Test Forms

1. **Newsletter Signup:**
   - Scroll to the email signup section
   - Enter an email address
   - Click "Subscribe"
   - You should see a thank you message

2. **Contact Form:**
   - Move your mouse to the top of the browser (exit intent)
   - A modal should appear
   - Fill out the form and submit
   - You should see a thank you confirmation

### Step 5: Test Language Toggle

- Click the language toggle button (EN/ES) in the header
- The page content should switch between English and Spanish

---

## Troubleshooting

### Backend Won't Start

**Problem:** `Error: listen EADDRINUSE`  
**Solution:** Port 8001 is already in use. Either:
- Stop the other application using port 8001
- Change the PORT in `node-backend/.env` to a different port (e.g., 8002)

**Problem:** `Cannot find module 'express'`  
**Solution:** Dependencies not installed. Run:
```bash
cd node-backend
npm install
```

**Problem:** Database connection error  
**Solution:** The app works without MySQL. If you want to use MySQL:
- Verify MySQL is running
- Check your `.env` file has correct database credentials
- Ensure the database `aras_llantas` exists

### Frontend Won't Start

**Problem:** `Error: listen EADDRINUSE: address already in use :::3000`  
**Solution:** Port 3000 is in use. Either:
- Stop the other application
- Kill the process: `npx kill-port 3000` (if you have kill-port installed)

**Problem:** `Module not found: Can't resolve './components/Header'`  
**Solution:** Dependencies not installed. Run:
```bash
cd frontend
npm install
```

**Problem:** API calls failing  
**Solution:** 
- Verify backend is running on port 8001
- Check `frontend/.env` has correct `REACT_APP_API_URL`
- Check browser console for CORS errors (backend CORS should allow localhost:3000)

### Images Not Loading

**Problem:** Images show broken image icon  
**Solution:**
- Verify images exist in `frontend/public/images/`
- Check image file names match exactly (case-sensitive)
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Database Issues

**Problem:** Migrations fail  
**Solution:**
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists: `CREATE DATABASE aras_llantas;`
- Try running migrations again: `npm run db:migrate`

**Problem:** "Database connection failed" but app still works  
**Solution:** This is normal! The app uses in-memory storage as fallback. To use MySQL:
- Fix your database connection settings
- Restart the backend server

---

## Next Steps

Once everything is running:

1. **Read the Documentation:**
   - `README.md` - Main project overview
   - `VERCEL_DEPLOYMENT.md` - How to deploy to Vercel
   - `PERFORMANCE_OPTIMIZATIONS.md` - Performance tips
   - `SITE_STATUS.md` - Current features and status

2. **Explore the Code:**
   - `frontend/src/components/` - React components
   - `node-backend/routes/` - API endpoints
   - `node-backend/migrations/` - Database schema

3. **Customize:**
   - Update business information in components
   - Add your own tire images
   - Modify styling in `frontend/src/index.css`
   - Add new API endpoints in `node-backend/routes/`

---

## Getting Help

If you encounter issues not covered here:

1. Check the browser console (F12) for errors
2. Check the backend terminal for error messages
3. Review the `README.md` for additional information
4. Check existing issues in the repository (if using Git)

---

## Quick Reference

### Common Commands

**Backend:**
```bash
cd node-backend
npm install          # Install dependencies
npm start           # Start server
npm run dev         # Start with auto-reload
npm test            # Run tests
npm run db:migrate  # Run database migrations
npm run db:seed     # Seed database
```

**Frontend:**
```bash
cd frontend
npm install         # Install dependencies
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests
```

**Both:**
```bash
# Windows
start-both-servers.bat

# Mac/Linux (requires both terminals)
# Terminal 1:
cd node-backend && npm start
# Terminal 2:
cd frontend && npm start
```

---

**Congratulations!** 🎉 You should now have the Ara's Llanta's project running locally. If you have any questions or run into issues, refer to the troubleshooting section above.

