import React, { useRef, useEffect, useState } from "react";
import "./Login.css";
import Loader from "../../components/Loader/Loader";
import Keyboard from "../../components/Keyboard/Keyboard";
import { SideMenuProps } from "../../types/CurrentModalType";
import { useKeyboardToggle } from "../../hooks/LoginHelper/useKeyboardToggle";
import { useUserForm } from "../../hooks/LoginHelper/useUserForm";
import { Button } from "../../components/Button";

const Login = ({ setActivePage }: SideMenuProps) => {
  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);

  const { user, loading, handleInputChange, handleSubmit } =
    useUserForm(setActivePage);
  // const { keyboardVisible, handleShowKeyboard } = useKeyboardToggle();

  const emailButtonRef = useRef<HTMLInputElement>(null);
  const passwordButtonRef = useRef<HTMLInputElement>(null);
  const rememberMeRef = useRef<HTMLInputElement>(null);
  const forgotPassRef = useRef<HTMLSpanElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const signUpAccountRef = useRef<HTMLSpanElement>(null);

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
      }

      console.log(col, row);
    };

    window.addEventListener("keydown", handleKeyNavigation);
    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [col, row]);

  useEffect(() => {
    console.log("Focusing:", { row, col });

    if (row === 0) {
      emailButtonRef.current?.focus();
    } else if (row === 1) {
      passwordButtonRef.current?.focus();
    } else if (row === 2) {
      if (col === 0) {
        rememberMeRef.current?.focus();
      } else {
        forgotPassRef.current?.focus();
      }
    } else if (row === 3) {
      loginButtonRef.current?.focus();
    } else if (row === 4) {
      signUpAccountRef.current?.focus();
    }
  }, [row, col]);

  return (
    <div className="login">
      {loading ? (
        <Loader />
      ) : (
        <div className="loginForm">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`forgot-password ${
                  row === 0 ? "focused-input" : ""
                }`}
                value={user.email}
                onChange={handleInputChange}
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
                id="password"
                className={`forgot-password ${
                  row === 1 ? "focused-input" : ""
                }`}
                value={user.password}
                onChange={handleInputChange}
                ref={passwordButtonRef}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex-row">
              <div
                className={`remember-me ${
                  row === 2 && col === 0 ? "focused" : ""
                }`}
              >
                <input type="radio" ref={rememberMeRef} />
                <label>Remember me </label>
              </div>
              <span
                className={`forgot-password ${
                  row === 2 && col === 1 ? "focused" : ""
                }`}
                ref={forgotPassRef}
              >
                Forgot password?
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              ref={loginButtonRef}
            >
              Log In
            </Button>
          </form>
          <p className="p">
            Don't have an account?{" "}
            <span
              className={`forgot-password ${row === 4 ? "focused" : ""}`}
              ref={signUpAccountRef}
            >
              Sign Up
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
