import React, { useContext, createContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../util/firebase";
import axios from "axios";

export type User = FirebaseUser;

export type Profile = {
  userId: string;
  email: string;
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phoneNumber?: string;
  resume?: string;
  roles?: {
    admin: boolean
    exec: boolean
    member: boolean
  }
};

const initialState = {
  user: null,
  profile: null,
  validProfile: false,
  loading: true,
  refetchProfile: () => {
    return Promise.resolve();
  },
};

const AuthContext = createContext<{
  /**
   * The current user object as provided by Firebase Authentication. Will be null when not logged in.
   */
  user: User | null;
  /**
   * The user's profile provided by API. Will be null when not logged in.
   */
  profile: Profile | null;
  /**
   * Determines if a user's profile is valid (ie. has all required fields). If not valid, the login page
   * will not redirect back to the application and will require a user to complete his profile.
   */
  validProfile: boolean;
  /**
   * Is true if the browser is currently fetching information. Used to show a loading spinner.
   */
  loading: boolean;
  /**
   * When updating the profile, call this method to refetch the profile across the application.
   */
  refetchProfile: () => Promise<void>;
}>(initialState);
const auth = getAuth(app);

export function useAuth() {
  return useContext(AuthContext);
}

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [validProfile, setValidProfile] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState(true);
  const [authStateLoading, setAuthStateLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.get(
          "https://auth.api.hexlabs.org/auth/status"
        );

        await signInWithCustomToken(auth, response.data.customToken);
        setProfile(response.data.profile);
        setValidProfile(response.data.validProfile);
      } finally {
        setLoginLoading(false);
      }
    };

    login();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthStateLoading(true);
      console.log("AUTH STATE CHANGED!");
      console.log(firebaseUser);
      setUser(firebaseUser);

      if (firebaseUser) {
        if (!profile) {
          // Manually create and send token as at this point, the session cookie may not be set
          const token = await firebaseUser.getIdToken();
          const response = await axios.get(
            "https://auth.api.hexlabs.org/auth/status",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setProfile(response.data.profile);
          setValidProfile(response.data.validProfile);
        }
      } else {
        setProfile(null);
        setValidProfile(false);
      }

      setAuthStateLoading(false);
    });

    return unsubscribe;
  }, []);

  const refetchProfile = async () => {
    setAuthStateLoading(true);

    const response = await axios.get(
      "https://auth.api.hexlabs.org/auth/status"
    );

    setProfile(response.data.profile);
    setValidProfile(response.data.validProfile);

    setAuthStateLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        validProfile,
        loading: authStateLoading || loginLoading,
        refetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
