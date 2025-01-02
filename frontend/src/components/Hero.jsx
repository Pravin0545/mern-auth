// Importing necessary modules from React and React-Bootstrap
import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Functional component to create a Hero section
const Hero = () => {
  return (
    <div className="py-5">
      {" "}
      {/* Apply padding to the top and bottom */}
      <Container className="d-flex justify-content-center">
        {/* Center the content */}
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {/* Apply padding and styles to the card */}
          <h1 className="text-center mb-4">MERN Authentication</h1>
          {/* Main heading */}
          <p className="text-center mb-4">
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          {/* Description paragraph */}
          <div className="d-flex">
            {/* Container for buttons */}
            <LinkContainer to="/login">
              {/* Link to the login page */}
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              {/* Link to the registration page */}
              <Button variant="secondary">Sign Up</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

// Exporting the Hero component as the default export
export default Hero;
