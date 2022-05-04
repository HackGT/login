import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
  Container,
  Heading,
} from "@chakra-ui/react";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { app } from "../../util/firebase";
import { handleLoginError } from "../../util/handleLoginError";

const auth = getAuth(app);

interface Props {
  oobCode: string;
}

const ChangePassword: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();
  const toast = useToast();

  const onSubmit = async (values: any) => {
    confirmPasswordReset(auth, props.oobCode, values.password)
      .then(() => {
        toast({
          title: "Password Successfully Reset",
          description:
            "Your password was successfully reset. Please login again with your new password.",
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
            <Heading size="lg">Change Password</Heading>
          </Stack>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl isInvalid={errors.password}>
                <FormLabel>New Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Please enter a password",
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please enter a password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>

            <Stack spacing="6">
              <Button isLoading={isSubmitting} type="submit">
                Change Password
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default ChangePassword;
