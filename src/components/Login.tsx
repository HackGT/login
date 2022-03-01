import React from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import EmailPasswordLogin from "./EmailPasswordLogin";
import FormBase from "./FormBase";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <FormBase
      headingText="Log in to your account"
      emailPasswordComponent={<EmailPasswordLogin />}
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
