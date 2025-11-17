/**
 * Returns the correct API base URL depending on environment.
 * Production-ready configuration:
 * - Custom domain (www.arasllantas.com) → api.arasllantas.com
 * - Vercel preview URLs → Vercel backend URL
 * - Development → localhost proxy
 */
const getApiBaseUrl = () => {
  // ✅ Always prefer environment variable (highest priority)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // ✅ Development: Use proxy
  if (process.env.NODE_ENV === 'development') {
    // Use proxy in development (package.json proxy setting)
    // This allows React dev server to proxy requests to backend
    return '/api';
  }

  // ✅ Production: Determine URL based on current domain
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // Production: Custom domain (www.arasllantas.com or arasllantas.com)
    // Use production API subdomain
    if (hostname === 'arasllantas.com' || hostname === 'www.arasllantas.com') {
      return 'https://api.arasllantas.com/api';
    }

    // Production: Vercel preview URLs
    // Use Vercel backend URL for preview deployments
    if (hostname.includes('vercel.app')) {
      return 'https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api';
    }
  }

  // Fallback: Use Vercel backend URL (should not be reached in normal operation)
  return 'https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api';
};

export default getApiBaseUrl;

