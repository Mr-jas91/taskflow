import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
const validate = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.errors[0]);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.errors[0].msg);
  }
});
export default validate;
