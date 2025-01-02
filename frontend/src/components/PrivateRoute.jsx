// Importing necessary modules and components
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

// Functional component to create a private route
const PrivateRoute = () => {
  // Access user info from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in, if yes render Outlet, otherwise navigate to login page
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

// Exporting the PrivateRoute component as the default export
export default PrivateRoute;
