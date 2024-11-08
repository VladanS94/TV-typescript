import React, { useState, useRef, useCallback, useEffect } from "react";
import "./Login.css";
import Loader from "../../components/Loader/Loader";
import Keyboard from "../../components/Keyboard/Keyboard";
import { Button } from "../../components/Button";
import { SideMenuProps } from "../../types/CurrentModalType";
import { useUserForm } from "../../utils/LoginHelper/useUserForm";
import { useKeyboardToggle } from "../../utils/LoginHelper/useKeyboardToggle";
import { useKeyboardNavigation } from "../../utils/LoginHelper/useKeyboardNavigation";

const Login = ({ setCurrentModal }: SideMenuProps) => {
  const { user, error, loading, handleInputChange, handleSubmit } =
    useUserForm(setCurrentModal);
  const { keyboardVisible, handleShowKeyboard } = useKeyboardToggle();

  const emailButtonRef = useRef<HTMLInputElement>(null);
  const passwordButtonRef = useRef<HTMLInputElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const signUpAccountRef = useRef<HTMLAnchorElement>(null);

  const { handleKeyNavigation } = useKeyboardNavigation({
    emailButtonRef,
    passwordButtonRef,
    loginButtonRef,
    signUpAccountRef,
  });

  useEffect(() => {
    emailButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyNavigation);
    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, []);

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
                className="inputForm"
                value={user.email}
                onChange={handleInputChange}
                ref={emailButtonRef}
                onKeyDown={handleShowKeyboard}
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
                className="inputForm"
                value={user.password}
                onChange={handleInputChange}
                ref={passwordButtonRef}
                onKeyDown={handleShowKeyboard}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex-row">
              <div>
                <input type="radio" />
                <label>Remember me </label>
              </div>
              <span className="span">Forgot password?</span>
            </div>
            {error && (
              <h3 className="error-message" style={{ color: "red" }}>
                {error}
              </h3>
            )}
            <Button type="submit" variant="primary" size="lg">
              Log In
            </Button>
          </form>
          <p className="p">
            Don't have an account? <span className="span">Sign Up</span>
          </p>
          {/* <link>Forgot Password?</link> */}
        </div>
      )}
      <Keyboard show={keyboardVisible} />
    </div>
  );
};

export default Login;
