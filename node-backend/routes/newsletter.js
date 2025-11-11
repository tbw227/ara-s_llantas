/**
 * Newsletter Routes
 *
 * Handles newsletter subscription API endpoints:
 * - POST /api/newsletter/subscribe - Subscribe to newsletter
 * - GET /api/newsletter/subscribers - Get all subscribers (admin)
 * - POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
 *
 * Features:
 * - Email validation and sanitization
 * - Database integration with graceful fallback
 * - Duplicate email prevention
 * - Error handling and logging
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// ========================================
// IN-MEMORY STORAGE (FALLBACK)
// ========================================

/**
 * In-memory storage for newsletter subscribers
 * Used as fallback when database is unavailable
 * Data is lost on server restart
 */
let newsletterSubscribers = [];

// ========================================
// API ROUTES
// ========================================

/**
 * POST /api/newsletter/subscribe
 *
 * Subscribe to newsletter
 *
 * Request Body:
 * - email: Subscriber email (required, validated)
 *
 * Response:
 * - success: boolean
 * - message: Success message
 * - data: Subscriber ID and timestamp
 *
 * Validation:
 * - Email is required and validated
 * - Email is normalized (lowercase, trimmed)
 * - Prevents duplicate subscriptions
 *
 * Fallback: Uses in-memory storage if database fails
 */
router.post('/newsletter/subscribe', async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // ========================================
    // VALIDATION
    // ========================================

    // Check required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address',
      });
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // ========================================
    // SAVE TO DATABASE
    // ========================================

    try {
      // Check if email already exists
      const existingSubscriber = await db('newsletter_subscribers')
        .where('email', normalizedEmail)
        .first();

      if (existingSubscriber) {
        // If already subscribed and active, return success
        if (existingSubscriber.status === 'active') {
          return res.status(200).json({
            success: true,
            message: 'You are already subscribed to our newsletter!',
            data: {
              id: existingSubscriber.id,
              email: existingSubscriber.email,
              timestamp: existingSubscriber.created_at,
            },
          });
        } else {
          // If unsubscribed, reactivate
          await db('newsletter_subscribers')
            .where('email', normalizedEmail)
            .update({
              status: 'active',
              updated_at: new Date(),
            });

          return res.status(200).json({
            success: true,
            message: 'Welcome back! You have been resubscribed to our newsletter.',
            data: {
              id: existingSubscriber.id,
              email: normalizedEmail,
              timestamp: new Date().toISOString(),
            },
          });
        }
      }

      // Create new subscriber
      const subscriber = {
        email: normalizedEmail,
        status: 'active',
        source: 'website',
      };

      // Insert new subscriber
      const [subscriberId] = await db('newsletter_subscribers').insert(subscriber);

      res.status(201).json({
        success: true,
        message: 'Thank you for subscribing to our newsletter!',
        data: {
          id: subscriberId,
          email: normalizedEmail,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);

      // Check for duplicate in fallback storage
      const existingInMemory = newsletterSubscribers.find(
        (s) => s.email === normalizedEmail
      );

      if (existingInMemory) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
          data: {
            id: existingInMemory.id,
            email: normalizedEmail,
            timestamp: existingInMemory.timestamp,
          },
        });
      }

      // Fallback to in-memory storage
      const subscriber = {
        id: Date.now().toString(),
        email: normalizedEmail,
        status: 'active',
        source: 'website',
        timestamp: new Date().toISOString(),
      };

      newsletterSubscribers.push(subscriber);

      res.status(201).json({
        success: true,
        message: 'Thank you for subscribing to our newsletter!',
        data: {
          id: subscriber.id,
          email: normalizedEmail,
          timestamp: subscriber.timestamp,
        },
      });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to subscribe to newsletter',
    });
  }
});

/**
 * GET /api/newsletter/subscribers
 *
 * Retrieve all newsletter subscribers (admin endpoint)
 *
 * Response:
 * - success: boolean
 * - data: array of subscribers (sorted by date, newest first)
 * - count: number of subscribers
 *
 * Note: In production, add authentication/authorization
 * TODO: Add pagination, filtering, and sorting
 *
 * Fallback: Uses in-memory storage if database fails
 */
router.get('/newsletter/subscribers', async (req, res) => {
  try {
    try {
      // Query database for all subscribers
      const subscribers = await db('newsletter_subscribers')
        .select('*')
        .orderBy('created_at', 'desc');

      res.json({
        success: true,
        data: subscribers,
        count: subscribers.length,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);

      // Fallback to in-memory storage
      const sortedSubscribers = newsletterSubscribers.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      res.json({
        success: true,
        data: sortedSubscribers,
        count: sortedSubscribers.length,
      });
    }
  } catch (error) {
    console.error('Get newsletter subscribers error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch newsletter subscribers',
    });
  }
});

/**
 * POST /api/newsletter/unsubscribe
 *
 * Unsubscribe from newsletter
 *
 * Request Body:
 * - email: Subscriber email (required)
 *
 * Response:
 * - success: boolean
 * - message: Success message
 */
router.post('/newsletter/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
      // Update subscriber status
      const updated = await db('newsletter_subscribers')
        .where('email', normalizedEmail)
        .update({
          status: 'unsubscribed',
          updated_at: new Date(),
        });

      if (updated === 0) {
        return res.status(404).json({
          success: false,
          error: 'Email not found in our newsletter list',
        });
      }

      res.json({
        success: true,
        message: 'You have been unsubscribed from our newsletter.',
      });
    } catch (dbError) {
      console.error('Database error:', dbError);

      // Fallback to in-memory storage
      const subscriber = newsletterSubscribers.find(
        (s) => s.email === normalizedEmail
      );

      if (!subscriber) {
        return res.status(404).json({
          success: false,
          error: 'Email not found in our newsletter list',
        });
      }

      subscriber.status = 'unsubscribed';
      subscriber.updated_at = new Date().toISOString();

      res.json({
        success: true,
        message: 'You have been unsubscribed from our newsletter.',
      });
    }
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to unsubscribe from newsletter',
    });
  }
});

module.exports = router;

