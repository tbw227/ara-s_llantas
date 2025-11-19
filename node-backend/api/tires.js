/**
 * Tire Catalog Routes
 *
 * Handles all tire-related API endpoints:
 * - GET /api/tires - List tires with optional filtering
 * - GET /api/tires/:id - Get specific tire details
 * - GET /api/tires/categories - Get available categories
 * - GET /api/tires/brands - Get available brands
 *
 * Features:
 * - Database integration with graceful fallback to mock data
 * - Advanced filtering (category, brand, size)
 * - Error handling and logging
 */

const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// ========================================
// MOCK DATA (FALLBACK)
// ========================================

/**
 * Mock tire data used as fallback when database is unavailable
 * This ensures the API continues to work even without MySQL
 */
const lawnTires = [
  {
    id: 'l1',
    brand: 'Carlisle',
    size: '15x6.00-6',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Known for turf-friendly treads and durability',
    category: 'lawn',
    stock: 15,
  },
  {
    id: 'l2',
    brand: 'Carlisle',
    size: '20x10.00-8',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Known for turf-friendly treads and durability',
    category: 'lawn',
    stock: 12,
  },
  {
    id: 'l3',
    brand: 'Carlisle',
    size: '18x9.50-8',
    price: 58.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Known for turf-friendly treads and durability',
    category: 'lawn',
    stock: 10,
  },
  {
    id: 'l4',
    brand: 'Kenda',
    size: '13x5.00-6',
    price: 38.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Affordable and widely available',
    category: 'lawn',
    stock: 20,
  },
  {
    id: 'l5',
    brand: 'Kenda',
    size: '16x6.50-8',
    price: 48.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Affordable and widely available',
    category: 'lawn',
    stock: 18,
  },
  {
    id: 'l6',
    brand: 'Kenda',
    size: '18x8.50-8',
    price: 55.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Affordable and widely available',
    category: 'lawn',
    stock: 14,
  },
  {
    id: 'l7',
    brand: 'MaxAuto',
    size: '15x6.00-6',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Popular on Amazon, good for replacements',
    category: 'lawn',
    stock: 16,
  },
  {
    id: 'l8',
    brand: 'MaxAuto',
    size: '20x10.00-8',
    price: 62.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Popular on Amazon, good for replacements',
    category: 'lawn',
    stock: 11,
  },
  {
    id: 'l9',
    brand: 'Deestone',
    size: '13x5.00-6',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Budget-friendly, decent for light-duty',
    category: 'lawn',
    stock: 22,
  },
  {
    id: 'l10',
    brand: 'Deestone',
    size: '18x9.50-8',
    price: 52.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Budget-friendly, decent for light-duty',
    category: 'lawn',
    stock: 13,
  },
  {
    id: 'l11',
    brand: 'Hi-Run',
    size: '16x6.50-8',
    price: 46.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'OEM replacement for many riding mowers',
    category: 'lawn',
    stock: 17,
  },
  {
    id: 'l12',
    brand: 'Hi-Run',
    size: '20x8.00-8',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'OEM replacement for many riding mowers',
    category: 'lawn',
    stock: 9,
  },
  {
    id: 'l13',
    brand: 'Wanda',
    size: '15x6.00-6',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Good grip and value for turf tires',
    category: 'lawn',
    stock: 19,
  },
  {
    id: 'l14',
    brand: 'Wanda',
    size: '18x9.50-8',
    price: 56.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Good grip and value for turf tires',
    category: 'lawn',
    stock: 15,
  },
];

const motorcycleTires = [
  {
    id: 'm1',
    brand: 'Michelin',
    size: '120/70ZR17',
    position: 'Front',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Pilot Road series - great all-rounder',
    category: 'motorcycle',
    stock: 8,
  },
  {
    id: 'm2',
    brand: 'Michelin',
    size: '180/55ZR17',
    position: 'Rear',
    price: 229.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Power series - great all-rounder',
    category: 'motorcycle',
    stock: 7,
  },
  {
    id: 'm3',
    brand: 'Pirelli',
    size: '110/70-17',
    position: 'Front',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Diablo Rosso - sporty and grippy',
    category: 'motorcycle',
    stock: 10,
  },
  {
    id: 'm4',
    brand: 'Pirelli',
    size: '160/60-17',
    position: 'Rear',
    price: 219.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Angel GT - sporty and grippy',
    category: 'motorcycle',
    stock: 9,
  },
  {
    id: 'm5',
    brand: 'Dunlop',
    size: '100/90-19',
    position: 'Front',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'OEM on many cruisers and sportbikes',
    category: 'motorcycle',
    stock: 12,
  },
  {
    id: 'm6',
    brand: 'Dunlop',
    size: '150/80-16',
    position: 'Rear',
    price: 185.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'OEM on many cruisers and sportbikes',
    category: 'motorcycle',
    stock: 11,
  },
  {
    id: 'm7',
    brand: 'Metzeler',
    size: '120/70ZR17',
    position: 'Front',
    price: 195.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Sportec series - touring and sport',
    category: 'motorcycle',
    stock: 6,
  },
  {
    id: 'm8',
    brand: 'Metzeler',
    size: '180/55ZR17',
    position: 'Rear',
    price: 239.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'ME series - touring and sport',
    category: 'motorcycle',
    stock: 5,
  },
  {
    id: 'm9',
    brand: 'Shinko',
    size: '130/90-16',
    position: 'Rear',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Budget-friendly, decent performance',
    category: 'motorcycle',
    stock: 15,
  },
  {
    id: 'm10',
    brand: 'Shinko',
    size: '170/80-15',
    position: 'Rear',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Budget-friendly, decent performance',
    category: 'motorcycle',
    stock: 13,
  },
  {
    id: 'm11',
    brand: 'Avon',
    size: '90/90-21',
    position: 'Front',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Great for cruisers and customs',
    category: 'motorcycle',
    stock: 14,
  },
  {
    id: 'm12',
    brand: 'Avon',
    size: '150/80-16',
    position: 'Rear',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Great for cruisers and customs',
    category: 'motorcycle',
    stock: 12,
  },
];

