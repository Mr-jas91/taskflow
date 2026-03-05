import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import apiResponse from "../utils/apiResponse.js";
import generateToken from "../utils/generateToken.js";
// Register User Controller
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  if (password.length < 6) {
    throw new ApiError(400, "Password must be 6 character");
  }
  // Check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already existed");
  }

  //create user
  const user = await User.create({
    email,
    password
  });
  const token = await generateToken(user._id);
  res
    .status(201)
    .json(
      new apiResponse(
        201,
        { id: user._id, email: user.email, role: user.role, token: token },
        "User registered successfully"
      )
    );
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const validUser = await user.isPasswordCorrect(password);

  if (!validUser) {
    throw new ApiError(401, "Invalid Password");
  }

  const token = await generateToken(user._id);

  res.status(200).json(
    new apiResponse(
      200,
      {
        id: user._id,
        email: user.email,
        token,
        role: user?.role
      },
      "Login successfully"
    )
  );
});

export { registerUser, loginUser };
