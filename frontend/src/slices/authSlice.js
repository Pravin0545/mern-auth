// Importing necessary module from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null, // Set userInfo from local storage if available, otherwise set to null
};

// Creating an auth slice
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Reducer to set user credentials
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // Update state with user info
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Store user info in local storage
    },
    // Reducer to log out user
    logout: (state, action) => {
      state.userInfo = null; // Clear user info from state
      localStorage.removeItem("userInfo"); // Remove user info from local storage
    },
  },
});

// Exporting the actions generated by createSlice
export const { setCredentials, logout } = authSlice.actions;

// Exporting the reducer as the default export
export default authSlice.reducer;
