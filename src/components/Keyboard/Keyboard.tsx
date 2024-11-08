import keyboard from "../../assets/keyboard.png";
import { KeyboardType } from "../../types/KeyboardType";
import "./Keyboard.css";

const Keyboard = ({ show }: KeyboardType) => {
  if (!show) return null;

  return (
    <div className="keyboard-model">
      <img src={keyboard} alt="..." />
    </div>
  );
};

export default Keyboard;
