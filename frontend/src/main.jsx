// Importing necessary modules and components
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import store from "../store.js"; // Importing the Redux store
import { Provider } from "react-redux"; // Importing the Redux Provider
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Creating the router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Default route (home screen) */}
      <Route index={true} path="/" element={<HomeScreen />} />
      {/* Route for login screen */}
      <Route path="/login" element={<LoginScreen />} />
      {/* Route for registration screen */}
      <Route path="/register" element={<RegisterScreen />} />
      {/* Protected route for profile screen */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

// Get the root element from the HTML file
const rootElement = document.getElementById("root");

if (rootElement) {
  // Create the root and render the application with the Redux store and React router
  createRoot(rootElement).render(
    <Provider store={store}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </Provider>
  );
} else {
  // Log an error if the root element is not found
  console.error(
    "Root element not found. Make sure the element exists in your HTML file."
  );
}
