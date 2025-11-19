/**
 * Ara's Llanta's Tire Shop - Express.js Backend Server
 *
 * This server provides API endpoints for:
 * - Tire catalog management (browse, filter, search)
 * - Contact form handling
 * - Health monitoring
 *
 * Features:
 * - Security middleware (Helmet, CORS, rate limiting)
 * - Database integration with graceful fallback
 * - Production-ready error handling
 * - Comprehensive logging
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 8000;

// Only log in development or when explicitly enabled
if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOGGING === 'true') {
  // eslint-disable-next-line no-console
  console.log("🚀 Starting Ara's Llanta's API Server...");
  // eslint-disable-next-line no-console
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  // eslint-disable-next-line no-console
  console.log(`🔌 Port: ${PORT}`);
}

// ========================================
// SECURITY MIDDLEWARE
// ========================================

// Helmet: Sets various HTTP headers for security
// Configure Helmet to be less restrictive for API routes
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false, // Allow cross-origin resources
  })
);

// Rate limiting: Prevents abuse by limiting requests per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS: Configure cross-origin resource sharing
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:3000', 'http://localhost:8000'];

    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// ========================================
// BODY PARSING MIDDLEWARE
// ========================================

// Parse JSON bodies (for API requests)
app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// ========================================
// ROUTES (Must come BEFORE static file serving)
// ========================================

// Import route modules
const tireRoutes = require('./routes/tires');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');

// Mount routes with /api prefix
app.use('/api', tireRoutes); // Tire catalog endpoints
app.use('/api', contactRoutes); // Contact form endpoints
app.use('/api', newsletterRoutes); // Newsletter subscription endpoints

// ========================================
// STATIC FILE SERVING (After API routes to avoid conflicts)
// ========================================

// Serve static files from the React frontend build directory
// Only serve static files for non-API routes
const frontendPath = path.join(__dirname, '../frontend/build');
if (require('fs').existsSync(frontendPath)) {
  app.use((req, res, next) => {
    // Skip static file serving for API routes
    if (req.path.startsWith('/api')) {
      return next();
    }
    express.static(frontendPath, { index: false })(req, res, next);
  });
}

// ========================================
// API ENDPOINTS
// ========================================

/**
 * Health Check Endpoint
 * GET /api/health
 *
 * Returns server status and basic information
 * Used for monitoring and load balancer health checks
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

/**
 * API Root Endpoint
 * GET /api
 *
 * Returns basic API information
 */
app.get('/api', (req, res) => {
  res.json({
    message: "Ara's Llanta's API",
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      tires: '/api/tires',
      contact: '/api/contact',
      newsletter: '/api/newsletter/subscribe',
    },
  });
});

/**
 * Root Endpoint
 * GET /
 *
 * Returns API information
 */
app.get('/', (req, res) => {
  res.json({
    message: "Ara's Llanta's API",
    version: '1.0.0',
    info: 'This is the backend API. Use /api endpoints.',
    endpoints: {
      health: '/api/health',
      tires: '/api/tires',
      contact: '/api/contact',
      newsletter: '/api/newsletter/subscribe',
    },
  });
});

// ========================================
// FRONTEND ROUTING
// ========================================

/**
 * Frontend Route Handler
 * Serves the React app for all non-API routes
 * This must come after API routes to avoid conflicts
 */
app.get('*', (req, res) => {
  const frontendPath = path.join(__dirname, '../frontend/build');
  const indexPath = path.join(frontendPath, 'index.html');
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: 'Frontend not found. Please deploy frontend separately.' });
  }
});

// ========================================
// ERROR HANDLING MIDDLEWARE
// ========================================

/**
 * 404 Handler
 * Catches all unmatched routes and returns 404 error
 */
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/**
 * Global Error Handler
 * Catches all unhandled errors and returns 500 error
 * Logs error details for debugging
 */
app.use((err, req, res, _next) => {
  // Log errors in development or when logging is enabled
  if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOGGING === 'true') {
    // eslint-disable-next-line no-console
    console.error('Global error:', err.message);
  }
  res.status(500).json({ error: 'Something went wrong!' });
});

// ========================================
// SERVER STARTUP
// ========================================

/**
 * Start server only if this file is run directly
 * This allows the app to be imported for testing
 */
if (require.main === module) {
  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOGGING === 'true') {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
      // eslint-disable-next-line no-console
      console.log(`Frontend: http://localhost:${PORT}`);
      // eslint-disable-next-line no-console
      console.log(`API: http://localhost:${PORT}/api`);
    }
  });
}

// Export app for testing and external use
module.exports = app;
