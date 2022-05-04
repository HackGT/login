import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import RegistrationPageTemplate from "../../components/RegistrationPageTemplate";
import EmailPasswordSignupForm from "./EmailPasswordSignupForm";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
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
