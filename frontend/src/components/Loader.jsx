// Importing necessary modules from React and React-Bootstrap
import { Spinner } from "react-bootstrap";
import React from "react";

// Functional component to create a loading spinner
const Loader = () => {
  return (
    <Spinner
      animation="border" // Border animation style
      role="status" // Role attribute for accessibility
      style={{
        width: "50px", // Width of the spinner
        height: "50px", // Height of the spinner
        margin: "auto", // Center the spinner horizontally
        display: "block", // Display as block element
      }}
    ></Spinner>
  );
};

// Exporting the Loader component as the default export
export default Loader;
