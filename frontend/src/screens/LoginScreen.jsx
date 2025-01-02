// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

// Functional component to create the login screen
const LoginScreen = () => {
  // State variables to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mutation hook for logging in
  const [login, { isLoading }] = useLoginMutation();

  // Access user info from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Effect to navigate to home page if user is already logged in
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Submit handler function for the login form
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Call the login API and dispatch credentials to Redux state
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/"); // Navigate to home page on successful login
      toast.success("User Login Successfully"); // Show success toast
    } catch (err) {
      toast.error(err?.data?.message || err?.error); // Show error toast
    }
  };

  return (
    <>
      {/* Form container component */}
      <FormContainer>
        <h1>Sign In</h1>
        {/* Login form */}
        <Form onSubmit={submitHandler}>
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
          {isLoading && <Loader />} {/* Show loader while logging in */}
          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
          <Row className="py-3">
            <Col>
              New Customer? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

// Exporting the LoginScreen component as the default export
export default LoginScreen;
