import { useCallback, useState } from "react";

export const useKeyboardNavigation = (refs: {
  emailButtonRef: React.RefObject<HTMLInputElement>;
  passwordButtonRef: React.RefObject<HTMLInputElement>;
  loginButtonRef: React.RefObject<HTMLButtonElement>;
  signUpAccountRef: React.RefObject<HTMLAnchorElement>;
}) => {
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);

  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent) => {
      const {
        emailButtonRef,
        passwordButtonRef,
        loginButtonRef,
        signUpAccountRef,
      } = refs;
    emailButtonRef.current?.focus();

      if (e.key === "ArrowDown") {
        setRow((prevRow) => Math.min(prevRow + 1, 4));
        if (row === 0) {
        } else if (row === 1) {
          passwordButtonRef.current?.focus();
        } else if (row === 2) {
          loginButtonRef.current?.focus();
        } else if (row === 3) {
          signUpAccountRef.current?.focus();
        }

        // Set `col` to 0 or 1 depending on the row and the current column value
        if (row === 3) {
          setCol(col === 0 ? 1 : 0); // Toggle `col` between 0 and 1 for row 3
        }
      } else if (e.key === "ArrowUp") {
        setRow((prevRow) => Math.max(prevRow - 1, 0)); // Limit row to min 0

        if (row === 4) {
          signUpAccountRef.current?.focus();
        } else if (row === 3) {
          loginButtonRef.current?.focus();
        } else if (row === 2) {
          passwordButtonRef.current?.focus();
        } else if (row === 1) {
          emailButtonRef.current?.focus();
        }
      }
    },
    [refs, row, col]
  );

  console.log(row, col);

  return { handleKeyNavigation, col, row };
};
