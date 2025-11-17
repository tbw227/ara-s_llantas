# PostgreSQL Database Setup Guide

This guide will help you set up PostgreSQL for the Ara's Llanta's backend.

---

## 🚀 Quick Setup Options

### Option 1: Vercel Postgres (Recommended for Vercel Deployments)

**Easiest option if you're deploying to Vercel!**

1. **Go to Vercel Dashboard:**
   - Open your backend project
   - Click **Storage** tab
   - Click **Create Database** → **Postgres**

2. **Follow the setup wizard:**
   - Choose a database name (e.g., `aras_llantas`)
   - Select a region closest to you
   - Click **Create**

3. **Get Connection String:**
   - Vercel will automatically add `POSTGRES_URL` to your environment variables
   - Copy the connection string

4. **Update Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Add: `DATABASE_URL` = `POSTGRES_URL` (or use the connection string directly)
   - **Important:** Redeploy after adding environment variables!

5. **Run Migrations:**
   ```bash
   cd node-backend
   npm run db:migrate
   ```

---

### Option 2: Railway (Free Tier Available)

1. **Go to Railway:**
   - Visit: https://railway.app
   - Sign up for free account

2. **Create New Project:**
   - Click **New Project**
   - Select **Provision PostgreSQL**

3. **Get Connection String:**
   - Click on the PostgreSQL service
   - Go to **Variables** tab
   - Copy the `DATABASE_URL`

4. **Add to Vercel:**
   - Go to Vercel Dashboard → Your Backend Project
   - **Settings** → **Environment Variables**
   - Add: `DATABASE_URL` = (paste connection string)
   - Redeploy!

5. **Run Migrations:**
   ```bash
   cd node-backend
   npm run db:migrate
   ```

---

### Option 3: Supabase (Free Tier Available)

1. **Go to Supabase:**
   - Visit: https://supabase.com
   - Sign up for free account

2. **Create New Project:**
   - Click **New Project**
   - Fill in project details
   - Wait for database to be created

3. **Get Connection String:**
   - Go to **Project Settings** → **Database**
   - Find **Connection String** section
   - Copy the **URI** (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`)

4. **Add to Vercel:**
   - Go to Vercel Dashboard → Your Backend Project
   - **Settings** → **Environment Variables**
   - Add: `DATABASE_URL` = (paste connection string)
   - Redeploy!

5. **Run Migrations:**
   ```bash
   cd node-backend
   npm run db:migrate
   ```

---

### Option 4: Render (Free Tier Available)

1. **Go to Render:**
   - Visit: https://render.com
   - Sign up for free account

2. **Create PostgreSQL Database:**
   - Click **New** → **PostgreSQL**
   - Choose a name (e.g., `aras-llantas-db`)
   - Select **Free** plan
   - Click **Create Database**

3. **Get Connection String:**
   - Go to your database dashboard
   - Find **Internal Database URL** or **External Database URL**
   - Copy the connection string

4. **Add to Vercel:**
   - Go to Vercel Dashboard → Your Backend Project
   - **Settings** → **Environment Variables**
   - Add: `DATABASE_URL` = (paste connection string)
   - Redeploy!

5. **Run Migrations:**
   ```bash
   cd node-backend
   npm run db:migrate
   ```

---

### Option 5: Local PostgreSQL (For Development)

1. **Install PostgreSQL:**
   - **Windows:** Download from https://www.postgresql.org/download/windows/
   - **Mac:** `brew install postgresql`
   - **Linux:** `sudo apt-get install postgresql`

2. **Create Database:**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE aras_llantas;

   # Create user (optional)
   CREATE USER aras_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE aras_llantas TO aras_user;

   # Exit
   \q
   ```

3. **Create `.env` file:**
   ```bash
   cd node-backend
   cp env.production.example .env
   ```

4. **Update `.env` file:**
   ```
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=aras_llantas
   DB_PORT=5432
   ```

5. **Install Dependencies:**
   ```bash
   npm install
   ```

6. **Run Migrations:**
   ```bash
   npm run db:migrate
   ```

---

## 📦 Install Dependencies

After switching to Postgres, install the PostgreSQL driver:

```bash
cd node-backend
npm install pg
npm uninstall mysql2  # Remove MySQL driver if it exists
```

---

## 🔧 Environment Variables

### For Vercel (Production):

**Option 1: Connection String (Recommended)**
```
DATABASE_URL=postgresql://user:password@host:5432/database_name
```

**Option 2: Individual Parameters**
```
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=aras_llantas
DB_PORT=5432
DB_SSL=true
```

---

## 🗄️ Run Migrations

After setting up your database, run migrations to create tables:

```bash
cd node-backend

# For development
npm run db:migrate

# For production (if deploying to Vercel, migrations run automatically)
# Or manually:
NODE_ENV=production npm run db:migrate
```

---

## ✅ Verify Setup

1. **Test Database Connection:**
   ```bash
   cd node-backend
   node -e "require('./db/connection').raw('SELECT 1').then(() => console.log('✅ Connected!')).catch(e => console.error('❌ Error:', e))"
   ```

2. **Check Tables:**
   - Connect to your database
   - Run: `\dt` (in psql) or check via database dashboard
   - You should see:
     - `tires`
     - `contact_messages`
     - `newsletter_subscribers`
     - `knex_migrations`

3. **Test API:**
   - Start your backend: `npm start`
   - Visit: `http://localhost:8001/api/health`
   - Should return: `{"status":"ok",...}`

---

## 🔄 Migration from MySQL

If you were using MySQL before:

1. **Export data (if needed):**
   ```bash
   mysqldump -u root -p aras_llantas > backup.sql
   ```

2. **Set up Postgres** (follow one of the options above)

3. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

4. **Import data** (if needed - requires conversion from MySQL to Postgres format)

---

## 🐛 Troubleshooting

### Connection Refused
- Check if PostgreSQL is running
- Verify `DB_HOST` and `DB_PORT` are correct
- Check firewall settings

### Authentication Failed
- Verify `DB_USER` and `DB_PASSWORD` are correct
- Check database user permissions

### SSL Required
- Set `DB_SSL=true` in environment variables
- Or add `?ssl=true` to connection string

### Migration Errors
- Make sure database exists
- Check user has CREATE TABLE permissions
- Verify connection string is correct

---

## 📚 Resources

- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Knex.js Docs:** https://knexjs.org/
- **Vercel Postgres:** https://vercel.com/docs/storage/vercel-postgres
- **Railway:** https://railway.app
- **Supabase:** https://supabase.com

---

**Need help?** Check the deployment logs in Vercel for specific error messages!

