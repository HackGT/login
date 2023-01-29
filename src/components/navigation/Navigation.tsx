import React from "react";
import { Header, HeaderItem } from "@hex-labs/core";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";

import { useAuth } from "../../contexts/AuthContext";
import { app } from "../../util/firebase";

const auth = getAuth(app);

const Navigation: React.FC = () => {
  const { loading, user, profile } = useAuth();
  const location = useLocation();

  const logOut = async () => {
    await signOut(auth);
    await axios.post("https://auth.api.hexlabs.org/auth/logout");
  };

  if (loading) {
    return (
      <Header>
        <div />
      </Header>
    );
  }

  return user ? (
    <Header>
      <HeaderItem>
        <Link to="/dashboard">Home</Link>
      </HeaderItem>
      <HeaderItem>
        <Link to="/profile">Edit Profile</Link>
      </HeaderItem>
      {
        profile?.roles?.member && 
          <HeaderItem>
            <Link to="/users">View Users</Link>
          </HeaderItem>
      }
      <HeaderItem show>
        <Link to="/login" onClick={logOut}>
          Sign Out
        </Link>
      </HeaderItem>
    </Header>
  ) : (
    <Header>
      <HeaderItem>
        <Link to={`/login${location.search}`}>Sign In</Link>
      </HeaderItem>
      <HeaderItem show>
        <Link to={`/signup${location.search}`}>Sign Up</Link>
      </HeaderItem>
    </Header>
  );
};

export default Navigation;
