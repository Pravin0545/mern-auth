// Importing necessary modules from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/slices/authSlice"; // Importing the auth slice reducer
import { apiSlice } from "./src/slices/apiSlice"; // Importing the API slice

// Configuring the Redux store
const store = configureStore({
  reducer: {
    // Adding the auth reducer
    auth: authReducer,
    // Adding the API slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Enabling Redux DevTools
  devTools: true,
});

// Exporting the configured store as the default export
export default store;
