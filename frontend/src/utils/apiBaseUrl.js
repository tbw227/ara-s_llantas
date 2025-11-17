/**
 * Returns the correct API base URL depending on environment.
 * - In production: uses REACT_APP_API_URL (must be set in Vercel)
 * - In development: uses '/api' which is proxied to backend via package.json proxy setting
 * - In production without env var: tries to auto-detect or shows warning
 */
const getApiBaseUrl = () => {
  // ✅ Always prefer environment variable
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // ✅ Development fallback
  if (process.env.NODE_ENV === 'development') {
    // Use proxy in development (package.json proxy setting)
    // This allows React dev server to proxy requests to backend
    return '/api';
  }

  // ⚠️ Production: Use hardcoded backend URL as fallback
  // This ensures the app works even if REACT_APP_API_URL is not set in Vercel
  const PRODUCTION_BACKEND_URL = 'https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api';
  
  // Try to auto-detect based on domain
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // If on custom domain, try to use api subdomain
    if (hostname === 'arasllantas.com' || hostname === 'www.arasllantas.com') {
      return 'https://api.arasllantas.com/api';
    }

    // If on Vercel domain, try to construct backend URL
    if (hostname.includes('vercel.app')) {
      const frontendProject = hostname.split('.')[0];
      // Try common backend naming patterns
      let backendProject = frontendProject
        .replace('-frontend', '-api')
        .replace('aras-llantas-frontend', 'aras-llantas-api');
      
      // If still matches frontend pattern, try alternative
      if (backendProject === frontendProject && frontendProject.includes('aras')) {
        backendProject = frontendProject.replace('aras', 'aras-llantas-node-backend');
      }
      
      return `https://${backendProject}.vercel.app/api`;
    }
  }

  // Production fallback: Use hardcoded backend URL
  // This is the actual deployed backend URL
  return PRODUCTION_BACKEND_URL;
};

export default getApiBaseUrl;

