/**
 * Contact Form Routes
 *
 * Handles all contact-related API endpoints:
 * - POST /api/contact - Submit contact form
 * - GET /api/contact - Get all contact messages (admin)
 * - GET /api/contact/:id - Get specific contact message
 *
 * Features:
 * - Form validation and sanitization
 * - Database integration with graceful fallback
 * - Email validation
 * - Error handling and logging
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// ========================================
// IN-MEMORY STORAGE (FALLBACK)
// ========================================

/**
 * In-memory storage for contact messages
 * Used as fallback when database is unavailable
 * Data is lost on server restart
 */
let contactMessages = [];

// ========================================
// API ROUTES
// ========================================

/**
 * POST /api/contact
 *
 * Submit a contact form message
 *
 * Request Body:
 * - name: Customer name (required)
 * - email: Customer email (required, validated)
 * - phone: Customer phone (optional)
 * - message: Contact message (required)
 *
 * Response:
 * - success: boolean
 * - message: Success message
 * - data: Contact message ID and timestamp
 *
 * Validation:
 * - Name, email, and message are required
 * - Email format is validated
 * - All fields are trimmed and sanitized
 *
 * Fallback: Uses in-memory storage if database fails
 */
router.post('/contact', async (req, res) => {
  try {
    // Extract form data from request body
    const { name, email, phone, message } = req.body;

    // ========================================
    // VALIDATION
    // ========================================

    // Check required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required',
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

    // ========================================
    // CREATE CONTACT MESSAGE
    // ========================================

    // Create contact message object
    const contactMessage = {
      id: Date.now().toString(), // Simple ID generation
      name: name.trim(), // Trim whitespace
      email: email.trim().toLowerCase(), // Normalize email
      phone: phone ? phone.trim() : null, // Optional phone
      message: message.trim(), // Trim message
      status: 'new', // Default status
    };

    // ========================================
    // SAVE TO DATABASE
    // ========================================

    try {
      // Try to save to database first
      await db('contact_messages').insert(contactMessage);

      res.status(201).json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        data: {
          id: contactMessage.id,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);

      // Fallback to in-memory storage
      contactMessage.timestamp = new Date().toISOString();
      contactMessages.push(contactMessage);

      res.status(201).json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        data: {
          id: contactMessage.id,
          timestamp: contactMessage.timestamp,
        },
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form',
    });
  }
});

/**
 * GET /api/contact
 *
 * Retrieve all contact messages (admin endpoint)
 *
 * Response:
 * - success: boolean
 * - data: array of contact messages (sorted by date, newest first)
 * - count: number of messages
 *
 * Note: In production, add authentication/authorization
 * TODO: Add pagination, filtering, and sorting
 *
 * Fallback: Uses in-memory storage if database fails
 */
router.get('/contact', async (req, res) => {
  try {
    try {
      // Query database for all contact messages
      const messages = await db('contact_messages').select('*').orderBy('created_at', 'desc');

      res.json({
        success: true,
        data: messages,
        count: messages.length,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);

      // Fallback to in-memory storage
      const sortedMessages = contactMessages.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      res.json({
        success: true,
        data: sortedMessages,
        count: sortedMessages.length,
      });
    }
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact messages',
    });
  }
});

/**
 * GET /api/contact/:id
 *
 * Retrieve a specific contact message by ID
 *
 * Parameters:
 * - id: Contact message ID (string)
 *
 * Response:
 * - success: boolean
 * - data: contact message object or null
 *
 * Fallback: Uses in-memory storage if database fails
 */
router.get('/contact/:id', async (req, res) => {
  try {
    try {
      // Query database for specific contact message
      const message = await db('contact_messages').where('id', req.params.id).first();

      if (!message) {
        return res.status(404).json({
          success: false,
          error: 'Contact message not found',
        });
      }

      res.json({
        success: true,
        data: message,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);

      // Fallback to in-memory storage
      const message = contactMessages.find((m) => m.id === req.params.id);

      if (!message) {
        return res.status(404).json({
          success: false,
          error: 'Contact message not found',
        });
      }

      res.json({
        success: true,
        data: message,
      });
    }
  } catch (error) {
    console.error('Get contact message error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact message',
    });
  }
});

module.exports = router;
