import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { app } from "../util/firebase";
import Loading from "../util/Loading";

const auth = getAuth(app);

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      const newToken = await user?.getIdToken();
      const uid = await user?.uid;
      const res = await axios.get(`https://users.api.hexlabs.org/users/${uid}/profile`);
      if (Object.keys(res.data).length === 0) {
        navigate("/profile");
      }
      setIdToken(newToken || "");
      setLoading(false);
    };
    
    getDetails();
  });

  const logOut = async () => {
    signOut(auth);

    await axios.post(
      "https://users.api.hexlabs.org/auth/logout",
      {},
      { withCredentials: true }
    );

    navigate("/login");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box maxW="80%" m="auto" mt="5">
        <VStack spacing="5">
          <Heading>Your Access Token</Heading>
          <Text fontSize="sm" wordBreak="break-all">
            {idToken.replace(/^\s+|\s+$/g, "")}
          </Text>
          <Button onClick={() => navigate("/profile")}>Edit Profile</Button>
          <Button onClick={logOut}>Log Out</Button>
        </VStack>
      </Box>
    </>
  );
};

export default Dashboard;

// import React, { useState } from "react";
// import { Card, Button, Alert } from "react-bootstrap";
// import { useAuth } from "../contexts/AuthContext";
// import { Link, useHistory } from "react-router-dom";

// export default function Dashboard() {
//   const [error, setError] = useState("");
//   const { currentUser, logout } = useAuth();
//   const history = useHistory();

//   async function handleLogout() {
//     setError("");

//     try {
//       await logout();
//       history.push("/login");
//     } catch {
//       setError("Failed to log out");
//     }
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Profile</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <strong>Email:</strong> {currentUser.email}
//           <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
//             Update Profile
//           </Link>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         <Button variant="link" onClick={handleLogout}>
//           Log Out
//         </Button>
//       </div>
//     </>
//   );
// }
