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
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  //filter
  const filter = { createdBy: req.user._id };
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.priority) {
    filter.priority = req.query.priority;
  }
  const sort = req.query.sort || "-createdAt";
  const tasks = await Task.find(filter).sort(sort).skip(skip).limit(limit);
  if (!tasks) {
    throw new ApiError(404, "No Task");
  }
  const totalTasks = await Task.countDocuments({
    createdBy: req.user._id.toString()
  });
  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { page, totalPagess: Math.ceil(totalTasks / limit), tasks },
        "all tasks fetched"
      )
    );
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
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(404, "Task not Found");
  }
  if (task.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to delete task");
  }
  await task.deleteOne();
  res.status(200).json(new apiResponse(200, {}, "Delete Successfully"));
});
export { createTask, getTasks, updateTask, deleteTask };
