/* eslint-disable no-underscore-dangle */
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  useToast,
  FormControl,
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AxiosRefetch } from "../../util/types";

interface Props {
  defaultValues: Partial<any>;
  isOpen: boolean;
  onClose: () => void;
  refetch: AxiosRefetch;
}

const UserEditModal: React.FC<Props> = (props) => {
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
        <ModalHeader>Edit Permissions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <VStack spacing={4} alignItems="normal">
              <FormControl>
                <Checkbox {...register("roles.member")}>Member</Checkbox>
              </FormControl>
              <FormControl>
                <Checkbox {...register("roles.exec")}>Exec</Checkbox>
              </FormControl>
              <FormControl>
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
export default UserEditModal;
