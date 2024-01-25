import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  status: { type: Number, enum: [0, 1], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date },
  deleted_at: { type: Date }
});

const Subtask = mongoose.model('Subtask', subtaskSchema);

export default Subtask
