/**
 * Returns the API base URL from environment variable.
 * 
 * In production, REACT_APP_API_URL must be set in Vercel.
 * In development, falls back to '/api' proxy if not set.
 */
const getApiBaseUrl = () => {
  const url = process.env.REACT_APP_API_URL;

  if (!url) {
    // Development fallback: use proxy
    if (process.env.NODE_ENV === 'development') {
      return '/api';
    }
    // Production: fail fast if not configured
    throw new Error(
      'REACT_APP_API_URL is not set. ' +
      'Configure it in Vercel → Project Settings → Environment Variables.'
    );
  }

  // Remove trailing slashes
  return url.replace(/\/+$/, '');
};

export default getApiBaseUrl;
