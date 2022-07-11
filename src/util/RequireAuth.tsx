import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

interface Props {
  /**
   * If true, the component will check if the user has a valid profile. If not, it will redirect to the profile creation page.
   */
  checkValidProfile?: boolean;
}

const RequireAuth: React.FC<Props> = ({ checkValidProfile, children }) => {
  const { user, validProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  // If no user, redirect to login page
  if (!user) {
    return <Navigate to={`/login${location.search}`} />;
  }

  // If user doesn't have a vlaid profile, redirect to profile page
  if (checkValidProfile && !validProfile) {
    return <Navigate to={`/profile${location.search}`} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
