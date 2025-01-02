// Importing necessary modules and functions
import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

// Creating a new router instance
const router = express.Router();

// Route to register a new user
// @route POST /api/users
// @access Public
router.post("/", registerUser);

// Route to log out a user
// @route POST /api/users/logout
// @access Public
router.post("/logout", logoutUser);

// Route to authenticate a user and set token
// @route POST /api/users/auth
// @access Public
router.post("/auth", authUser);

// Routes for user profile operations (protected routes)
// @route GET /api/users/profile
// @route PUT /api/users/profile
// @access Private
router
  .route("/profile")
  .get(protect, getUserProfile) // Get user profile
  .put(protect, updateUserProfile); // Update user profile

// Exporting the router as the default export
export default router;
