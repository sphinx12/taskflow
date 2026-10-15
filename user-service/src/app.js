const express = require('express');

const app = express();
app.use(express.json());

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

module.exports = app;
