import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <Center h="100vh">
      <Spinner size="xl" />
    </Center>
  );
};

export default Loading;
