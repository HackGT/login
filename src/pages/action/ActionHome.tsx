import { useToast } from "@chakra-ui/react";
import {
  applyActionCode,
  getAuth,
  verifyPasswordResetCode,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, resolvePath, useSearchParams } from "react-router-dom";
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
  const continueUrl = searchParams.get("continueUrl") || "";

  useEffect(() => {
    // Handle the user management action
    switch (mode) {
      case "resetPassword":
        verifyPasswordResetCode(auth, oobCode)
          .then(() => {
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
          .then(() => {
            toast({
              title: "Email Verified",
              description: "Your email was successfully verified.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });

            // If continue url, get search params and redirect back to base
            if (continueUrl) {
              setActionComponent(
                <Navigate to={`/${resolvePath(continueUrl).search}`} />
              );
            } else {
              setActionComponent(<Navigate to="/" />);
            }
          })
          .catch((error) => {
            handleLoginError(error);
            setActionComponent(<Navigate to="/login" />);
          });
        break;
      default:
        setActionComponent(<Navigate to="/login" />);
    }
  }, [mode, oobCode, continueUrl, toast]);

  if (!mode || !oobCode) {
    return <Navigate to="/" />;
  }

  return actionComponent;
};

export default ActionHome;
