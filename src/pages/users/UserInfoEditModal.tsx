import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  useToast,
  FormControl,
  Checkbox,
  Text,
  VStack,
  Heading,
  Tag,
  HStack,
  Box,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DateTime } from "luxon";
import { PatternFormat } from "react-number-format";
import { AxiosRefetch } from "../../util/types";
import { CheckCircleIcon, WarningIcon, WarningTwoIcon } from "@chakra-ui/icons";

const PROVIDER_ID_MAP: Record<any, string> = {
  "google.com": "Google",
  "github.com": "GitHub",
  "saml.georgia-tech-login": "GT Login",
  "apple.com": "Apple",
  password: "Password",
};

interface Props {
  defaultValues: Partial<any>;
  isOpen: boolean;
  onClose: () => void;
  refetch: AxiosRefetch;
}

const UserInfoEditModal: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    reset(props.defaultValues);
  }, [props.defaultValues, reset]);

  const toast = useToast();

  const handleFormSubmit = async (values: any) => {
    try {
      await axios.post(
        `https://auth.api.hexlabs.org/permissions/${values.userId}`,
        values
      );
      await props.refetch();
      toast({
        title: "Success!",
        description: "Permissions have successfully been edited.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e: any) {
      toast({
        title: "Error!",
        description: "Could not edit. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      props.onClose();
    }
  };

  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pb={1}>User Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack mb="5">
            <Box>
              {props.defaultValues?.disabled && (
                <Tag colorScheme="red" size="lg">
                  <TagLeftIcon as={WarningTwoIcon} />
                  <TagLabel>Account Disabled</TagLabel>
                </Tag>
              )}
            </Box>
            <Box>
              <Text color="gray" fontSize="sm">
                Name
              </Text>
              <Text>
                {props.defaultValues?.name?.first}
                {props.defaultValues?.name?.middle ? " " : ""}
                {props.defaultValues?.name?.middle}{" "}
                {props.defaultValues?.name?.last}
              </Text>
            </Box>
            <Box>
              <Text color="gray" fontSize="sm">
                Email
              </Text>
              <Text display="inline" mr="2">
                {props.defaultValues?.email}
              </Text>
              {props.defaultValues?.emailVerified ? (
                <Tag>
                  <TagLeftIcon as={CheckCircleIcon} />
                  <TagLabel>Verified</TagLabel>
                </Tag>
              ) : (
                <Tag colorScheme="red">
                  <TagLeftIcon as={WarningIcon} />
                  <TagLabel>Not Verified</TagLabel>
                </Tag>
              )}
            </Box>
            <Box>
              <Text color="gray" fontSize="sm">
                Phone Number
              </Text>
              <Text>
                <PatternFormat
                  format="(###) ###-####"
                  value={props.defaultValues?.phoneNumber}
                  allowEmptyFormatting
                />
              </Text>
            </Box>
            <Box>
              <Text color="gray" fontSize="sm">
                User ID
              </Text>
              <Text>{props.defaultValues?.userId}</Text>
            </Box>
            <Box>
              <Text color="gray" fontSize="sm">
                Account Creation Time
              </Text>
              <Text>
                {DateTime.fromHTTP(
                  props.defaultValues?.metadata?.creationTime
                ).toLocaleString(DateTime.DATETIME_MED)}
              </Text>
            </Box>
            <Box>
              <Text color="gray" fontSize="sm">
                Last Sign In Time
              </Text>
              <Text>
                {DateTime.fromHTTP(
                  props.defaultValues?.metadata?.lastSignInTime
                ).toLocaleString(DateTime.DATETIME_MED)}
              </Text>
            </Box>
            <Box>
              <Text color="gray" fontSize="sm">
                Sign In Providers
              </Text>
              <HStack mt={1}>
                {props.defaultValues?.providerData?.map((provider: any) => (
                  <Tag key={provider.providerId}>
                    {PROVIDER_ID_MAP[provider.providerId]}
                  </Tag>
                ))}
              </HStack>
            </Box>
          </Stack>
          <Heading size="sm" as="h2" mb="2">
            Edit Permissions
          </Heading>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={3} alignItems="normal">
              <FormControl>
                <Checkbox {...register("roles.member")}>Member</Checkbox>
              </FormControl>
              <FormControl>
                <Checkbox {...register("roles.exec")}>Exec</Checkbox>
              </FormControl>
              <FormControl paddingBottom={1}>
                <Checkbox {...register("roles.admin")}>Admin</Checkbox>
              </FormControl>
              <Button
                colorScheme="purple"
                isLoading={isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default UserInfoEditModal;
