// Importing necessary modules from the API slice
import { apiSlice } from "./apiSlice";

// Define the base URL for user-related operations
const USERS_URL = "/api/users";

// Injecting endpoints into the apiSlice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for user login
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`, // URL for user authentication
        method: "POST", // HTTP method
        body: data, // Request body containing user credentials
      }),
    }),
    // Mutation for user registration
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // URL for user registration
        method: "POST", // HTTP method
        body: data, // Request body containing user details
      }),
    }),
    // Mutation for updating user profile
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`, // URL for updating user profile
        method: "PUT", // HTTP method
        body: data, // Request body containing updated user details
      }),
    }),
    // Mutation for user logout
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, // URL for user logout
        method: "POST", // HTTP method
      }),
    }),
  }),
});

// Exporting the hooks generated by createApi
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = usersApiSlice;
