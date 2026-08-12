import axios from "axios";
import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { LoadingScreen } from "@hex-labs/core";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { app } from "../util/firebase";

const auth = getAuth(app);

export default function Dashboard() {
  const { user, profile } = useAuth();
	const navigate = useNavigate();

	if (!user) {
		// redirect them to actual login
		navigate("/login");
		return <LoadingScreen />;
	}

	async function handleLogout() {
    await signOut(auth);
    await axios.post("https://auth.api.hexlabs.org/auth/logout");
	}

	const welcomeText = profile?.name.first?
		`Welcome, ${profile.name.first}!`
	:
		"Welcome!";

	return (
		<Container mt="8">
			<VStack spacing="8" justify="center" marginY="24px">
				<Heading size="lg">
					{welcomeText}
				</Heading>

				<p>
					<b>Email: </b>
					{user.email || profile?.email || "Unknown! Please report this."}
				</p>

				{!profile?.name && (
					<Text textAlign="center" fontSize="md" color="gray.500">
						Looks like you haven't set up your profile yet. Click the link below to get started.
					</Text>
				)}

				<VStack>
					<Link to="/profile">
						<Button colorScheme="purple">
							Update Profile
						</Button>
					</Link>
					<Button as="a" href="https://registration.hexlabs.org" colorScheme="gray">
						Go to Registration
					</Button>
					<Button colorScheme="gray" onClick={handleLogout}>
						Log Out
					</Button>
				</VStack>
			</VStack>
		</Container>
  );
}
