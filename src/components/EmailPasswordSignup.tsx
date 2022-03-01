import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { app, setCookieAndRedirect } from "../util/firebase";
import { handleLoginError } from "../util/handleLoginError";

const auth = getAuth(app);

const EmailPasswordSignup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const onSubmit = async (values: any) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        setCookieAndRedirect(userCredential, navigate, location);
      })
      .catch((error) => {
        handleLoginError(error);
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
              {errors.email && errors.email.message}
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
          <FormControl isInvalid={errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please enter a password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack spacing="6">
          <Button isLoading={isSubmitting} type="submit">
            Sign up
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default EmailPasswordSignup;
