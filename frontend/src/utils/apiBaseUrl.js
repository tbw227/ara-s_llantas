/**
 * Returns the correct API base URL depending on environment.
 * - In production: uses REACT_APP_API_URL (must be set in Vercel)
 * - In development: falls back to localhost
 * - In production without env var: tries to auto-detect or shows warning
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

  // ⚠️ Production: Try to auto-detect backend URL
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // If on custom domain, try to use api subdomain
    if (hostname === 'arasllantas.com' || hostname === 'www.arasllantas.com') {
      // Silent auto-detection in production, warn in development
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          '⚠️ REACT_APP_API_URL not set! Using auto-detected: https://api.arasllantas.com/api'
        );
      }
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
      
      // Silent auto-detection in production, warn in development
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          `⚠️ REACT_APP_API_URL not set! Using auto-detected: https://${backendProject}.vercel.app/api`
        );
      }
      return `https://${backendProject}.vercel.app/api`;
    }
  }

  // ❌ Last resort: Show error but don't crash
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error(
      '❌ REACT_APP_API_URL is not set and could not auto-detect backend URL! ' +
      'Please configure it in Vercel → Settings → Environment Variables.'
    );
  }
  
  // Fallback to a reasonable default (will likely fail, but won't crash the app)
  return 'http://localhost:8001/api';
};

export default getApiBaseUrl;

