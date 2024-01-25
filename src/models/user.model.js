import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    phone_number: { type: Number, required: true },
    priority: { type: Number, enum: [0, 1, 2], required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  });
const User = mongoose.model("User", userSchema);

export default User
