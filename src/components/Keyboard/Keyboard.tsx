import keyboard from "../../assets/keyboard.png";
import "./Keyboard.css";

const Keyboard = ({ show }: any) => {
  if (!show) return null;

  return (
    <div className="keyboard-model">
      <img src={keyboard} alt="..." />
    </div>
  );
};

export default Keyboard;
