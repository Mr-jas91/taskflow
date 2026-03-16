import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { loginLimiter } from "../middlewares/rateLimit.middleware.js";
import { registerValidator } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
const router = express.Router();
router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginLimiter, loginUser);
export default router;