// Combine all tire data for fallback
const allTires = [...lawnTires, ...motorcycleTires];

// ========================================
// API ROUTES
// ========================================

/**
 * GET /api/tires
 *
 * Retrieve all tires with optional filtering
 *
 * Query Parameters:
 * - category: Filter by tire category (lawn, motorcycle)
 * - brand: Filter by tire brand
 * - size: Filter by tire size
 *
 * Response:
 * - success: boolean
 * - data: array of tire objects
 * - count: number of tires returned
 *
 * Fallback: Uses mock data if database is unavailable
 */
router.get('/tires', async (req, res) => {
  try {
    // Start with base query
    let query = db('tires');

    // Apply filters based on query parameters
    if (req.query.category) {
      query = query.where('category', req.query.category);
    }

    if (req.query.brand) {
      query = query.where('brand', req.query.brand);
    }

    if (req.query.size) {
      query = query.where('size', req.query.size);
    }

    // Execute query
    const tires = await query.select('*');

    res.json({
      success: true,
      data: tires,
      count: tires.length,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOGGING === 'true') {
      // eslint-disable-next-line no-console
      console.error('Database error:', error);
    }

    // Fallback to mock data if database fails
    let filteredTires = [...allTires];

    // Apply same filters to mock data
    if (req.query.category) {
      filteredTires = filteredTires.filter((tire) => tire.category === req.query.category);
    }
    if (req.query.brand) {
      filteredTires = filteredTires.filter((tire) => tire.brand === req.query.brand);
    }
    if (req.query.size) {
      filteredTires = filteredTires.filter((tire) => tire.size === req.query.size);
    }

    res.json({
      success: true,
      data: filteredTires,
      count: filteredTires.length,
    });
  }
});

/**
 * GET /api/tires/:id
 *
 * Retrieve a specific tire by ID
 *
 * Parameters:
 * - id: Tire ID (string)
 *
 * Response:
 * - success: boolean
 * - data: tire object or null
 *
 * Fallback: Uses mock data if database is unavailable
 */
router.get('/tires/:id', async (req, res) => {
  try {
    // Query database for specific tire
    const tire = await db('tires').where('id', req.params.id).first();

    if (!tire) {
      return res.status(404).json({
        success: false,
        error: 'Tire not found',
      });
    }

    res.json({
      success: true,
      data: tire,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOGGING === 'true') {
      // eslint-disable-next-line no-console
      console.error('Database error:', error);
    }

    // Fallback to mock data
    const tire = allTires.find((t) => t.id === req.params.id);

    if (!tire) {
      return res.status(404).json({
        success: false,
        error: 'Tire not found',
      });
    }

    res.json({
      success: true,
      data: tire,
    });
  }
});

/**
 * GET /api/tires/categories
 *
 * Retrieve all available tire categories
 *
 * Response:
 * - success: boolean
 * - data: array of category strings
 *
 * Fallback: Uses mock data if database is unavailable
 */
router.get('/tires/categories', async (req, res) => {
  try {
    // Query database for distinct categories
    const categories = await db('tires').distinct('category').pluck('category');

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOGGING === 'true') {
      // eslint-disable-next-line no-console
      console.error('Database error:', error);
    }

    // Fallback to mock data
    const categories = [...new Set(allTires.map((tire) => tire.category))];

    res.json({
      success: true,
      data: categories,
    });
  }
});

/**
 * GET /api/tires/brands
 *
 * Retrieve all available tire brands
 *
 * Response:
 * - success: boolean
 * - data: array of brand strings (sorted alphabetically)
 *
 * Fallback: Uses mock data if database is unavailable
 */
router.get('/tires/brands', async (req, res) => {
  try {
    // Query database for distinct brands
    const brands = await db('tires').distinct('brand').pluck('brand');
    const sortedBrands = brands.sort();

    res.json({
      success: true,
      data: sortedBrands,
    });
  } catch (error) {
    if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_LOGGING === 'true') {
      // eslint-disable-next-line no-console
      console.error('Database error:', error);
    }

    // Fallback to mock data
    const brands = [...new Set(allTires.map((tire) => tire.brand))].sort();

    res.json({
      success: true,
      data: brands,
    });
  }
});

module.exports = router;
