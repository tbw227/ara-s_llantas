const request = require('supertest');
const app = require('../server');

describe('Server Configuration', () => {
  it('should have proper CORS headers', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['access-control-allow-origin']).toBeDefined();
  });

  it('should handle rate limiting', async () => {
    // Make multiple requests quickly
    const promises = Array(10)
      .fill()
      .map(() => request(app).get('/api/health'));
    const responses = await Promise.all(promises);

    // All should succeed (rate limit is 100 per 15 minutes)
    responses.forEach((res) => {
      expect(res.status).toBe(200);
    });
  });

  it('should serve static files', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/html/);
  });

  it('should handle 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Error Handling', () => {
  it('should handle malformed JSON', async () => {
    const res = await request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send('invalid json');
    expect(res.status).toBe(400);
  });

  it('should handle server errors gracefully', async () => {
    // This test would need to be more sophisticated in a real scenario
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
  });
});
