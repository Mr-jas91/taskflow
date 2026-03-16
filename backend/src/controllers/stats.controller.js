import Task from "../models/Task.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
export const getTaskStats = asyncHandler(async (req, res) => {
  const stats = await Task.aggregate([
    {
      $match: {
        createdBy: req.user._id
      }
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1
        }
      }
    }
  ]);
  const formattedStats = {
    pending: 0,
    "in-progress": 0,
    completed: 0
  };
  stats.forEach((item) => {
    formattedStats[item._id] = item.count;
  });
  res.status(200).json(new apiResponse(200, formattedStats, "stats fetched"));
});
