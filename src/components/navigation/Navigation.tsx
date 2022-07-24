import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import Header from "./Header";

export class Page {
  name: string;
  link: string;

  constructor(name: string, link: string) {
    this.name = name;
    this.link = link;
  }
}

const signedInRoutes = [
  new Page("Home", "/dashboard"),
  new Page("Edit Profile", "/profile"),
  new Page("Sign Out", "/login"),
];

const signedOutRoutes = [
  new Page("Sign In", "/login"),
  new Page("Sign Up", "/signup"),
];

const Navigation: React.FC = () => {
  const { user } = useAuth();

  return <Header routes={user ? signedInRoutes : signedOutRoutes} />;
};

export default Navigation;
