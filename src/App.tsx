import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./util/RequireAuth";
import BaseRedirector from "./pages/BaseRedirector";
import EditOrCreateProfile from "./pages/EditOrCreateProfile";
import Signup from "./pages/signup/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ActionHome from "./pages/action/ActionHome";
import Footer from "./components/navigation/Footer";
import Navigation from "./components/navigation/Navigation";
import axios from "axios";
import UserTablePage from "./pages/users/UserTablePage";

axios.defaults.withCredentials = true;

export const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Navigation />
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
          <Footer />
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};
