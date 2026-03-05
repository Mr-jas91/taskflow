import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { createTask } from "../controllers/task.controller.js";
const router = express.Router();
router.post("/", protect, createTask);

export default router;
