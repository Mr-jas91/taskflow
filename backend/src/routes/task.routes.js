import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";
const router = express.Router();
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
export default router;
