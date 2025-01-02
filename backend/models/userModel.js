// Importing necessary modules
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Defining the user schema with mongoose
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true, // Name is required
    },
    email: {
      type: String,
      require: true, // Email is required
      unique: true, // Email must be unique
    },
    password: {
      type: String,
      require: true, // Password is required
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Middleware to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // If the password field has not been modified, move to the next middleware
  if (!this.isModified("password")) {
    next();
  }
  // Generate a salt and hash the password with the salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Creating the User model from the schema
const User = mongoose.model("User", userSchema);

// Exporting the User model as the default export
export default User;
