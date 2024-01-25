import express from "express";
import verifyToken from "../middleware/auth.js";
import { createSubtask, deleteSubtask, getSubtasksForTask, updateSubtask } from "../controllers/subtask.controller.js";
const router = express.Router();
router.post("/:taskid", verifyToken, createSubtask);
router.get("/:taskid", verifyToken, getSubtasksForTask);
router.put("/:subtaskId",verifyToken,updateSubtask)
router.delete("/:subtaskId",verifyToken,deleteSubtask)
export default router;
