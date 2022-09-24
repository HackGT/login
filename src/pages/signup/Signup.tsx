import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import RegistrationPageTemplate from "../../components/RegistrationPageTemplate";
import EmailPasswordSignupForm from "./EmailPasswordSignupForm";
import { Link, Navigate, useLocation } from "react-router-dom";
import { LoadingScreen } from "@hex-labs/core";
import { useAuth } from "../../contexts/AuthContext";

const Signup: React.FC = () => {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to={`/${location.search}`} />;
  }

  return (
    <RegistrationPageTemplate
      headingText="Create an account"
      emailPasswordComponent={<EmailPasswordSignupForm />}
      helpComponent={
        <HStack spacing="1" justify="center">
          <Text>Already have an account?</Text>
          <Link to="/login">
            <Button variant="link" colorScheme="blue">
              Log In
            </Button>
          </Link>
        </HStack>
      }
    />
  );
};

export default Signup;
