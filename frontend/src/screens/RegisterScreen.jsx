// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

// Functional component to create the registration screen
const RegisterScreen = () => {
  // State variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mutation hook for registering a new user
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access user info from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Effect to navigate to home page if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Submit handler function for the registration form
  const submitHandler = async (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        // Call the register API and dispatch credentials to Redux state
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/"); // Navigate to home page on successful registration
        toast.success("User Registered Successfully"); // Show success toast
      } catch (err) {
        toast.error(err?.data?.message || err?.error); // Show error toast
      }
    }
  };

  return (
    <>
      {/* Form container component */}
      <FormContainer>
        <h1>Sign Up</h1>
        {/* Registration form */}
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {isLoading && <Loader />} {/* Show loader while registering */}
          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
          <Row className="py-3">
            <Col>
              Already have an account? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

// Exporting the RegisterScreen component as the default export
export default RegisterScreen;
