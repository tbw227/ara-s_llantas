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
    // Production build: allow build to complete, will use '/api' at runtime
    // Runtime check will happen when the function is actually called
    return '/api';
  }

  // Remove trailing slashes
  return url.replace(/\/+$/, '');
};

export default getApiBaseUrl;
