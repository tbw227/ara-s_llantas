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
    const baseUrl = getApiBaseUrl();
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${cleanBaseUrl}${cleanEndpoint}`;

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
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Expected JSON but got:', contentType, text.substring(0, 200));
        }
        throw new Error(`Expected JSON response but got ${contentType}. The request URL was: ${url}`);
      }
      
      const data = await response.json();

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('API request failed:', error);
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
