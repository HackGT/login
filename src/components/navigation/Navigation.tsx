import React from "react";
import { Header, HeaderItem } from "@hex-labs/core";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";

import { useAuth } from "../../contexts/AuthContext";
import { app } from "../../util/firebase";

const auth = getAuth(app);

const Navigation: React.FC = () => {
  const { user } = useAuth();

  const logOut = async () => {
    signOut(auth);
    await axios.post("https://auth.api.hexlabs.org/auth/logout");
  };

  return user ? (
    <Header>
      <HeaderItem>
        <Link to="/dashboard">Home</Link>
      </HeaderItem>
      <HeaderItem>
        <Link to="/profile">Edit Profile</Link>
      </HeaderItem>
      <HeaderItem show>
        <Link to="/login" onClick={logOut}>
          Sign Out
        </Link>
      </HeaderItem>
    </Header>
  ) : (
    <Header>
      <HeaderItem>
        <Link to="/login">Sign In</Link>
      </HeaderItem>
      <HeaderItem show>
        <Link to="/signup">Sign Up</Link>
      </HeaderItem>
    </Header>
  );
};

export default Navigation;
