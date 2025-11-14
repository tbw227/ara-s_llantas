# Accessing Customer Data - Ara's Llanta's

This guide explains how to access and view customer information from your deployed backend.

---

## 📍 Where Customer Data is Stored

### 1. Contact Form Submissions
**Table:** `contact_messages`
- Name, Email, Phone, Message
- Status (new, read, replied)
- Timestamps

### 2. Newsletter Subscribers
**Table:** `newsletter_subscribers`
- Email
- Status (active, unsubscribed)
- Source
- Timestamps

---

## 🔍 How to Access Customer Data

### Option 1: Via API Endpoints (Recommended)

#### Get All Contact Messages
```bash
GET https://api.arasllantas.com/api/contact
```

**Or using curl:**
```bash
curl https://api.arasllantas.com/api/contact
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "555-1234",
      "message": "I need new tires for my motorcycle",
      "status": "new",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### Get All Newsletter Subscribers
```bash
GET https://api.arasllantas.com/api/newsletter/subscribers
```

**Or using curl:**
```bash
curl https://api.arasllantas.com/api/newsletter/subscribers
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "customer@example.com",
      "status": "active",
      "source": "website",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### Get Specific Contact Message
```bash
GET https://api.arasllantas.com/api/contact/{id}
```

Replace `{id}` with the actual message ID.

---

### Option 2: Using Browser

Simply open these URLs in your browser:

1. **Contact Messages:**
   ```
   https://api.arasllantas.com/api/contact
   ```

2. **Newsletter Subscribers:**
   ```
   https://api.arasllantas.com/api/newsletter/subscribers
   ```

The browser will display the JSON data (you may want to install a JSON formatter extension for better readability).

---

### Option 3: Using Postman or Insomnia

1. **Download Postman:** https://www.postman.com/downloads/
2. **Create a new GET request**
3. **Enter URL:** `https://api.arasllantas.com/api/contact`
4. **Click Send**
5. **View the response**

---

### Option 4: Direct Database Access

If you have database credentials and access:

#### Using MySQL Client:
```bash
mysql -h your-db-host -u your-db-user -p your-db-name
```

Then run:
```sql
-- View all contact messages
SELECT * FROM contact_messages ORDER BY created_at DESC;

-- View all newsletter subscribers
SELECT * FROM newsletter_subscribers ORDER BY created_at DESC;

-- Count total messages
SELECT COUNT(*) as total_messages FROM contact_messages;

-- Count active subscribers
SELECT COUNT(*) as active_subscribers 
FROM newsletter_subscribers 
WHERE status = 'active';
```

---

## ⚠️ Important: Check Database Configuration

### Verify Database is Configured

1. **Go to Vercel Dashboard:**
   - https://vercel.com/tbw227s-projects/aras-llantas-api
   - Settings → Environment Variables

2. **Check for these variables:**
   - `DB_HOST` - Your database host
   - `DB_USER` - Database username
   - `DB_PASSWORD` - Database password
   - `DB_NAME` - Database name (should be `aras_llantas`)

### If Database is NOT Configured

**Current Status:** Data is stored in **in-memory storage** (temporary)
- ✅ Data is accessible via API
- ❌ Data is lost when serverless function restarts
- ❌ Not suitable for production

**Solution:** Set up a database (see below)

---

## 🗄️ Setting Up a Database (If Not Already Done)

### Option 1: Vercel Postgres (Easiest for Vercel)

1. Go to your backend project in Vercel
2. Click **Storage** tab
3. Click **Create Database** → **Postgres**
4. Follow the setup wizard
5. Vercel will automatically add connection string to environment variables
6. **Note:** You'll need to update your backend code to use Postgres instead of MySQL

### Option 2: PlanetScale (MySQL Compatible - Recommended)

1. Go to https://planetscale.com
2. Sign up for free account
3. Create a new database
4. Get connection credentials
5. Add to Vercel environment variables:
   - `DB_HOST` = your-planetscale-host
   - `DB_USER` = your-planetscale-user
   - `DB_PASSWORD` = your-planetscale-password
   - `DB_NAME` = your-database-name
6. Run migrations:
   ```bash
   cd node-backend
   npm run db:migrate
   ```

### Option 3: Railway (Easy MySQL Setup)

1. Go to https://railway.app
2. Create new project
3. Add MySQL database
4. Get connection string
5. Add credentials to Vercel environment variables
6. Run migrations

### Option 4: Render (Free Tier Available)

1. Go to https://render.com
2. Create PostgreSQL database
3. Get connection credentials
4. Add to Vercel environment variables
5. Update backend to use Postgres

---

## 🔐 Security Note

**Important:** The current API endpoints (`GET /api/contact` and `GET /api/newsletter/subscribers`) are **public** and don't require authentication.

**For Production:**
- Add authentication/authorization
- Use API keys or JWT tokens
- Restrict access to admin users only
- Consider creating an admin dashboard

---

## 📊 Quick Test

Test if your backend is working and returning data:

```bash
# Test health endpoint
curl https://api.arasllantas.com/api/health

# Test contact messages (should return empty array if no data)
curl https://api.arasllantas.com/api/contact

# Test newsletter subscribers
curl https://api.arasllantas.com/api/newsletter/subscribers
```

---

## 🎯 Next Steps

1. ✅ **Verify backend is deployed** (you confirmed this)
2. ⬜ **Check if database is configured** (check Vercel environment variables)
3. ⬜ **Test API endpoints** (try the URLs above)
4. ⬜ **Set up database if needed** (if not already configured)
5. ⬜ **Create admin dashboard** (optional, for easier data viewing)

---

## 📝 Example: Viewing Data in Browser

1. Open browser
2. Go to: `https://api.arasllantas.com/api/contact`
3. You'll see JSON data (install JSON formatter extension for better view)
4. Copy the data and format it using: https://jsonformatter.org/

---

## 🆘 Troubleshooting

### "Cannot GET /api/contact"
- Backend might not be deployed
- Check backend URL is correct
- Verify routes are set up correctly

### Empty data arrays
- No customers have submitted forms yet
- Database might not be configured (check environment variables)
- Data might be in in-memory storage (will be lost on restart)

### Database connection errors
- Check environment variables in Vercel
- Verify database credentials are correct
- Ensure database is accessible from Vercel's servers
- Check if database requires IP whitelisting

---

**Need help?** Check your Vercel deployment logs for any errors.



