import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

const RequireAuth: React.FC = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={`/login${location.search}`} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
