import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
const validate = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  console.log("error", errors.errors[0]);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.errors[0].msg);
  }
  next();
});
export default validate;
