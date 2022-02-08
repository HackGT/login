import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import theme from "./util/theme";
// import Dashboard from "./components/Dashboard";
// import Signup from "./components/Signup";
// import ForgotPassword from "./components/ForgotPassword";
// import UpdateProfile from "./components/UpdateProfile";

export const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* <PrivateRoute exact path="/" element={<Dashboard />} />
            <PrivateRoute path="/update-profile" element={<UpdateProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};
