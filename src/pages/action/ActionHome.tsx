import { useToast } from "@chakra-ui/react";
import {
  applyActionCode,
  getAuth,
  verifyPasswordResetCode,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { app } from "../../util/firebase";
import { handleLoginError } from "../../util/handleLoginError";
import { LoadingScreen } from "@hex-labs/core";
import ChangePassword from "./ChangePassword";

const auth = getAuth(app);

const ActionHome: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [actionComponent, setActionComponent] = useState(<LoadingScreen />);
  const toast = useToast();

  const mode = searchParams.get("mode") || "";
  const oobCode = searchParams.get("oobCode") || "";

  useEffect(() => {
    // Handle the user management action
    switch (mode) {
      case "resetPassword":
        verifyPasswordResetCode(auth, oobCode)
          .then((email) => {
            setActionComponent(<ChangePassword oobCode={oobCode} />);
          })
          .catch((error) => {
            handleLoginError(error);
            setActionComponent(<Navigate to="/login" />);
          });
        break;
      case "recoverEmail":
        break;
      case "verifyEmail":
        applyActionCode(auth, oobCode)
          .then((email) => {
            toast({
              title: "Email Verified",
              description: "Your email was successfully verified.",
              status: "success",
              duration: 7000,
              isClosable: true,
            });
            setActionComponent(<Navigate to="/" />);
          })
          .catch((error) => {
            handleLoginError(error);
            setActionComponent(<Navigate to="/login" />);
          });
        break;
      default:
        setActionComponent(<Navigate to="/login" />);
    }
  }, [mode, oobCode, toast]);

  if (!mode || !oobCode) {
    return <Navigate to="/" />;
  }

  return actionComponent;
};

export default ActionHome;
