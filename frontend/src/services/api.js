/**
 * API Service
 * 
 * Centralized service for making HTTP requests to the backend API
 * 
 * Features:
 * - Automatic error handling
 * - Consistent request/response format
 * - Environment-based API URL configuration
 * - Request/response logging
 * 
 * Usage:
 * import apiService from './services/api';
 * const tires = await apiService.getTires();
 */

import getApiBaseUrl from '../utils/apiBaseUrl';

// Get API base URL - lazy evaluation to support runtime auto-detection
// This allows window.location to be available when auto-detecting
let API_BASE_URL = null;

const getApiBaseUrlLazy = () => {
  if (API_BASE_URL === null) {
    try {
      API_BASE_URL = getApiBaseUrl();
      
      // Validate the URL was returned
      if (!API_BASE_URL || typeof API_BASE_URL !== 'string') {
        throw new Error(`Invalid API base URL returned: ${API_BASE_URL}`);
      }
      
      // Log in development for debugging
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('🔧 API Base URL determined:', API_BASE_URL);
      }
      
      // In production, always log the API base URL for debugging
      if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
        const currentHost = window.location.hostname;
        // eslint-disable-next-line no-console
        console.log('🔧 Production API Base URL:', API_BASE_URL);
        // eslint-disable-next-line no-console
        console.log('🔧 Current hostname:', currentHost);
        
        // Warn if API URL is using the frontend domain (this would be wrong)
        if (API_BASE_URL.includes(currentHost) && !API_BASE_URL.includes('api.arasllantas.com')) {
          // eslint-disable-next-line no-console
          console.error('❌ ERROR: API Base URL is using frontend domain!', API_BASE_URL);
          // eslint-disable-next-line no-console
          console.error('   This will cause HTML responses instead of JSON!');
          // eslint-disable-next-line no-console
          console.error('   Fix: Delete or correct REACT_APP_API_URL in Vercel environment variables');
        }
      }
    } catch (error) {
      // If getApiBaseUrl throws, use fallback
      // In development, use proxy; in production, use production API domain
      API_BASE_URL = process.env.NODE_ENV === 'development' 
        ? '/api' 
        : 'https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api';
      
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Failed to get API base URL, using fallback:', error);
        // eslint-disable-next-line no-console
        console.log('🔧 Using fallback API Base URL:', API_BASE_URL);
      }
    }
  }
  return API_BASE_URL;
};

/**
 * API Service Class
 * 
 * Provides methods for all backend API interactions
 */
class ApiService {
  /**
   * Generic HTTP request method
   * 
   * @param {string} endpoint - API endpoint (e.g., '/tires')
   * @param {object} options - Fetch options (method, body, headers, etc.)
   * @returns {Promise<object>} API response data
   * @throws {Error} If request fails
   */
  async request(endpoint, options = {}) {
    // Get API base URL (lazy evaluation for runtime auto-detection)
    const baseUrl = getApiBaseUrlLazy();
    
    // Validate base URL
    if (!baseUrl) {
      const error = new Error('API base URL is not configured. Please check your environment variables.');
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ API base URL is undefined!', error);
      }
      throw error;
    }
    
    // Ensure baseUrl doesn't end with slash and endpoint starts with slash
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Construct full URL
    const url = `${cleanBaseUrl}${cleanEndpoint}`;

