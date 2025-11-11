const request = require('supertest');
const app = require('../server');

describe('Contact endpoints', () => {
  it('POST /api/contact validates required fields', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: '', email: 'bad', message: '' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/contact accepts valid payload', async () => {
    const payload = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      message: 'Hello from test',
    };
    const res = await request(app).post('/api/contact').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
  });

  it('GET /api/contact returns messages', async () => {
    const res = await request(app).get('/api/contact');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
