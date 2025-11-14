# Ara's Llanta's - Monorepo

This repo contains a Node.js Express backend and a React (CRA) frontend.

## 🚀 Quick Start

**New to this project?** Start with the **[Complete Setup Guide](SETUP_GUIDE.md)** for step-by-step instructions.

## Prerequisites
- Node.js 18+
- MySQL (local or hosted) - optional for now (graceful fallback to in-memory storage)

## Backend (Node.js + Express)

1. Create an environment file `node-backend/.env` with:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=aras_llantas
PORT=8000
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000
JWT_SECRET=your_jwt_secret_here
```
2. Install dependencies:
```bash
cd node-backend
npm install
```
3. Run the server (default: http://localhost:8000):
```bash
# Development with auto-restart
npm run dev

# Or production
npm start
```
4. API endpoints:
- Health: http://localhost:8000/api/health
- Tires: http://localhost:8000/api/tires
- Contact: http://localhost:8000/api/contact

### Testing & Quality
From `node-backend/`:
```bash
# Run unit/integration tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Lint and fix
npm run lint
npm run lint:fix

# Format with Prettier
npm run format
```

### Database (Knex + MySQL)
The backend gracefully falls back to in-memory storage if MySQL is unavailable.

**Setup MySQL:**
1. Install MySQL locally or use a hosted service
2. Create database: `CREATE DATABASE aras_llantas;`
3. Update `node-backend/.env` with your MySQL credentials
4. Run migrations and seeds:

```bash
# Apply migrations (creates tables)
npm run db:migrate

# Seed with tire data
npm run db:seed

# Rollback last migration if needed
npm run db:rollback
```

**Database Schema:**
- `tires` table: id, brand, size, price, image, description, category, stock, position, timestamps
- `contact_messages` table: id, name, email, phone, message, status, timestamps

## Frontend (React)

1. Install deps:
```bash
cd frontend
npm install
```
2. Start dev server (http://localhost:3000):
```bash
npm start
```

## API Documentation

### Tires
- `GET /api/tires` - Get all tires (supports ?category=lawn&brand=Carlisle filters)
- `GET /api/tires/:id` - Get specific tire
- `GET /api/tires/categories` - Get available categories
- `GET /api/tires/brands` - Get available brands

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `GET /api/contact/:id` - Get specific message

## Production Deployment (Hostinger VPS)

### Prerequisites
- Hostinger VPS with Ubuntu 20.04+
- Domain name pointed to your VPS IP
- SSH access to your VPS

### Quick Deployment
1. **Upload files to VPS:**
   ```bash
   # Upload your project files to /var/www/aras-llantas/
   scp -r . user@your-vps-ip:/var/www/aras-llantas/
   ```

2. **Run deployment script:**
   ```bash
   ssh user@your-vps-ip
   cd /var/www/aras-llantas
   chmod +x deploy.sh
   sudo ./deploy.sh
   ```

3. **Configure environment:**
   ```bash
   # Update production settings
   sudo nano /var/www/aras-llantas/node-backend/.env
   sudo nano /var/www/aras-llantas/frontend/.env.production
   ```

4. **Set up SSL (Let's Encrypt):**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

### Manual Setup (Alternative)
If you prefer manual setup, see the deployment files:
- `deploy.sh` - Automated deployment script
- `nginx/aras-llantas.conf` - Nginx configuration
- `node-backend/ecosystem.config.js` - PM2 configuration
- `node-backend/env.production.example` - Production environment template

### Management Commands
```bash
# PM2 management
pm2 status
pm2 logs
pm2 restart all
pm2 stop all

# Database management
cd /var/www/aras-llantas/node-backend
npm run db:migrate
npm run db:seed

# Nginx management
sudo systemctl restart nginx
sudo nginx -t
```

## Features

### Multi-language Support
- **English and Spanish** - Full bilingual support throughout the application
- Language toggle in header - Switch between English (EN) and Spanish (ES)
- All content translated including:
  - Navigation menus
  - Service descriptions
  - Form labels and messages
  - Testimonials
  - Footer content

### Form Submissions
- **Newsletter Signup** - Email subscription with thank you confirmation
- **Contact Form** - Exit intent modal with thank you confirmation
- Both forms include:
  - Real-time validation
  - Success/error messages
  - Visual thank you confirmations
  - Console logging for debugging

### Image Optimization
- Responsive image loading with `object-cover` and `object-contain`
- Lazy loading for below-the-fold images
- Optimized image containers with proper aspect ratios

## Notes
- Backend gracefully falls back to in-memory storage if MySQL is unavailable
- All routes work with or without database connection
- CORS configured for localhost:3000 by default
- Industry-standard testing with Jest + Supertest
- Production-ready with Knex migrations and proper error handling
- Full bilingual support (English/Spanish) with language context
