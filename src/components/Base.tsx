import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../util/Loading";

const Base: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState("");
  const { user } = useAuth();
  const [searchParams, ] = useSearchParams();

  useEffect(() => {
    const getToken = async () => {
      const newToken = await user?.getIdToken();
      setIdToken(newToken || "");
      setLoading(false);
    };

    getToken();
  });

  if (loading) {
    return <Loading />;
  }

  // If after login we need to redirect to an app, redirect back with the id token
  if (searchParams.get("redirect")) {
    window.location.href = `${searchParams.get("redirect")}?idToken=${idToken}`;
  }

  return <Navigate to="/dashboard" />;
};

export default Base;
