import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import EmailPasswordLoginForm from "./EmailPasswordLoginForm";
import RegistrationPageTemplate from "../../components/RegistrationPageTemplate";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
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
