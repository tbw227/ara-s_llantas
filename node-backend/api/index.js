/**
 * Vercel Serverless Function Entry Point
 * This file exports the Express app as a serverless function handler
 */

const app = require('../server');

// Export the handler for Vercel
// Vercel expects a function that takes (req, res)
module.exports = (req, res) => {
  return app(req, res);
};

