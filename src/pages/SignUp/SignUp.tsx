import { useEffect, useRef, useState } from "react";
import "./SignUp.css";
import { Button } from "../../components/Button";
import { SideMenuProps } from "../../types/CurrentModalType";
import { useUserForm } from "../../hooks/SignUpHelper/useUserForm";
import { useKeyboardNavigation } from "../../hooks/SignUpHelper/useKeyboardNavigation";

const SignUp = ({ setActivePage }: SideMenuProps) => {
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);
  const { user, handleChange, handleSubmit } = useUserForm(setActivePage);

  const emailButtonRef = useRef<HTMLInputElement>(null);
  const passwordButtonRef = useRef<HTMLInputElement>(null);
  const signupButtonRef = useRef<HTMLButtonElement>(null);
  const logInButtonRef = useRef<HTMLInputElement>(null);

  useKeyboardNavigation(row, col, setRow, setCol, setActivePage);

  useEffect(() => {
    if (row === 0) {
      emailButtonRef.current?.focus();
    } else if (row === 1) {
      passwordButtonRef.current?.focus();
    } else if (row === 2) {
      signupButtonRef.current?.focus();
    } else if (row === 3) {
      logInButtonRef.current?.focus();
    }
  }, [row, col]);

  return (
    <div className="signup">
      <div className="signUpForm">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              ref={emailButtonRef}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              ref={passwordButtonRef}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            ref={signupButtonRef}
          >
            Sign Up
          </Button>
        </form>
        <p className="p">
          Don't have an account?{" "}
          <span
            className={`forgot-password ${
              row === 3 ? "focused" : "not-focused"
            }`}
            ref={logInButtonRef}
          >
            Log In
          </span>
        </p>{" "}
      </div>
    </div>
  );
};

export default SignUp;
