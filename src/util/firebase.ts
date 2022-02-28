import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  inMemoryPersistence,
  getAuth,
  setPersistence,
  UserCredential,
  signInWithCustomToken,
} from "firebase/auth";

export const app = initializeApp({
  apiKey: "AIzaSyCsukUZtMkI5FD_etGfefO4Sr7fHkZM7Rg",
  authDomain: "hexlabs-cloud.firebaseapp.com",
});

const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence);

export const setCookie = async (userCredential: UserCredential) => {
  const idToken = await userCredential.user.getIdToken();

  try {
    await axios.post(
      "https://users.api.hexlabs.org/auth/login",
      {
        idToken,
      },
      { withCredentials: true }
    );

    const response = await axios.get(
      "https://users.api.hexlabs.org/auth/status",
      {
        withCredentials: true,
      }
    );

    signInWithCustomToken(auth, response.data.customToken);
  } catch (err: any) {
    console.log(err.message);
  }
};
