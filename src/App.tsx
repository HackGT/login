import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./util/RequireAuth";
import Base from "./components/Base";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Action from "./components/action/Action";
import Footer from "./components/navigation/Footer";
import Navigation from "./components/navigation/Navigation";
import axios from "axios";

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
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/action" element={<Action />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};
