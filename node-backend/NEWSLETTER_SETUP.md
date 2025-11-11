# Newsletter Subscription Database Setup

## Overview
Newsletter subscriptions are now saved to a dedicated database table with proper validation and error handling.

## Database Migration

A new migration has been created to set up the `newsletter_subscribers` table:

**File:** `migrations/003_create_newsletter_subscribers.js`

### Table Structure
- `id` - Auto-incrementing primary key
- `email` - Subscriber email (unique, required)
- `status` - Subscription status: 'active' or 'unsubscribed' (default: 'active')
- `source` - Where subscription came from (default: 'website')
- `created_at` - Timestamp of subscription
- `updated_at` - Last update timestamp

### Indexes
- Index on `email` for fast lookups
- Index on `status` for filtering

## Running the Migration

To create the newsletter_subscribers table in your database:

```bash
cd node-backend
npm run db:migrate
```

This will run all pending migrations, including the new newsletter table.

## API Endpoints

### POST /api/newsletter/subscribe
Subscribe to newsletter

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for subscribing to our newsletter!",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

**Features:**
- Email validation
- Prevents duplicate subscriptions
- Automatically reactivates unsubscribed emails
- Graceful fallback to in-memory storage if database fails

### GET /api/newsletter/subscribers
Get all subscribers (admin endpoint)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

### POST /api/newsletter/unsubscribe
Unsubscribe from newsletter

**Request:**
```json
{
  "email": "user@example.com"
}
```

## Frontend Integration

The frontend has been updated to use the new newsletter endpoint:

- **File:** `frontend/src/services/api.js`
  - Added `subscribeNewsletter()` method

- **File:** `frontend/src/components/EmailSignup.jsx`
  - Updated to use `apiService.subscribeNewsletter()` instead of `submitContact()`

## Error Handling

The system includes:
- **Database fallback:** If database fails, uses in-memory storage
- **Duplicate prevention:** Won't create duplicate subscriptions
- **Email validation:** Validates email format before saving
- **Error logging:** All errors are logged to console

## Testing

After running the migration, test the endpoint:

```bash
curl -X POST http://localhost:8001/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Next Steps

1. Run the migration: `npm run db:migrate`
2. Restart the backend server
3. Test the newsletter subscription form
4. Verify data is being saved to the database

## Database Query Examples

View all subscribers:
```sql
SELECT * FROM newsletter_subscribers ORDER BY created_at DESC;
```

Count active subscribers:
```sql
SELECT COUNT(*) FROM newsletter_subscribers WHERE status = 'active';
```

Find subscriber by email:
```sql
SELECT * FROM newsletter_subscribers WHERE email = 'user@example.com';
```

