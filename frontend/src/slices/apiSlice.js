// Importing necessary modules from Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base query configuration with an empty base URL
const baseQuery = fetchBaseQuery({ baseUrl: "" });

// Creating an API slice
export const apiSlice = createApi({
  baseQuery, // Setting the base query for the API
  tagTypes: ["User"], // Defining the tag types for cache management
  endpoints: (builder) => ({}), // Defining the endpoints (currently empty)
});
