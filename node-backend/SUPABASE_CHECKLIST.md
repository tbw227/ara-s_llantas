# Supabase Setup Checklist

## ✅ What We Have

### Configuration Files:
- ✅ **`knexfile.js`** - Configured for PostgreSQL with connection string support
- ✅ **`package.json`** - Has `pg` package (PostgreSQL driver)
- ✅ **`env.production.example`** - Updated with Postgres configuration examples
- ✅ **`db/connection.js`** - Uses Knex, compatible with Postgres

### Migrations:
- ✅ **`migrations/001_create_tires.js`** - Creates tires table
- ✅ **`migrations/002_create_contact_messages.js`** - Creates contact_messages table
- ✅ **`migrations/003_create_newsletter_subscribers.js`** - Creates newsletter_subscribers table

### Documentation:
- ✅ **`SUPABASE_SETUP.md`** - Complete Supabase setup guide
- ✅ **`POSTGRES_SETUP.md`** - General Postgres setup guide

---

## 📋 What You Need to Do

### Step 1: Install Dependencies
```bash
cd node-backend
npm install
```

This will install:
- `pg` - PostgreSQL driver
- `knex` - Query builder (already installed)
- All other dependencies

### Step 2: Create Supabase Project
1. Go to https://supabase.com
2. Sign up / Log in
3. Create new project
4. Save your database password

### Step 3: Get Connection String
1. Supabase Dashboard → Settings → Database
2. Copy connection string (URI format)
3. Replace `[YOUR-PASSWORD]` with actual password

### Step 4: Add to Vercel
1. Vercel Dashboard → Backend Project → Settings → Environment Variables
2. Add: `DATABASE_URL` = (your Supabase connection string)
3. Redeploy backend

### Step 5: Run Migrations
```bash
cd node-backend

# Set environment variable (Windows PowerShell)
$env:DATABASE_URL="postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"

# Run migrations
npm run db:migrate
```

---

## 🔍 Verification

### Check if pg is installed:
```bash
cd node-backend
npm list pg
```

Should show: `pg@8.11.3` (or similar version)

### Test Connection:
```bash
cd node-backend
node -e "require('./db/connection').raw('SELECT 1').then(() => console.log('✅ Connected!')).catch(e => console.error('❌ Error:', e))"
```

---

## 📝 Summary

**Everything is ready!** You just need to:
1. ✅ Install dependencies (`npm install`)
2. ✅ Create Supabase project
3. ✅ Get connection string
4. ✅ Add to Vercel environment variables
5. ✅ Run migrations

All the code and configuration is already set up for PostgreSQL/Supabase! 🎉

