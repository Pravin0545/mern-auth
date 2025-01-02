import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/slices/authSlice";
import { apiSlice } from "./src/slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
