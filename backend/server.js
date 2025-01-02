// Importing necessary modules and functions
import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// Create an instance of express
const app = express();

// Connect to the database
connectDB();

// Define the port from environment variables or use 5000 as default
const port = process.env.PORT || 5000;

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Use express middlewares to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the route for user-related operations
app.use("/api/users", userRoutes);

// Serve static files and handle routing for production environment
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve(); // Resolve the directory name
  app.use(express.static(path.join(__dirname, "frontend/dist"))); // Serve static files
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  // Handle root route for development environment
  app.get("/", (req, res) => res.send("server is running"));
}

// Middleware for handling 404 Not Found errors
app.use(notFound);

// Middleware for handling general errors
app.use(errorHandler);

// Start the server and listen on the defined port
app.listen(port, () => console.log(`server running on port ${port}`));
