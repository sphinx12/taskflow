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
client.collectDefaultMetrics({ register, prefix: 'taskflow_user_' });

const httpRequestDuration = new client.Histogram({
  name: 'taskflow_user_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds for User Service',
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

// In-memory data store for simplicity & speed in tests
let users = [];

// Helper for tests to reset state
app.resetDatabase = () => {
  users = [];
};

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'user-service' });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

// Create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User with this email already exists' });
  }

  const newUser = {
    id: String(users.length + 1),
    name,
    email,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  return res.status(201).json(newUser);
});

// List all users
app.get('/api/users', (req, res) => {
  return res.status(200).json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.status(200).json(user);
});

// Delete user by ID
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deleted = users.splice(index, 1)[0];
  return res.status(200).json(deleted);
});

module.exports = app;
