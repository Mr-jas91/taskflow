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
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user._id.toString() });
  if (!tasks) {
    throw new ApiError(404, "No Task");
  }
  return res.status(200).json(new apiResponse(200, tasks, "all tasks fetched"));
});
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  //check ownership
  if (task.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to update the task");
  }
  //update fields
  const updateTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  res
    .status(200)
    .json(new apiResponse(200, updateTask, "Task Updated successfully"));
});
export { createTask, getTasks, updateTask };
