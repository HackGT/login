import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Heading,
  Stack,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Loading from "../util/Loading";

const Profile: React.FC = (props: any) => {
  const [ loading, setLoading ] = useState(true);
  const [ profile, setProfile ] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    const uid = await user?.uid!;
    try {
      profile ? (
        await axios.put(
          `https://users.api.hexlabs.org/users/${uid}/profile`,
          {
            ...values
          }
        )
      ) : (
        await axios.post(
          `https://users.api.hexlabs.org/users/${uid}/profile`,
          {
            ...values
          }
        )
      )
    } catch (e: any) {
      console.log(e.message);
    }
    navigate("/dashboard")
  };

  useEffect(() => {
    const getUserData = async () => {
      const uid = await user?.uid!;
      try {
        const res = await axios.get(`https://users.api.hexlabs.org/users/${uid}/profile`);
        if (Object.keys(res.data).length === 0) {
          setProfile(false);
          const name = user?.displayName ? user?.displayName.split(" ") : null;
          const data = {
            user: uid,
            name: {
              first: name ? name[0] : "",
              middle: name && name.length === 3 ? name[1] : "",
              last: name ? (name.length === 3 ? name[2] : name[1]) : "",
            },
            phoneNumber: user?.phoneNumber ? user?.phoneNumber : "",
            gender: "",
          }
          console.log(data);
          reset(data);
        } else {
          console.log(res.data);
          reset(res.data);
        }
        setLoading(false);
      } catch (e: any) {
        console.log(e.message)
      }
    };

    getUserData();
  }, [user, reset]);

  if (loading) {
    return <Loading />;
  }

  return (
      <VStack spacing="5" justify="center" marginY="24px">
        <Heading>{profile ? "Edit Profile" : "Create Profile"}</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Image src={user?.photoURL ? user?.photoURL : }/> */}
          <Stack spacing="6" width="300px">
            <Stack spacing="5">
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  {...register("name.first", {
                    required: "Please enter your first name",
                  })}
                />
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
                <Input
                  id="name.last"
                  type="text"
                  {...register("name.last", {
                    required: "Please enter your last name",
                  })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Please enter your phone number",
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder='Select gender'
                  id="gender"
                  type="text"
                  {...register("gender")}
                >
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </Select>
              </FormControl>
            </Stack>

            <HStack spacing={profile ? "16" : "0"} justify="center" type="cancel">
              <Button hidden={!profile} onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button isLoading={isSubmitting} type="submit">
                Save
              </Button>
            </HStack>
          </Stack>
        </form>
      </VStack>
  );
};

export default Profile;
