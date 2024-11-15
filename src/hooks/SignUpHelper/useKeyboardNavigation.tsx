import { useEffect } from "react";

export const useKeyboardNavigation = (
  row: number,
  col: number,
  setRow: React.Dispatch<React.SetStateAction<number>>,
  setCol: React.Dispatch<React.SetStateAction<number>>,
  setActivePage: (page: string) => void
) => {
  useEffect(() => {
    const handleKeyNavigation = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setRow((prevRow) => Math.min(prevRow + 1, 3));
      } else if (e.key === "ArrowUp") {
        setRow((prevRow) => Math.max(prevRow - 1, 0));
      } else if (e.key === "Enter" && row === 3) {
        setActivePage("login");
      }
    };

    window.addEventListener("keydown", handleKeyNavigation);
    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [col, row, setRow, setCol, setActivePage]);
};
