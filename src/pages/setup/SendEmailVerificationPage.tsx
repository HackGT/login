import React, { useState } from "react";
import { Heading, Stack, Container, Text, Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import { LoadingScreen } from "@hex-labs/core";
import { Navigate, useLocation } from "react-router-dom";
import { handleLoginError } from "../../util/handleLoginError";

const SendEmailVerificationPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const location = useLocation();

  const sendEmail = async () => {
    if (user) {
      setEmailLoading(true);
      try {
        await sendEmailVerification(user, {
          url: `${window.location.origin}/${location.search}`,
        });
        setEmailSent(true);
      } catch (error) {
        handleLoginError(error);
      } finally {
        setEmailLoading(false);
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user || user.emailVerified) {
    return <Navigate to={`/${location.search}`} />;
  }

  return (
    <Container mt="8">
      <Stack spacing="8">
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size="lg">Verify your email</Heading>
          <Text>
            We sent a verification email to <Text as="b">{user?.email}</Text>.
            Please click the link inside to get started! Remember to check your
            spam/junk folder as well.
          </Text>
        </Stack>

        <Button
          disabled={emailSent}
          isLoading={emailLoading}
          onClick={sendEmail}
        >
          {emailSent ? "Email sent!" : "Send another verification email"}
        </Button>
      </Stack>
    </Container>
  );
};

export default SendEmailVerificationPage;
