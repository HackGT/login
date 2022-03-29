import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  inMemoryPersistence,
  getAuth,
  setPersistence,
  UserCredential,
  signInWithCustomToken,
} from "firebase/auth";
import { Location, NavigateFunction } from "react-router-dom";

export const app = initializeApp({
  apiKey: "AIzaSyCsukUZtMkI5FD_etGfefO4Sr7fHkZM7Rg",
  authDomain: "hexlabs-cloud.firebaseapp.com",
});

const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence);

export const setCookieAndRedirect = async (
  userCredential: UserCredential,
  navigate: NavigateFunction,
  location: Location
) => {
  const idToken = await userCredential.user.getIdToken();

  try {
    await axios.post(
      "https://auth.api.hexlabs.org/auth/login",
      {
        idToken,
      },
      { withCredentials: true }
    );

    const response = await axios.get(
      "https://auth.api.hexlabs.org/auth/status",
      {
        withCredentials: true,
      }
    );

    await signInWithCustomToken(auth, response.data.customToken);

    navigate(`/${location.search}`);
  } catch (err: any) {
    console.log(err.message);
  }
};
