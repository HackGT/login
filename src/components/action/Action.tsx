import { getAuth, verifyPasswordResetCode } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { app } from "../../util/firebase";
import { handleLoginError } from "../../util/handleLoginError";
import Loading from "../../util/Loading";
import ChangePassword from "./ChangePassword";

const auth = getAuth(app);

const Action: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [actionComponent, setActionComponent] = useState(<Loading />);

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
        break;
      default:
        setActionComponent(<Navigate to="/login" />);
    }
  }, [mode, oobCode]);

  if (!mode || !oobCode) {
    return <Navigate to="/" />;
  }

  return actionComponent;
};

export default Action;
