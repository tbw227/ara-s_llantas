/**
 * Database Connection Module
 *
 * Provides a centralized database connection using Knex.js
 *
 * Features:
 * - Environment-based configuration (dev/test/prod)
 * - Automatic connection pooling
 * - Query builder with SQL injection protection
 * - Migration and seeding support
 *
 * Usage:
 * const db = require('./db/connection');
 * const users = await db('users').select('*');
 */

const knex = require('knex');
const config = require('../knexfile');

// Determine environment (development, test, or production)
const environment = process.env.NODE_ENV || 'development';

// Create database connection using environment-specific config
const db = knex(config[environment]);

// Export the database connection for use in routes
module.exports = db;
