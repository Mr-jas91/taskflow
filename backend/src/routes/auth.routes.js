import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { loginLimiter } from "../middlewares/rateLimit.middleware.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);
export default router;
