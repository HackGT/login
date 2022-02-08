import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { app } from "../util/firebase";

const auth = getAuth(app);

const EmailPasswordLogin: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    console.log(values);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="6">
        <Stack spacing="5">
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
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
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
        </Stack>
        <HStack justify="space-between">
          <Checkbox defaultIsChecked>Remember me</Checkbox>
          <Button variant="link" colorScheme="blue" size="sm">
            Forgot password?
          </Button>
        </HStack>
        <Stack spacing="6">
          <Button isLoading={isSubmitting} type="submit">
            Sign in
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default EmailPasswordLogin;
