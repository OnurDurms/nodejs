const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  deadline: {
    type: Number,
    required: false,
    default: Date.now(),
  },
  status: {
    type: Number,
    required: false,
    default: 1,
  },
  created_at: {
    type: Number,
    required: false,
    default: Date.now(),
  },
  updated_at: {
    type: Number,
    required: false,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task };