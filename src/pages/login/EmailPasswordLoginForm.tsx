import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { app, setCookieAndRedirect } from "../../util/firebase";
import { handleLoginError } from "../../util/handleLoginError";

const auth = getAuth(app);

const EmailPasswordLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
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
        </Stack>

        <Stack spacing="6">
          <Button isLoading={isSubmitting} type="submit">
            Sign in
          </Button>
        </Stack>
        <Link to="/forgot-password">
          <Button
            variant="link"
            colorScheme="blue"
            size="sm"
            alignSelf="flex-start"
          >
            Forgot password?
          </Button>
        </Link>
      </Stack>
    </form>
  );
};

export default EmailPasswordLoginForm;