    // Validate URL format
    try {
      new URL(url); // This will throw if URL is invalid
    } catch (urlError) {
      const error = new Error(`Invalid API URL constructed: ${url}. Base URL: ${baseUrl}, Endpoint: ${endpoint}`);
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('❌ Invalid URL constructed!', {
          baseUrl,
          endpoint,
          constructedUrl: url,
          error: urlError.message,
        });
      }
      throw error;
    }

    // Log API URL in development for debugging only
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`🌐 API Request: ${url}`);
      // eslint-disable-next-line no-console
      console.log(`   Base URL: ${baseUrl}`);
      // eslint-disable-next-line no-console
      console.log(`   Endpoint: ${endpoint}`);
    }
    
    // In production, always log the URL being used (critical for debugging)
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      const currentHost = window.location.hostname;
      // eslint-disable-next-line no-console
      console.log(`🌐 Production API Request: ${url}`);
      // eslint-disable-next-line no-console
      console.log(`   Base URL: ${baseUrl}`);
      // eslint-disable-next-line no-console
      console.log(`   Endpoint: ${endpoint}`);
      // eslint-disable-next-line no-console
      console.log(`   Current hostname: ${currentHost}`);
      
      // Error if URL looks suspicious (using frontend domain)
      if (url.includes(currentHost) && !url.includes('api.arasllantas.com') && !url.includes('ara-s-llantas-node-backend')) {
        // eslint-disable-next-line no-console
        console.error('❌ CRITICAL ERROR: API request is using frontend domain!', {
          url,
          currentHost,
          baseUrl,
          endpoint,
          message: 'This will return HTML instead of JSON. Check REACT_APP_API_URL environment variable in Vercel.',
        });
      }
    }

    // Default configuration with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: options.signal || controller.signal, // Use provided signal or create new one
      ...options,
    };

    try {
      // Make HTTP request
      const response = await fetch(url, config);
      clearTimeout(timeoutId);
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        
        // Always log this error - it's critical for debugging
        // eslint-disable-next-line no-console
        console.error('❌ API Error: Expected JSON but got HTML!', {
          url,
          contentType,
          status: response.status,
          statusText: response.statusText,
          responsePreview: text.substring(0, 300),
          baseUrl,
          endpoint,
          message: 'This means the request is hitting the frontend instead of the backend. Check the API base URL.',
        });
        
        throw new Error(
          `Expected JSON response but got ${contentType}. ` +
          `The request URL was: ${url}. ` +
          `This usually means the request is hitting the frontend domain instead of the backend. ` +
          `Check REACT_APP_API_URL environment variable in Vercel. ` +
          `It should be: https://ara-s-llantas-node-backend-gwzpzdj8s-tbw227s-projects.vercel.app/api`
        );
      }
      
      const data = await response.json();

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Provide more detailed error information
      if (error.name === 'AbortError') {
        const timeoutError = new Error(`Request timeout - the API request to ${endpoint} took too long. Please check your connection and try again.`);
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('API request timeout:', endpoint, 'URL:', url);
        }
        throw timeoutError;
      }
      
      // Network errors (CORS, connection refused, etc.)
      if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
        const networkError = new Error(
          `Cannot connect to API at ${url}. ` +
          `Please check that the backend is running and accessible. ` +
          `If this is production, verify the API URL is correct.`
        );
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('API connection failed:', {
            url,
            endpoint,
            baseUrl,
            error: error.message,
          });
        }
        throw networkError;
      }
      
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('API request failed:', {
          url,
          endpoint,
          baseUrl,
          error: error.message,
          stack: error.stack,
        });
      }
      throw error;
    }
  }

  // ========================================
  // TIRE ENDPOINTS
  // ========================================

  /**
   * Get all tires with optional filtering
   * 
   * @param {object} filters - Filter options
   * @param {string} filters.category - Filter by category (lawn, motorcycle)
   * @param {string} filters.brand - Filter by brand
   * @param {string} filters.size - Filter by size
   * @returns {Promise<object>} API response with tires data
   */
  async getTires(filters = {}) {
    // Build query parameters
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.brand) params.append('brand', filters.brand);
    if (filters.size) params.append('size', filters.size);

    // Construct endpoint with query string
    const queryString = params.toString();
    const endpoint = queryString ? `/tires?${queryString}` : '/tires';

    return this.request(endpoint);
  }

  // ========================================
  // CONTACT ENDPOINTS
  // ========================================

  /**
   * Submit a contact form message
   * 
   * @param {object} contactData - Contact form data
   * @param {string} contactData.name - Customer name
   * @param {string} contactData.email - Customer email
   * @param {string} contactData.phone - Customer phone (optional)
   * @param {string} contactData.message - Contact message
   * @returns {Promise<object>} API response with submission result
   */
  async submitContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // ========================================
  // NEWSLETTER ENDPOINTS
  // ========================================

  /**
   * Subscribe to newsletter
   * 
   * @param {object} subscriberData - Newsletter subscription data
   * @param {string} subscriberData.email - Subscriber email (required)
   * @returns {Promise<object>} API response with subscription result
   */
  async subscribeNewsletter(subscriberData) {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscriberData),
    });
  }
}

const apiService = new ApiService();

export default apiService;
