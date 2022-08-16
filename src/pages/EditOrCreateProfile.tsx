import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Heading,
  Stack,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  Input,
  Button,
  NumberInputField,
  Container,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const EditOrCreateProfile: React.FC = () => {
  const { user, profile, refetchProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const phoneNumberFormat = (val: any) => {
    if (!val || val.length === 0) {
      return "";
    }
    if (val.length <= 3) {
      return `(${val.slice(0, val.length)}`;
    } else if (val.length <= 6) {
      return `(${val.slice(0, 3)}) ${val.slice(3, val.length)}`;
    } else if (val.length <= 10) {
      return `(${val.slice(0, 3)}) ${val.slice(3, 6)}-${val.slice(
        6,
        val.length
      )}`;
    } else {
      return val;
    }
  };

  /**
   * Generates initial default user profile based on current user profile.
   */
  const defaultUserProfile = useMemo(() => {
    if (!profile || Object.keys(profile).length === 0) {
      const name = user?.displayName?.split(" ");
      return {
        name: {
          first: name ? name[0] : "",
          middle: name && name.length === 3 ? name[1] : "",
          last: name ? (name.length === 3 ? name[2] : name[1]) : "",
        },
        phoneNumber: "",
      };
    } else {
      const updatedProfile = {
        name: profile.name,
        phoneNumber: phoneNumberFormat(profile.phoneNumber),
      };

      return updatedProfile;
    }
  }, [user, profile]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultUserProfile,
  });

  const onSubmit = async (values: any) => {
    const phoneNumber = getValues("phoneNumber")?.replace(/[- )(]/g, "");
    try {
      !profile || Object.keys(profile).length === 0
        ? await axios.post(`https://users.api.hexlabs.org/users`, {
            ...values,
            user: user?.uid,
            phoneNumber,
          })
        : await axios.put(`https://users.api.hexlabs.org/users/${user?.uid}`, {
            ...values,
            phoneNumber,
          });
      navigate(`/${location.search}`);
    } catch (e: any) {
      console.log(e.message);
    }
    await refetchProfile();
  };

  return (
    <Container mt="8">
      <VStack spacing="5" justify="center" marginY="24px">
        <Heading>{profile ? "Edit Profile" : "Create Profile"}</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input id="firstName" type="text" {...register("name.first")} />
              </FormControl>
              <FormControl>
                <FormLabel>Middle Name</FormLabel>
                <Input
                  id="name.middle"
                  type="text"
                  {...register("name.middle")}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input id="name.last" type="text" {...register("name.last")} />
              </FormControl>
              <FormControl isInvalid={Boolean(errors.phoneNumber)} isRequired>
                <FormLabel>Phone Number</FormLabel>
                <NumberInput
                  format={phoneNumberFormat}
                  parse={(e) => e.replace(/[- )(]/g, "")}
                  pattern="^([(]\d+[)]\s\d+[-])?\d+$"
                  inputMode="tel"
                  clampValueOnBlur={false}
                >
                  <NumberInputField
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      minLength: {
                        value: 14,
                        message: "Please enter a valid phone number",
                      },
                      maxLength: {
                        value: 14,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                </NumberInput>
                <FormErrorMessage>
                  {errors.phoneNumber && errors.phoneNumber.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <HStack
              spacing={profile ? "16" : "0"}
              justify="center"
              type="cancel"
            >
              <Button
                hidden={!profile}
                type="reset"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button isLoading={isSubmitting} type="submit">
                Save
              </Button>
            </HStack>
          </Stack>
        </form>
      </VStack>
    </Container>
  );
};

export default EditOrCreateProfile;
