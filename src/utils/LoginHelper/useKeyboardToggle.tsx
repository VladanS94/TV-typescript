// hooks/useKeyboardToggle.ts
import { useState } from "react";

export const useKeyboardToggle = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");

  const handleShowKeyboard = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (document.activeElement?.id === "email") {
        setFocusedInput("email");
      } else if (document.activeElement?.id === "password") {
        setFocusedInput("password");
      }
      setKeyboardVisible(true);
    }
    if (e.key === "Escape") {
      setKeyboardVisible(false);
    }
  };

  return { keyboardVisible, focusedInput, handleShowKeyboard };
};
