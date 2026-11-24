const express = require('express');
const client = require('prom-client');

const app = express();
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Prometheus Registry & Metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: 'taskflow_task_' });

const httpRequestDuration = new client.Histogram({
  name: 'taskflow_task_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds for Task Service',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5],
  registers: [register],
});

app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route ? req.route.path : req.path, status_code: res.statusCode });
  });
  next();
});

// In-memory data store for tasks
let tasks = [];

// Helper for tests to reset state
app.resetDatabase = () => {
  tasks = [];
};

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'task-service' });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Create task
app.post('/api/tasks', (req, res) => {
  const { title, description, status, userId } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const validStatuses = ['TODO', 'IN_PROGRESS', 'DONE'];
  const taskStatus = (status && validStatuses.includes(status)) ? status : 'TODO';

  const newTask = {
    id: String(tasks.length + 1),
    title,
    description: description || '',
    status: taskStatus,
    userId: userId || null,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// List tasks (optionally filter by userId or status via query params)
app.get('/api/tasks', (req, res) => {
  const { userId, status } = req.query;
  let results = [...tasks];

  if (userId) {
    results = results.filter(t => t.userId === userId);
  }
  if (status) {
    results = results.filter(t => t.status === status);
  }

  return res.status(200).json(results);
});

// Get task by ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  return res.status(200).json(task);
});

// Update task (title, description, status, userId)
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, status, userId } = req.body;

  if (status && !['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Must be TODO, IN_PROGRESS, or DONE' });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (userId !== undefined) task.userId = userId;

  return res.status(200).json(task);
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(index, 1)[0];
  return res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
});

module.exports = app;
