// Importing necessary modules and functions
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @description Authenticate user and set token
// @route POST /api/users/auth
// @access Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); // Generate token for user
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid Email or Password" }); // Invalid credentials
  }
};

// @description Register a new user
// @route POST /api/users
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({ message: "User already exist" });
    return;
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id); // Generate token for new user
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid User Data" });
  }
};

// @description Logout user
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Expire the token immediately
  });
  res.status(200).json({ message: "User Logged Out" });
});

// @description Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  // Return user profile data
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
};

// @description Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
  // Find user by ID
  const user = await User.findById(req.user._id);

  if (user) {
    // Update user fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save updated user
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
  res.status(200).json({ message: "Update user profile" });
};

// Exporting the functions
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
