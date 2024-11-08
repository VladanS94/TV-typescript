import { useCallback } from "react";

export const useKeyboardNavigation = (refs: {
  emailButtonRef: React.RefObject<HTMLInputElement>;
  passwordButtonRef: React.RefObject<HTMLInputElement>;
  signupButtonRef: React.RefObject<HTMLButtonElement>;
  logInButtonRef: React.RefObject<HTMLInputElement>;
}) => {
  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent) => {
      const {
        emailButtonRef,
        passwordButtonRef,
        signupButtonRef,
        logInButtonRef,
      } = refs;

      if (e.key === "ArrowDown") {
        if (document.activeElement === emailButtonRef.current) {
          passwordButtonRef.current?.focus();
        } else if (document.activeElement === passwordButtonRef.current) {
          signupButtonRef.current?.focus();
        } else if (document.activeElement === signupButtonRef.current) {
          logInButtonRef.current?.focus();
        }
      } else if (e.key === "ArrowUp") {
        if (document.activeElement === signupButtonRef.current) {
          passwordButtonRef.current?.focus();
        } else if (document.activeElement === passwordButtonRef.current) {
          emailButtonRef.current?.focus();
        }
      }
    },
    [refs]
  );

  return { handleKeyNavigation };
};
