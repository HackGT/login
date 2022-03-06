import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Heading,
  Stack,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
  const [ gender, setGender ] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
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
          const name = user?.displayName?.split(" ");
          const data = {
            user: uid,
            name: {
              first: name ? name[0] : "",
              middle: name && name.length === 3 ? name[1] : "",
              last: name ? (name.length === 3 ? name[2] : name[1]) : "",
            },
            phoneNumber: user?.phoneNumber,
            gender: "",
          }
          reset(data);
        } else {
          if (res.data.gender === "male" || res.data.gender === "female" || res.data.gender === "") {
            setGender(res.data.gender);
          } else {
            setGender("other");
          }
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
                  {...register("name.first")}
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
                  {...register("name.last")}
                />
              </FormControl>
              <FormControl isInvalid={errors.phoneNumber} isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber", {
                    pattern: {
                      //eslint-disable-next-line
                      value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                      message: "Please enter a valid phone number"
                    }
                  })}
                />
                <FormErrorMessage>
                  {errors.phoneNumber && errors.phoneNumber.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Stack spacing="2">
                  <Select
                    id="gender"
                    type="text"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value)
                      const options = e.target.options;
                      setValue("gender", (options[options.selectedIndex].id === "noShow") ? e.target.value : "");
                    }}
                  >
                    <option id="noShow" value="">Select gender</option>
                    <option id="noShow" value="male">Male</option>
                    <option id="noShow" value="female">Female</option>
                    <option id="show" value="other">Other</option>
                  </Select>
                  {gender === "other" ? (
                    <Input
                      type="text"
                      {...register("gender", {
                        onChange: (e) => {
                          if (e.target.value.toLowerCase() === "male") {
                            setGender("male")
                           } else if (e.target.value.toLowerCase() === "female") {
                             setGender("female")
                           }
                        }
                      })}
                    />
                  ):(null)
                  }
                </Stack>
              </FormControl>
            </Stack>
            <HStack spacing={profile ? "16" : "0"} justify="center" type="cancel">
              <Button hidden={!profile} type="reset" onClick={() => navigate("/dashboard")}>
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
