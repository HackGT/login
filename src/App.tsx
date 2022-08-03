import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Footer } from "@hex-labs/core";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard";
import BaseRedirector from "./pages/BaseRedirector";
import EditOrCreateProfile from "./pages/EditOrCreateProfile";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ActionHome from "./pages/action/ActionHome";
import UserTablePage from "./pages/users/UserTablePage";
import Navigation from "./components/navigation/Navigation";
import RequireAuth from "./util/RequireAuth";

axios.defaults.withCredentials = true;

export const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Navigation/>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth checkValidProfile>
                  <BaseRedirector />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth checkValidProfile>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <EditOrCreateProfile />
                </RequireAuth>
              }
            />
            <Route
              path="/users"
              element={
                <RequireAuth checkValidProfile>
                  <UserTablePage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/action" element={<ActionHome />} />
          </Routes>
          <Footer/>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};
