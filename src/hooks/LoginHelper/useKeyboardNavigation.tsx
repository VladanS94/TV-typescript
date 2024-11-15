import { useEffect } from "react";

export const useKeyboardNavigation = (
  row: number,
  col: number,
  setRow: React.Dispatch<React.SetStateAction<number>>,
  setCol: React.Dispatch<React.SetStateAction<number>>,
  setActivePage: (page: string) => void,
  rememberMeRef: React.RefObject<HTMLInputElement>
) => {
  useEffect(() => {
    const handleKeyNavigation = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setRow((prevRow) => Math.min(prevRow + 1, 4));
      } else if (e.key === "ArrowUp") {
        setRow((prevRow) => Math.max(prevRow - 1, 0));
      } else if (e.key === "ArrowRight" && row === 2) {
        setCol((prevCol) => Math.min(prevCol + 1, 1));
      } else if (e.key === "ArrowLeft" && row === 2) {
        setCol((prevCol) => Math.max(prevCol - 1, 0));
      } else if (e.key === "Enter" && row === 2 && col === 0) {
        const rememberMeInput = rememberMeRef.current;
        if (rememberMeInput) {
          rememberMeInput.checked = !rememberMeInput.checked;
        }
      } else if (e.key === "Enter" && row === 4) {
        setActivePage("signUp");
      }
    };

    window.addEventListener("keydown", handleKeyNavigation);
    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [col, row, setRow, setCol, setActivePage, rememberMeRef]);
};
