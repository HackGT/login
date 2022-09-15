import { createStandaloneToast } from "@chakra-ui/react";

export const handleLoginError = (error: any) => {
  const toast = createStandaloneToast();
  let message = "";

  switch (error.code) {
    case "auth/user-disabled":
      message = "User account was disabled. Please contact support.";
      break;
    case "auth/user-not-found":
      message =
        "No user was found for this email. Please try again with a different email.";
      break;
    case "auth/wrong-password":
      message =
        "Wrong password entered. Please try again with a different email.";
      break;
    case "auth/account-exists-with-different-credential":
      message =
        "This user exists with a different login method. Please try again with a different method.";
      break;
    case "auth/popup-blocked":
      message = "Popup was blocked. Please allow popups and try again.";
      break;
    case "auth/weak-password":
      message =
        "Passwords must be at least 6 characters long. Please try again with a new password.";
      break;
    case "auth/expired-action-code":
      message = "This code has expired. Please request a new link.";
      break;
    case "auth/invalid-action-code":
      message = "This code is invalid. Please request a new link.";
      break;
    case "auth/email-already-in-use":
      message =
        "This email is already in use. Please try again with a different email.";
      break;
    case "auth/unauthorized-domain":
      message = "This domain is not authorized to login. Please try again.";
      break;
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return;
    default:
      message = "There was an unknown error. Please contact support";
      console.error(error);
      break;
  }

  toast({
    title: "Login Error",
    description: message,
    status: "error",
    duration: 7000,
    isClosable: true,
  });
};
