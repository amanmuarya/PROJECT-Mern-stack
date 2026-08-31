const Task = require('../models/task.model');
exports.createTask = async (data) => await Task.create(data);
exports.getAllTasks = async () => await Task.find();
  


exports.updateTask = async (id, data) => await Task.findByIdAndUpdate(id, data, { new: true });
exports.deleteTask = async (id) => await Task.findByIdAndDelete(id);