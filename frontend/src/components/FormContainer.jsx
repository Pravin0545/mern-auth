// Importing necessary modules from React and React-Bootstrap
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Functional component to create a form container
const FormContainer = ({ children }) => {
  return (
    <>
      {/* Container to wrap the content */}
      <Container>
        {/* Row to center the form container */}
        <Row className="justify-content-md-center mt-5">
          {/* Column to hold the form content */}
          <Col xs={12} md={6} className="card p-5">
            {/* Render any children passed to this component */}
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
};

// Exporting the FormContainer component as the default export
export default FormContainer;
