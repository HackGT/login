import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Container,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { app } from "../util/firebase";
import { handleLoginError } from "../util/handleLoginError";

const auth = getAuth(app);

const ForgotPassword: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (values: any) => {
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        toast({
          title: "Password Reset Email Sent",
          description:
            "An email to reset your password has been sent. Please check your inbox for a link.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((error) => {
        handleLoginError(error);
      });
  };

  return (
    <Container mt="8">
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size="lg">Forgot Password?</Heading>
            <Text>
              Enter the email address associated with your account, and we will
              send you a link to reset your password.
            </Text>
          </Stack>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="6">
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="hello@gmail.com"
                {...register("email", {
                  required: "Please enter an email",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <Button isLoading={isSubmitting} type="submit">
              Request Password Reset
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
