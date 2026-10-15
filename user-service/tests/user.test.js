const request = require('supertest');
const app = require('../src/app');

describe('User Service API Tests', () => {
  beforeEach(() => {
    app.resetDatabase();
  });

  describe('GET /health', () => {
    it('should return status UP', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('UP');
      expect(res.body.service).toBe('user-service');
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user successfully', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Alice Dupont', email: 'alice@example.com' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Alice Dupont');
      expect(res.body.email).toBe('alice@example.com');
    });

    it('should reject request without name or email', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Alice Dupont' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Name and email are required');
    });

    it('should reject duplicate email registration', async () => {
      await request(app)
        .post('/api/users')
        .send({ name: 'Alice Dupont', email: 'alice@example.com' });

      const res = await request(app)
        .post('/api/users')
        .send({ name: 'Alice 2', email: 'alice@example.com' });

      expect(res.status).toBe(409);
      expect(res.body.error).toBe('User with this email already exists');
    });
  });

  describe('GET /api/users', () => {
    it('should list all users', async () => {
      await request(app)
        .post('/api/users')
        .send({ name: 'User 1', email: 'user1@example.com' });
      await request(app)
        .post('/api/users')
        .send({ name: 'User 2', email: 'user2@example.com' });

      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user if found', async () => {
      const createRes = await request(app)
        .post('/api/users')
        .send({ name: 'Bob Martin', email: 'bob@example.com' });

      const res = await request(app).get(`/api/users/${createRes.body.id}`);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Bob Martin');
    });

    it('should return 404 for nonexistent user', async () => {
      const res = await request(app).get('/api/users/999');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('User not found');
    });
  });
});
