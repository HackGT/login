import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import EmailPasswordLoginForm from "./EmailPasswordLoginForm";
import RegistrationPageTemplate from "../../components/RegistrationPageTemplate";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingScreen } from "@hex-labs/core";

const Login: React.FC = () => {
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
      headingText="Log in to your account"
      emailPasswordComponent={<EmailPasswordLoginForm />}
      helpComponent={
        <HStack spacing="1" justify="center">
          <Text>Don't have an account?</Text>
          <Link to="/signup">
            <Button variant="link" colorScheme="blue">
              Sign up
            </Button>
          </Link>
        </HStack>
      }
    />
  );
};

export default Login;
