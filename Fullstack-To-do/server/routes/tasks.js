const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a new task
router.post('/', async (req, res) => {
  const { task } = req.body;
  const newTask = new Task({ title: task });
  await newTask.save();
  res.status(201).json(newTask);
});

// Delete task by ID
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Delete all tasks
router.delete('/', async (req, res) => {
  await Task.deleteMany({});
  res.json({ message: 'All tasks deleted' });
});

module.exports = router;