import { useState } from "react";

export const useKeyboardToggle = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const toggleKeyboard = () => {
    setKeyboardVisible((prev) => !prev);
  };

  return { keyboardVisible, toggleKeyboard };
};
