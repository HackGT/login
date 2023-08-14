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
import GoogleProvider from "./oauthProviders/GoogleProvider";
import GitHubProvider from "./oauthProviders/GitHubProvider";
import GeorgiaTechProvider from "./oauthProviders/GeorgiaTechProvider";
import AppleProvider from "./oauthProviders/AppleProvider";

interface Props {
  headingText: string;
  emailPasswordComponent: JSX.Element;
  helpComponent: JSX.Element;
}

const RegistrationPageTemplate: React.FC<Props> = (props) => {
  return (
    <Container mt="8">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size="lg">{props.headingText}</Heading>
          </Stack>
        </Stack>

        <ButtonGroup variant="outline" flexDirection="column">
          <GoogleProvider />
          <GitHubProvider />
          <GeorgiaTechProvider />
          <AppleProvider />
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

export default RegistrationPageTemplate;
