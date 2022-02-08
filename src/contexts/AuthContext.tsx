import React, { useContext, createContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../util/firebase";

export type User = FirebaseUser | null;

const AuthContext = createContext<User | undefined>(undefined);
const auth = getAuth(app);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("AUTH STATE CHANGED!");
      console.log(firebaseUser);
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
