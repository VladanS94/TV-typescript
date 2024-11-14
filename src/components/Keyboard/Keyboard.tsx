import keyboard from "../../assets/keyboard.png";
import "./Keyboard.css";

interface KeyboardType {
  show: true | false;
}

const Keyboard = ({ show }: KeyboardType) => {
  if (!show) return null;

  return (
    <div className="keyboard-model">
      <img src={keyboard} alt="..." />
    </div>
  );
};

export default Keyboard;
