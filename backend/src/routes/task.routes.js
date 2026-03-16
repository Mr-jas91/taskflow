import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";
import { getTaskStats } from "../controllers/stats.controller.js";
const router = express.Router();
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

// get Stats API
router.get("/stats", protect, getTaskStats);
export default router;
