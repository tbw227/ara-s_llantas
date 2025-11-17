/**
 * Returns the correct API base URL depending on environment.
 * Production-ready configuration:
 * - Custom domain (www.arasllantas.com) → api.arasllantas.com
 * - Vercel preview URLs → Vercel backend URL (separate deployment)
 * - Development → localhost proxy
 */
const getApiBaseUrl = () => {
  // ✅ Always prefer environment variable (highest priority)
  if (process.env.REACT_APP_API_URL) {
    // Validate the environment variable URL
    const envUrl = process.env.REACT_APP_API_URL.trim();
    
    // Ensure it's a valid URL format
    if (!envUrl.startsWith('http://') && !envUrl.startsWith('https://') && !envUrl.startsWith('/')) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('⚠️ REACT_APP_API_URL does not look like a valid URL:', envUrl);
      }
    }
    
    // Remove trailing slash if present
    return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
  }

  // ✅ Development: Use proxy
  if (process.env.NODE_ENV === 'development') {
    // Use proxy in development (package.json proxy setting)
    // This allows React dev server to proxy requests to backend
    return '/api';
  }

  // ✅ Production: Always use the backend URL (separate deployment)
  // The backend is deployed separately, so we always use the full backend URL
  // IMPORTANT: This is the actual backend deployment URL, NOT the frontend URL
  // Frontend: aras-llantas.vercel.app (or www.arasllantas.com)
  // Backend: ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app
  const PRODUCTION_BACKEND_URL = 'https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api';
  
  // Must check window first to avoid SSR issues
  if (typeof window === 'undefined') {
    // Server-side rendering fallback - use backend URL
    return PRODUCTION_BACKEND_URL;
  }

  const hostname = window.location.hostname;

  // Production: Custom domain (www.arasllantas.com or arasllantas.com)
  // Use backend URL directly (api subdomain may not be configured)
  // The backend is deployed separately on Vercel
  if (hostname === 'arasllantas.com' || hostname === 'www.arasllantas.com') {
    // Use the Vercel backend URL directly
    // If you want to use api.arasllantas.com, configure it in Vercel first
    return PRODUCTION_BACKEND_URL;
  }

  // Production: ALL Vercel preview URLs use the backend URL
  // This is critical - frontend and backend are separate deployments
  // The frontend might be at: aras-llantas.vercel.app
  // But the backend is at: ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app
  // NEVER use the frontend domain as the API base URL!
  if (hostname.includes('vercel.app')) {
    // Always use the backend URL for all Vercel deployments
    return PRODUCTION_BACKEND_URL;
  }

  // Fallback: Always use backend URL (separate deployment)
  return PRODUCTION_BACKEND_URL;
};

export default getApiBaseUrl;

