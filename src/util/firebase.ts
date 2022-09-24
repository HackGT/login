import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  inMemoryPersistence,
  getAuth,
  setPersistence,
  UserCredential,
} from "firebase/auth";
import { Location, NavigateFunction } from "react-router-dom";

export const app = initializeApp({
  apiKey: "AIzaSyCsukUZtMkI5FD_etGfefO4Sr7fHkZM7Rg",
  authDomain: "auth.hexlabs.org",
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
    await axios.post("https://auth.api.hexlabs.org/auth/login", {
      idToken,
    });

    navigate(`/${location.search}`);
  } catch (err: any) {
    console.log(err.message);
  }
};
