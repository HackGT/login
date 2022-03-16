import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../util/Loading";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      const res = await axios.get(
        `https://users.api.hexlabs.org/users/${user?.uid}/profile`
      );

      if (Object.keys(res.data).length === 0) {
        navigate("/profile");
      }

      setProfile(res.data);
      setLoading(false);
    };

    getDetails();
  }, [navigate, user?.uid]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box maxW="80%" m="auto" mt="5" h="450px">
        <VStack spacing="5">
          <Heading>Your QR Code</Heading>
          <Text>
            Use this QR code to enter into the event and wherever you go.
          </Text>
          <QRCode
            value={JSON.stringify({
              uid: user?.uid,
              name: {
                first: profile.name?.first,
                last: profile.name?.last,
              },
              email: user?.email,
            })}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            renderAs={"svg"}
          />
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
