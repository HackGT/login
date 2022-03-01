import { useEffect, useState } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Base: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState("");
  const { user } = useAuth();
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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // If after login we need to redirect to an app, redirect back with the id token
  if (searchParams.get("redirect")) {
    window.location.href = `${searchParams.get("redirect")}?idToken=${idToken}`;
  }

  return <Navigate to="/dashboard" />;

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
