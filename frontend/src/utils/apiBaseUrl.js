/**
 * Returns the correct API base URL depending on environment.
 * - In production: uses REACT_APP_API_URL (must be set in Vercel)
 * - In development: falls back to localhost
 * - Throws an error if not configured properly
 */
const getApiBaseUrl = () => {
  // ✅ Always prefer environment variable
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // ✅ Development fallback
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8001/api';
  }

  // ❌ No guessing in production — force error if not set
  throw new Error(
    '❌ REACT_APP_API_URL is not set! ' +
    'Please configure it in Vercel → Settings → Environment Variables.'
  );
};

export default getApiBaseUrl;

