import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { LoadingScreen } from "@hex-labs/core";

const Dashboard: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container mt="8">
      <VStack spacing="5">
        <Heading>Register for HackGT 11!</Heading>
        <a href="https://registration.hexlabs.org">
          <Button align="center">Go!</Button>
        </a>
      </VStack>
    </Container>
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
