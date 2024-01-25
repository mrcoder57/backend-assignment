import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasksByPriorityForUser,
  getAllTasksByUser,
  updateTask,
} from "../controllers/task.controller.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();

/**
 * @swagger
 * /task/:
 *   post:
 *     summary: Create a new task
 *     security:
 *       - authorisation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post("/", verifyToken, createTask);

/**
 * @swagger
 * /task/:
 *   get:
 *     summary: Get all tasks by user
 *     security:
 *       - authorisation: []
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/", verifyToken, getAllTasksByUser);

/**
 * @swagger
 * /task/priority:
 *   get:
 *     summary: Get all tasks by priority
 *     security:
 *       - authorisation: []
 *     responses:
 *       200:
 *         description: A list of tasks sorted by priority
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/priority", verifyToken, getAllTasksByPriorityForUser);

/**
 * @swagger
 * /task/page/{pagenumber}:
 *   get:
 *     summary: Get all tasks by page number
 *     security:
 *       - authorisation: []
 *     parameters:
 *       - in: path
 *         name: pagenumber
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of tasks for the given page number
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/page/:pagenumber", verifyToken, getAllTasksByPriorityForUser);

/**
 * @swagger
 * /task/filter/duedate:
 *   get:
 *     summary: Get all tasks filtered by due date
 *     security:
 *       - authorisation: []
 *     responses:
 *       200:
 *         description: A list of tasks filtered by due date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/filter/duedate", verifyToken, getAllTasksByPriorityForUser);

/**
 * @swagger
 * /task/{taskId}:
 *   put:
 *     summary: Update a task
 *     security:
 *       - authorisation: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.put("/:taskId", verifyToken, updateTask);

/**
 * @swagger
 * /task/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     security:
 *       - authorisation: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:taskId", verifyToken, deleteTask);

export default router;
