import React, { useEffect, useState } from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import RegistrationPageTemplate from "../../components/RegistrationPageTemplate";
import EmailPasswordSignupForm from "./EmailPasswordSignupForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadingScreen } from "@hex-labs/core";
import { getAuth, getRedirectResult } from "firebase/auth";
import { app, setCookieAndRedirect } from "../../util/firebase";

const auth = getAuth(app);

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRedirectResult(auth).then(async (userCredential) => {
      if (userCredential) {
        await setCookieAndRedirect(userCredential, navigate, location);
      }
      setLoading(false);
    });
  }, [location, navigate]);

  if (loading) {
    return <LoadingScreen />;
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
