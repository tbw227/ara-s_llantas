const request = require('supertest');
const app = require('../server');

describe('Integration Tests', () => {
  describe('Complete Tire Shopping Flow', () => {
    it('should handle complete tire browsing and filtering', async () => {
      // Get all tires
      const allTiresRes = await request(app).get('/api/tires');
      expect(allTiresRes.status).toBe(200);
      expect(allTiresRes.body.success).toBe(true);
      expect(Array.isArray(allTiresRes.body.data)).toBe(true);

      // Filter by category
      const categoryRes = await request(app).get('/api/tires?category=car');
      expect(categoryRes.status).toBe(200);
      expect(categoryRes.body.success).toBe(true);

      // Get brands
      const brandsRes = await request(app).get('/api/tires/brands');
      expect(brandsRes.status).toBe(200);
      expect(brandsRes.body.success).toBe(true);
      expect(Array.isArray(brandsRes.body.data)).toBe(true);

      // Get categories
      const categoriesRes = await request(app).get('/api/tires/categories');
      expect(categoriesRes.status).toBe(200);
      expect(categoriesRes.body.success).toBe(true);
      expect(Array.isArray(categoriesRes.body.data)).toBe(true);
    });

    it('should handle contact form submission and retrieval', async () => {
      // Submit contact form
      const contactData = {
        name: 'Integration Test User',
        email: 'integration@test.com',
        phone: '555-123-4567',
        message: 'This is an integration test message'
      };

      const submitRes = await request(app)
        .post('/api/contact')
        .send(contactData);
      
      expect(submitRes.status).toBe(201);
      expect(submitRes.body.success).toBe(true);
      expect(submitRes.body.data).toHaveProperty('id');

      // Retrieve contact messages
      const getRes = await request(app).get('/api/contact');
      expect(getRes.status).toBe(200);
      expect(getRes.body.success).toBe(true);
      expect(Array.isArray(getRes.body.data)).toBe(true);
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle invalid tire filters gracefully', async () => {
      const res = await request(app).get('/api/tires?category=nonexistent');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
    });

    it('should handle malformed contact data', async () => {
      const invalidData = {
        name: '', // Empty name
        email: 'invalid-email', // Invalid email
        message: '' // Empty message
      };

      const res = await request(app)
        .post('/api/contact')
        .send(invalidData);
      
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Performance Tests', () => {
    it('should respond to health check within acceptable time', async () => {
      const startTime = Date.now();
      const res = await request(app).get('/api/health');
      const responseTime = Date.now() - startTime;

      expect(res.status).toBe(200);
      expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
    });

    it('should handle concurrent requests', async () => {
      const promises = Array(20).fill().map(() => 
        request(app).get('/api/tires')
      );
      
      const responses = await Promise.all(promises);
      
      responses.forEach(res => {
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
      });
    });
  });
});








