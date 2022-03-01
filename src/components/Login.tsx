import React from "react";
import {
  Button,
  Heading,
  Stack,
  Container,
  Divider,
  HStack,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import EmailPasswordLogin from "./EmailPasswordLogin";
import GoogleProvider from "./oauth/GoogleProvider";
import GitHubProvider from "./oauth/GitHubProvider";

const Login: React.FC = () => {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size="lg">Log in to your account</Heading>
          </Stack>
        </Stack>

        <ButtonGroup variant="outline" spacing="4" width="full">
          <GoogleProvider />
          <GitHubProvider />
        </ButtonGroup>

        <HStack>
          <Divider />
          <Text fontSize="sm" whiteSpace="nowrap">
            or
          </Text>
          <Divider />
        </HStack>

        <EmailPasswordLogin />

        <HStack spacing="1" justify="center">
          <Text>Don't have an account?</Text>
          <Button variant="link" colorScheme="blue">
            Sign up
          </Button>
        </HStack>
      </Stack>
    </Container>
  );
};

export default Login;
