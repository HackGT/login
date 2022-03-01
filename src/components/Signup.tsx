import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import FormBase from "./FormBase";
import EmailPasswordSignup from "./EmailPasswordSignup";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  return (
    <FormBase
      headingText="Create an account"
      emailPasswordComponent={<EmailPasswordSignup />}
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
