const express = require('express');

const router = express.Router();

const {
    getTasks,
    addTask,
    updateTaskStatus,
    removeTask
} = require('../controllers/task.controller');

// GET all tasks
router.get('/tasks', getTasks);

// POST new task
router.post('/tasks', addTask);

// PUT update task status
router.put('/tasks/:id', updateTaskStatus);

// DELETE task
router.delete('/tasks/:id', removeTask);

module.exports = router; 