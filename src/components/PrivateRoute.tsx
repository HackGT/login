import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ element: Element, ...rest }: any) {
  const user = useAuth();

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return user ? <Element {...props} /> : <Navigate to="/login" />;
      }}
    ></Route>
  );
}
