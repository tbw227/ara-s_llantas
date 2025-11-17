/**
 * Vercel Serverless Function Entry Point
 * This file is used when deploying to Vercel
 */

const app = require('../server');

// Export a handler function so Vercel can invoke Express correctly
module.exports = (req, res) => {
  return app(req, res);
};
