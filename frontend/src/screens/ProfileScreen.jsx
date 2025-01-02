// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

// Functional component to create the profile screen
const ProfileScreen = () => {
  // State variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mutation hook for updating user
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access user info from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Effect to set form input values when userInfo changes
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  // Submit handler function for the profile update form
  const submitHandler = async (e) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        // Call the update user API and dispatch updated credentials to Redux state
        const res = await updateUser({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated Successfully"); // Show success toast
      } catch (err) {
        toast.error(err?.data?.message || err?.error); // Show error toast
      }
    }
  };

  return (
    <>
      {/* Form container component */}
      <FormContainer>
        <h1>Update Profile</h1>
        {/* Profile update form */}
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
          {isLoading && <Loader />} {/* Show loader while updating profile */}
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

// Exporting the ProfileScreen component as the default export
export default ProfileScreen;
