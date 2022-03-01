import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./util/RequireAuth";
import Base from "./components/Base";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Action from "./components/action/Action";

export const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Base />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/action" element={<Action />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};
