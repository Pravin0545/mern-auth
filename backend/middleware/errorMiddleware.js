// Middleware function for handling 404 Not Found errors
const notFound = (req, res, next) => {
  // Create a new error object with the original URL that was not found
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // Set the response status to 404 (Not Found)
  res.status(404);
  // Pass the error to the next middleware
  next(error);
};

// General error handling middleware
const errorHandler = (err, req, res, next) => {
  // Set the status code to 500 (Internal Server Error) if it's currently 200 (OK)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // Get the error message
  let message = err.message;

  // Handle specific error cases
  if (err.name === "CastError" && err.kind === "objectId") {
    // If the error is a CastError related to objectId, set status code to 404
    statusCode = 404;
    message = "Resource not found";
  }

  // Respond with the error message and stack trace (if not in production)
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Export the middleware functions
export { notFound, errorHandler };
