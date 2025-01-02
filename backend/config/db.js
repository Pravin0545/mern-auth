// Import the mongoose library to interact with MongoDB
import mongoose from "mongoose";

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the MONGO_URI environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a success message with the host of the connected database
    console.log(`MongoDB Connected to ${conn.connection.host}`);
  } catch (error) {
    // If there's an error, log the error message
    console.error(`Error: ${error.message}`);

    // Exit the process with a failure code
    process.exit(1);
  }
};

// Export the connectDB function as the default export
export default connectDB;
