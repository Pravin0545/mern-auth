// Importing the jsonwebtoken module
import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as a cookie
const generateToken = (res, userId) => {
  // Create a JWT token with the user ID and expiration time of 30 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set the JWT token as an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // The cookie is accessible only by the web server
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent cross-site request forgery
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration time (30 days)
  });
};

// Exporting the generateToken function as the default export
export default generateToken;
