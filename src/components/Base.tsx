import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { app } from "../util/firebase";

const auth = getAuth(app);

const Base: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const getToken = async () => {
      const newToken = await user?.getIdToken();
      setIdToken(newToken || "");
      setLoading(false);
    };

    getToken();
  });

  if (!user) {
    return <Navigate to={`/login${location.search}`} />;
  }

  if (searchParams.get("redirect")) {
    if (loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <Navigate to={`${searchParams.get("redirect")}?idToken=${idToken}`} />
    );
  } else {
    window.location.href = "https://hexlabs.org";
  }

  return null;

  // const logOut = () => {
  //   signOut(auth);
  //   navigate("/login");
  // };

  // return (
  //   <>
  //     <Box maxW="80%" m="auto" mt="5">
  //       <VStack spacing="5">
  //         <Heading>Your Access Token</Heading>
  //         <Text fontSize="sm" wordBreak="break-all">
  //           {idToken.replace(/^\s+|\s+$/g, "")}
  //         </Text>
  //         <Button onClick={logOut}>Log Out</Button>
  //       </VStack>
  //     </Box>
  //   </>
  // );
};

export default Base;
