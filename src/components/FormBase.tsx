import React from "react";
import {
  Heading,
  Stack,
  Container,
  Divider,
  HStack,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import GoogleProvider from "./oauth/GoogleProvider";
import GitHubProvider from "./oauth/GitHubProvider";

interface Props {
  headingText: string;
  emailPasswordComponent: JSX.Element;
  helpComponent: JSX.Element;
}

const FormBase: React.FC<Props> = (props) => {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size="lg">{props.headingText}</Heading>
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

        {props.emailPasswordComponent}

        {props.helpComponent}
      </Stack>
    </Container>
  );
};

export default FormBase;
