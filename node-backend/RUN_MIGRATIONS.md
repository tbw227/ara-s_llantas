# How to Run Migrations with Supabase

## 🔧 Quick Fix

You need to set the `DATABASE_URL` environment variable with your Supabase connection string before running migrations.

---

## Step 1: Get Your Supabase Connection String

1. Go to **Supabase Dashboard** → Your Project
2. Click **Settings** (gear icon) → **Database**
3. Scroll to **Connection string** section
4. Click **URI** tab
5. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. **Replace `[YOUR-PASSWORD]`** with your actual database password

---

## Step 2: Run Migrations

### Option A: Set Environment Variable in Same Command (Windows PowerShell)

```powershell
cd node-backend

# Replace with your actual Supabase connection string
$env:DATABASE_URL="postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres"

# Run migrations
npm run db:migrate
```

### Option B: Set Environment Variable in Same Command (Windows CMD)

```cmd
cd node-backend

# Replace with your actual Supabase connection string
set DATABASE_URL=postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres

# Run migrations
npm run db:migrate
```

### Option C: Create .env File (Recommended for Development)

1. **Create `.env` file in `node-backend` folder:**
   ```bash
   cd node-backend
   ```

2. **Create `.env` file with:**
   ```
   DATABASE_URL=postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres
   NODE_ENV=development
   ```

3. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

**Note:** Make sure `.env` is in `.gitignore` (it should be already)

---

## Step 3: Verify Migrations Worked

After running migrations, check Supabase:

1. Go to **Supabase Dashboard** → Your Project
2. Click **Table Editor** in left sidebar
3. You should see these tables:
   - ✅ `tires`
   - ✅ `contact_messages`
   - ✅ `newsletter_subscribers`
   - ✅ `knex_migrations`

---

## 🔍 Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:5432"

**Problem:** Not using Supabase connection string

**Solution:**
- ✅ Make sure `DATABASE_URL` is set with your Supabase connection string
- ✅ Verify connection string is correct (no typos)
- ✅ Make sure password is correct

### Error: "password authentication failed"

**Problem:** Wrong password in connection string

**Solution:**
- ✅ Double-check your database password
- ✅ Make sure you replaced `[YOUR-PASSWORD]` in the connection string
- ✅ URL-encode special characters in password if needed

### Error: "database does not exist"

**Problem:** Wrong database name in connection string

**Solution:**
- ✅ Supabase default database is `postgres`
- ✅ Make sure connection string ends with `/postgres`
- ✅ Don't change the database name

---

## 📝 Example Connection String

**Format:**
```
postgresql://postgres:YOUR_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres
```

**Real Example:**
```
postgresql://postgres:mypassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

---

## ✅ Success Message

When migrations work, you'll see:
```
Using environment: development
Batch 1 run: 3 migrations
```

This means all 3 tables were created successfully!

---

## 🚀 Next Steps

After migrations succeed:
1. ✅ Tables are created in Supabase
2. ✅ Backend can connect to database
3. ✅ Test your API endpoints
4. ✅ Deploy to Vercel (make sure `DATABASE_URL` is set there too!)

