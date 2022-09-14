import { Button, createIcon } from "@chakra-ui/react";
import { getAuth, SAMLAuthProvider, signInWithRedirect } from "firebase/auth";
import { app } from "../../util/firebase";
import { handleLoginError } from "../../util/handleLoginError";

const GeorgiaTechIcon = createIcon({
  displayName: "GeorgiaTechIcon",
  viewBox: "0 0 32 19",
  path: (
    <path
      fill="#b2a268"
      d="M12,6v4.67h2.51l.26-1.42h1.13c-.41,2.16-2.54,3.64-5.24,3.64a5.24,5.24,0,0,1-.56,0,7.49,7.49,0,0,1-3.87-1.35A4,4,0,0,1,4.53,8.29,4.79,4.79,0,0,1,6.18,4.7,6.11,6.11,0,0,1,10,3.22h.27A7.84,7.84,0,0,1,15.09,5l.1.08a.39.39,0,0,1,.1.08l0,0h2.88v-5H15.29V1.58A11.17,11.17,0,0,0,9.49,0h0A10.1,10.1,0,0,0,2.31,3,7.55,7.55,0,0,0,0,8.32a6.93,6.93,0,0,0,2.76,5.32A10,10,0,0,0,9,15.76a7.86,7.86,0,0,0,.84,0,15,15,0,0,0,5.67-1.46v.63h3.1V9.28h1.07v6.5H18.05V18.7h7.21V15.78H23.65V9.28h3.66l.25,1.42h2.52V6ZM9.49.14Z"
    />
  ),
});

const auth = getAuth(app);

const GeorgiaTechProvider: React.FC<any> = (props) => {
  const provider = new SAMLAuthProvider("saml.georgia-tech-login");

  const login = () => {
    signInWithRedirect(auth, provider).catch((error) => {
      handleLoginError(error);
    });
  };

  return (
    <Button m="2" onClick={login} {...props}>
      Sign in with Georgia Tech
      <GeorgiaTechIcon ml="1.5" />
    </Button>
  );
};

export default GeorgiaTechProvider;
