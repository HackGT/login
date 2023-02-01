import React from "react";
import { LoadingScreen } from "@hex-labs/core";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  /**
   * If true, the component will check if the user has a valid profile. If not, it will redirect to the profile creation page.
   */
  checkValidProfile?: boolean;
  checkMember?: boolean;
  children: React.ReactElement | React.ReactElement[];
}

const RequireAuth: React.FC<Props> = ({ checkValidProfile, checkMember, children }) => {
  const { user, validProfile, loading, profile } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  // If no user, redirect to login page
  if (!user) {
    return <Navigate to={`/login${location.search}`} />;
  }

  if (!user.emailVerified) {
    return <Navigate to={`/setup/verify-email${location.search}`} />;
  }

  // If user doesn't have a valid profile, redirect to profile page
  if (checkValidProfile && !validProfile) {
    return <Navigate to={`/profile${location.search}`} />;
  }

  // If user is not a member, redirect to login page
  if (checkMember && !profile?.roles?.member) {
    return <Navigate to={`/login${location.search}`} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
