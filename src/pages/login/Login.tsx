import React, { useEffect, useState } from "react";
import { Button, HStack, Text } from "@chakra-ui/react";
import EmailPasswordLoginForm from "./EmailPasswordLoginForm";
import RegistrationPageTemplate from "../../components/RegistrationPageTemplate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, getRedirectResult } from "firebase/auth";
import { app, setCookieAndRedirect } from "../../util/firebase";
import { LoadingScreen } from "@hex-labs/core";

const auth = getAuth(app);

const Login: React.FC = () => {
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
