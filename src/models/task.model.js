import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  priority: { type: Number, enum: [0, 1, 2], required: true },
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "DONE"],
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtask" }],
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

