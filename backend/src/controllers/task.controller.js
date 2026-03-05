import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  if (!title || !description || !status || !priority || !dueDate) {
    throw new ApiError(404, "All field are required");
  }
  const task = await Task.create({
    title,
    description,
    status,
    priority,
    dueDate,
    createdBy: req.user._id
  });
  if (!task) {
    throw new ApiError(409, "task creation failed");
  }
  return res.status(200).json(new apiResponse(200, { task }, "task created"));
});

export { createTask };
