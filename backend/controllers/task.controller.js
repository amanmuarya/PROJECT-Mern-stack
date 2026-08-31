const taskService = require('../services/task.service');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addTask = async (req, res) => {
    try {
        const newTask = await taskService.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};






exports.updateTaskStatus = async (req, res) => {
    try {
        const updatedTask = await taskService.updateTask(req.params.id, req.body);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.removeTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};