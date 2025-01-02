// Importing necessary modules
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware function to protect routes
const protect = async (req, res, next) => {
  // Retrieve token from cookies
  let token = req.cookies.jwt;

  // Check if token is available
  if (token) {
    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and exclude the password field
      req.user = await User.findById(decoded.userId).select("-password");

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      // If token verification fails, respond with 401 (Unauthorized)
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // If no token is provided, respond with 401 (Unauthorized)
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Export the protect middleware function
export { protect };
