import mongoose from "mongoose";
import Subtask from "../models/subtask.model.js";
import Task from "../models/task.model.js";
const createSubtask = async (req, res) => {
  try {
    const task_id = req.params.taskid;
    const { status } = req.body;

    const newSubtask = new Subtask({
      task_id: task_id,
      status,
    });

    await newSubtask.save();

    await Task.findByIdAndUpdate(
      task_id,
      { $push: { subtasks: newSubtask._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Subtask created successfully",
      subtask: newSubtask,
    });
  } catch (error) {
    console.error("Error creating subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getSubtasksForTask = async (req, res) => {
  try {
    const task_id = req.params.taskid;
    // console.log(task_id)

    const subtasks = await Subtask.find({ task_id: task_id });

    res.status(200).json({ subtasks });
  } catch (error) {
    console.error("Error fetching subtasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateSubtask = async (req, res) => {
  try {
    const subtaskId = req.params.subtaskId;
    const { status } = req.body;

    const updateObject = {};

    if (status !== undefined) {
      updateObject.status = status;
    }

    const updatedSubtask = await Subtask.findByIdAndUpdate(
      subtaskId,
      updateObject,
      { new: true }
    );

    if (!updatedSubtask) {
      return res.status(404).json({ error: "Subtask not found" });
    }

    res
      .status(200)
      .json({
        message: "Subtask updated successfully",
        subtask: updatedSubtask,
      });
  } catch (error) {
    console.error("Error updating subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteSubtask = async (req, res) => {
  try {
    const subtaskId = req.params.subtaskId;

    const deletedSubtask = await Subtask.findByIdAndUpdate(
      subtaskId,
      { deleted_at: new Date() },
      { new: true }
    );

    if (!deletedSubtask) {
      return res.status(404).json({ error: "Subtask not found" });
    }

    res
      .status(200)
      .json({
        message: "Subtask soft-deleted successfully",
        subtask: deletedSubtask,
      });
  } catch (error) {
    console.error("Error soft-deleting subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createSubtask, getSubtasksForTask, updateSubtask, deleteSubtask };
