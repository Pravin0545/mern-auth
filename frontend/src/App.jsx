// Importing necessary modules and components
import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Functional component to create the main application
const App = () => {
  return (
    <>
      {/* Render the Header component */}
      <Header />
      {/* Toast container to display notifications */}
      <ToastContainer />
      {/* Main content container with top margin */}
      <Container className="my-3">
        {/* Render the current route component */}
        <Outlet />
      </Container>
    </>
  );
};

// Exporting the App component as the default export
export default App;
