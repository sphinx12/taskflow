const request = require('supertest');
const app = require('../src/app');

describe('Task Service API Tests', () => {
  beforeEach(() => {
    app.resetDatabase();
  });

  describe('GET /health', () => {
    it('should return status UP', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('UP');
      expect(res.body.service).toBe('task-service');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a task without userId (unassigned)', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Configure Jenkins', description: 'Setup CI/CD pipeline' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Configure Jenkins');
      expect(res.body.status).toBe('TODO');
      expect(res.body.userId).toBeNull();
    });

    it('should create a task assigned to a userId', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Write Tests', userId: '1' });

      expect(res.status).toBe(201);
      expect(res.body.userId).toBe('1');
    });

    it('should reject task creation without title', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ description: 'Missing title' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Title is required');
    });
  });

  describe('GET /api/tasks', () => {
    it('should list all tasks', async () => {
      await request(app).post('/api/tasks').send({ title: 'Task 1', userId: '1' });
      await request(app).post('/api/tasks').send({ title: 'Task 2', userId: '2' });

      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should filter tasks by userId', async () => {
      await request(app).post('/api/tasks').send({ title: 'Task 1', userId: '1' });
      await request(app).post('/api/tasks').send({ title: 'Task 2', userId: '2' });

      const res = await request(app).get('/api/tasks?userId=1');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Task 1');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return task by ID', async () => {
      const createRes = await request(app).post('/api/tasks').send({ title: 'Task Single' });
      const res = await request(app).get(`/api/tasks/${createRes.body.id}`);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Task Single');
    });

    it('should return 404 for unknown task ID', async () => {
      const res = await request(app).get('/api/tasks/999');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Task not found');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update task status and assign user', async () => {
      const createRes = await request(app).post('/api/tasks').send({ title: 'Task to Update' });
      const res = await request(app)
        .put(`/api/tasks/${createRes.body.id}`)
        .send({ status: 'DONE', userId: '5' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('DONE');
      expect(res.body.userId).toBe('5');
    });

    it('should reject invalid status', async () => {
      const createRes = await request(app).post('/api/tasks').send({ title: 'Task Invalid' });
      const res = await request(app)
        .put(`/api/tasks/${createRes.body.id}`)
        .send({ status: 'INVALID_STATUS' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Invalid status');
    });

    it('should return 404 when updating nonexistent task', async () => {
      const res = await request(app).put('/api/tasks/999').send({ title: 'Ghost' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete existing task', async () => {
      const createRes = await request(app).post('/api/tasks').send({ title: 'Task to Delete' });
      const delRes = await request(app).delete(`/api/tasks/${createRes.body.id}`);

      expect(delRes.status).toBe(200);
      expect(delRes.body.message).toBe('Task deleted successfully');

      const getRes = await request(app).get(`/api/tasks/${createRes.body.id}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 when deleting nonexistent task', async () => {
      const res = await request(app).delete('/api/tasks/999');
      expect(res.status).toBe(404);
    });
  });
});
