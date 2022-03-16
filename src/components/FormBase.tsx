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
      paddingTop={{ base: "12", md: "24" }}
      paddingBottom={{ base: "12", md: "18" }}
      px={{ base: "0", sm: "8" }}
      width={{ base: "75%", md: "100%" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size="lg">{props.headingText}</Heading>
          </Stack>
        </Stack>

        <ButtonGroup variant="outline" spacing="4" width="full" display={{base: "none", md: "flex" }}>
          <GoogleProvider />
          <GitHubProvider />
        </ButtonGroup>

        <Stack spacing="4" width="full" display={{base: "flex", md: "none" }}>
          <GoogleProvider variant="outline"/>
          <GitHubProvider variant="outline"/>
        </Stack>

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
