// hooks/useKeyboardNavigation.ts
import { useCallback } from "react";

export const useKeyboardNavigation = (refs: {
  emailButtonRef: React.RefObject<HTMLInputElement>;
  passwordButtonRef: React.RefObject<HTMLInputElement>;
  loginButtonRef: React.RefObject<HTMLButtonElement>;
  signUpAccountRef: React.RefObject<HTMLAnchorElement>;
}) => {
  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent) => {
      const {
        emailButtonRef,
        passwordButtonRef,
        loginButtonRef,
        signUpAccountRef,
      } = refs;

      if (e.key === "ArrowDown") {
        if (document.activeElement === emailButtonRef.current) {
          passwordButtonRef.current?.focus();
        } else if (document.activeElement === passwordButtonRef.current) {
          loginButtonRef.current?.focus();
        } else if (document.activeElement === loginButtonRef.current) {
          signUpAccountRef.current?.focus();
        }
      } else if (e.key === "ArrowUp") {
        if (document.activeElement === signUpAccountRef.current) {
          loginButtonRef.current?.focus();
        } else if (document.activeElement === loginButtonRef.current) {
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
