const express = require('express');

const app = express();
app.use(express.json());

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

// Create task
app.post('/api/tasks', (req, res) => {
  const { title, description, userId } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: String(tasks.length + 1),
    title,
    description: description || '',
    status: 'TODO', // TODO, IN_PROGRESS, DONE
    userId: userId || null, // assigned user ID
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
