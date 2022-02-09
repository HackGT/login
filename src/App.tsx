import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import theme from "./util/theme";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./util/RequireAuth";
// import Dashboard from "./components/Dashboard";
// import Signup from "./components/Signup";
// import ForgotPassword from "./components/ForgotPassword";
// import UpdateProfile from "./components/UpdateProfile";

/* <PrivateRoute exact path="/" element={<Dashboard />} />
<PrivateRoute path="/update-profile" element={<UpdateProfile />} />
<Route path="/signup" element={<Signup />} />
<Route path="/forgot-password" element={<ForgotPassword />} /> */

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
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};
