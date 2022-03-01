import React, { useContext, createContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../util/firebase";
import axios from "axios";

export type User = FirebaseUser | null;

const initialState = {
  user: undefined,
  loading: true,
};

const AuthContext =
  createContext<{ user: User | undefined; loading: boolean }>(initialState);
const auth = getAuth(app);

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.get(
          "https://users.api.hexlabs.org/auth/status",
          {
            withCredentials: true,
          }
        );

        await signInWithCustomToken(auth, response.data.customToken);
      } finally {
        setLoading(false);
      }
    };

    login();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("AUTH STATE CHANGED!");
      console.log(firebaseUser);
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
