import React, { useCallback, useEffect, useRef, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import Keyboard from "../../components/Keyboard/Keyboard";
import { Button } from "../../components/Button";
import { SideMenuProps } from "../../types/CurrentModalType";
import { useUserForm } from "../../hooks/SignUpHelper/useUserForm";
import { useKeyboardNavigation } from "../../hooks/SignUpHelper/useKeyboardNavigation";
import { useKeyboardToggle } from "../../hooks/LoginHelper/useKeyboardToggle";

const SignUp = ({ setActivePage }: SideMenuProps) => {
  const { user, handleChange, handleSubmit } = useUserForm(setActivePage);
  const { keyboardVisible, handleShowKeyboard } = useKeyboardToggle();

  const emailButtonRef = useRef<HTMLInputElement>(null);
  const passwordButtonRef = useRef<HTMLInputElement>(null);
  const signupButtonRef = useRef<HTMLButtonElement>(null);
  const logInButtonRef = useRef<HTMLInputElement>(null);

  const { handleKeyNavigation } = useKeyboardNavigation({
    emailButtonRef,
    passwordButtonRef,
    signupButtonRef,
    logInButtonRef,
  });

  useEffect(() => {
    emailButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyNavigation);
    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, []);

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

          <Button type="submit" variant="primary" size="lg">
            Sign Up
          </Button>
        </form>
        <p className="p">
          Don't have an account? <span className="span">Log In</span>
        </p>
        {/* <link>Forgot Password?</link> */}
      </div>

      <Keyboard show={keyboardVisible} />
    </div>
  );
};

export default SignUp;
