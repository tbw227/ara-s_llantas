const request = require('supertest');
const app = require('../server');

describe('Tires endpoints', () => {
  it('GET /api/tires returns list', async () => {
    const res = await request(app).get('/api/tires');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/tires?category=lawn filters correctly', async () => {
    const res = await request(app).get('/api/tires?category=lawn');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.every((t) => t.category === 'lawn')).toBe(true);
  });

  it('GET /api/tires/brands returns brands', async () => {
    const res = await request(app).get('/api/tires/brands');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
