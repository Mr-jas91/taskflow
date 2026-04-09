import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes/auth.routes.js";
import taskRoutes from "../src/routes/task.routes.js";
import globalErrorHandler from "./middlewares/error.middleware.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_END,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    optionsSuccessStatus: 200
  })
);
app.use(express.json());
app.use(apiLimiter);
app.use("/api/auth", router);
app.use("/api/tasks", taskRoutes);
app.use(globalErrorHandler);
export default app;
