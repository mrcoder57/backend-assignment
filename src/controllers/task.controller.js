import mongoose from "mongoose";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";

const createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const userId = req.user.userId;

    const newTask = new Task({
      title,
      description,
      due_date,
      priority: 0,
      status: "TODO",
      user_id: userId,
      subtasks: [],
    });

    await newTask.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: newTask._id } },
      { new: true }
    );

    res
      .status(201)
      .json({
        message: "Task created successfully",
        task: newTask,
        _id: newTask._id,
      });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllTasksByUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tasks = await Task.find({ user_id: userId });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllTasksByPriorityForUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tasks = await Task.find({ user_id: userId }).sort({ priority: 1 });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getTasksWithPaginationForUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const page = req.params.pagenumber || 1;
    const limit = 10;

    const filter = { user_id: userId };

    const options = {
      limit,
      skip: (page - 1) * limit,
    };

    const tasks = await Task.find(filter, null, options);

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllTasksSortedByDueDate = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({ user_id: userId }).sort({ due_date: 1 });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateTask = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const taskId = req.params.taskId;
    const { due_date, status } = req.body;


    const task = await Task.findOne({ _id: taskId, user_id: userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or does not belong to the user' });
    }

    const updateObject = {};

    if (due_date !== undefined) {
      updateObject.due_date = new Date(due_date); 
    }

    if (status !== undefined) {
      updateObject.status = status;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updateObject,
      { new: true }
    );

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const deleteTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.taskId;

   
    const task = await Task.findOne({ _id: taskId, user_id: userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or does not belong to the user' });
    }

    const deletedTask = await Task.findByIdAndUpdate(
      taskId,
      { deleted_at: new Date() },
      { new: true }
    );

    res.status(200).json({ message: 'Task soft-deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error soft-deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  createTask,
  getAllTasksByUser,
  getAllTasksByPriorityForUser,
  getTasksWithPaginationForUser,
  getAllTasksSortedByDueDate,
  updateTask,
  deleteTask
};
