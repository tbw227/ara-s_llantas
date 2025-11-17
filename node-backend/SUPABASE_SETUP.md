# Supabase PostgreSQL Setup Guide

This guide will help you set up Supabase PostgreSQL for the Ara's Llanta's backend.

---

## 🚀 Quick Setup Steps

### Step 1: Create Supabase Account

1. **Go to Supabase:**
   - Visit: https://supabase.com
   - Click **Start your project** or **Sign up**

2. **Sign up:**
   - Use GitHub, Google, or email
   - Verify your email if needed

---

### Step 2: Create a New Project

1. **Click "New Project"** in the Supabase dashboard

2. **Fill in project details:**
   - **Name:** `aras-llantas` (or your choice)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to you (e.g., `US East (North Virginia)`)
   - **Pricing Plan:** Free tier is fine to start

3. **Click "Create new project"**
   - Wait 2-3 minutes for database to be created

---

### Step 3: Get Connection String

1. **Go to Project Settings:**
   - Click the **gear icon** (⚙️) in the left sidebar
   - Click **Database**

2. **Find Connection String:**
   - Scroll down to **Connection string** section
   - Look for **URI** tab
   - You'll see something like:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
     ```

3. **Copy the connection string:**
   - Replace `[YOUR-PASSWORD]` with your actual database password
   - Example:
     ```
     postgresql://postgres:your_actual_password@db.abc123.supabase.co:5432/postgres
     ```

---

### Step 4: Add to Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com
   - Open your **backend project** (e.g., `aras-llantas-api`)

2. **Add Environment Variable:**
   - Click **Settings** → **Environment Variables**
   - Click **Add New**
   - **Key:** `DATABASE_URL`
   - **Value:** Paste your Supabase connection string
   - **Environments:** Select all (Production, Preview, Development)
   - Click **Save**

---

### Step 5: Redeploy Backend

**IMPORTANT:** After adding environment variables, you MUST redeploy!

1. **Go to Deployments tab**
2. **Click the three dots (⋯) on latest deployment**
3. **Click "Redeploy"**
4. **Wait for deployment to complete**

---

### Step 6: Run Migrations

After redeploying, you need to run migrations to create the database tables.

#### Option A: Run Migrations Locally (Recommended)

1. **Install dependencies:**
   ```bash
   cd node-backend
   npm install
   ```

2. **Set environment variable:**
   ```bash
   # Windows PowerShell
   $env:DATABASE_URL="postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres"
   
   # Windows CMD
   set DATABASE_URL=postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres
   
   # Mac/Linux
   export DATABASE_URL="postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres"
   ```

3. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

#### Option B: Run Migrations via Supabase SQL Editor

1. **Go to Supabase Dashboard:**
   - Click **SQL Editor** in left sidebar
   - Click **New query**

2. **Run this SQL to create tables:**
   ```sql
   -- Create tires table
   CREATE TABLE IF NOT EXISTS tires (
     id VARCHAR(255) PRIMARY KEY,
     brand VARCHAR(255) NOT NULL,
     size VARCHAR(255) NOT NULL,
     price DECIMAL(10, 2) NOT NULL,
     image VARCHAR(255) NOT NULL,
     description TEXT NOT NULL,
     category VARCHAR(50) NOT NULL CHECK (category IN ('lawn', 'motorcycle')),
     stock INTEGER NOT NULL DEFAULT 0,
     position VARCHAR(255),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create contact_messages table
   CREATE TABLE IF NOT EXISTS contact_messages (
     id VARCHAR(255) PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(255),
     message TEXT NOT NULL,
     status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create newsletter_subscribers table
   CREATE TABLE IF NOT EXISTS newsletter_subscribers (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) NOT NULL UNIQUE,
     status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
     source VARCHAR(255) DEFAULT 'website',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create indexes
   CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
   CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
   ```

3. **Click "Run"** to execute

---

## ✅ Verify Setup

### 1. Test Database Connection

```bash
cd node-backend
node -e "require('./db/connection').raw('SELECT 1').then(() => console.log('✅ Connected!')).catch(e => console.error('❌ Error:', e))"
```

### 2. Check Tables in Supabase

1. **Go to Supabase Dashboard**
2. **Click "Table Editor"** in left sidebar
3. **You should see:**
   - `tires`
   - `contact_messages`
   - `newsletter_subscribers`

### 3. Test API Endpoints

1. **Visit your backend health endpoint:**
   ```
   https://your-backend-url.vercel.app/api/health
   ```

2. **Should return:**
   ```json
   {
     "status": "ok",
     "timestamp": "...",
     "uptime": ...,
     "environment": "production"
   }
   ```

---

## 🔐 Security Best Practices

### 1. Use Connection Pooling (Recommended)

Supabase provides a connection pooler. Use this connection string instead:

1. **Go to Supabase Dashboard** → **Settings** → **Database**
2. **Find "Connection pooling"** section
3. **Use the "Session" or "Transaction" mode connection string**
4. **Update `DATABASE_URL` in Vercel with the pooled connection string**

**Benefits:**
- Better performance
- Handles more concurrent connections
- Recommended for serverless functions (Vercel)

### 2. Enable Row Level Security (Optional)

For additional security, you can enable Row Level Security in Supabase:

1. **Go to Supabase Dashboard** → **Authentication** → **Policies**
2. **Create policies** to restrict access if needed

---

## 🐛 Troubleshooting

### Connection Refused

**Problem:** Can't connect to database

**Solutions:**
- ✅ Check connection string is correct
- ✅ Verify password is correct (no special characters need URL encoding)
- ✅ Check if IP is whitelisted (Supabase allows all by default)
- ✅ Verify database is running (check Supabase dashboard)

### Authentication Failed

**Problem:** Wrong password or user

**Solutions:**
- ✅ Double-check password in connection string
- ✅ Make sure you're using `postgres` as the user
- ✅ URL-encode special characters in password if needed

### SSL Required

**Problem:** SSL connection error

**Solutions:**
- ✅ Supabase requires SSL - make sure connection string includes `?sslmode=require`
- ✅ Or add `?ssl=true` to connection string
- ✅ The knexfile.js should handle this automatically

### Migration Errors

**Problem:** Tables already exist or migration fails

**Solutions:**
- ✅ Check if tables already exist in Supabase Table Editor
- ✅ Drop existing tables if needed (be careful!)
- ✅ Run migrations again
- ✅ Check Supabase logs for errors

---

## 📊 Supabase Dashboard Features

Once set up, you can use Supabase features:

1. **Table Editor:** View and edit data directly
2. **SQL Editor:** Run custom queries
3. **API:** Supabase auto-generates REST API (optional)
4. **Realtime:** Real-time subscriptions (optional)
5. **Storage:** File storage (optional)

---

## 🔄 Connection String Format

**Standard Connection:**
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```

**With SSL:**
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres?sslmode=require
```

**Connection Pooling (Recommended for Vercel):**
```
postgresql://postgres:password@db.xxxxx.supabase.co:6543/postgres?pgbouncer=true
```

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Connection Pooling:** https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler

---

## 🎯 Next Steps

After setup:

1. ✅ Database is connected
2. ✅ Tables are created
3. ✅ Backend is deployed
4. ✅ Test API endpoints
5. ✅ Connect frontend to backend

**Your backend is now using Supabase PostgreSQL!** 🎉

