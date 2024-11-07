import React, { useCallback, useEffect, useRef, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import Keyboard from "../../components/Keyboard/Keyboard";
import { Button } from "../../components/Button";

const SignUp = ({ setCurrentModal }: any) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const emailButtonRef = useRef<HTMLInputElement>(null);
  const passwordButtonRef = useRef<HTMLInputElement>(null);
  const signupButtonRef = useRef<HTMLButtonElement>(null);
  const logInButtonRef = useRef<HTMLInputElement>(null);

  const handleKeyNavigation = useCallback((e: any) => {
    if (e.key === "ArrowDown") {
      if (document.activeElement === emailButtonRef.current) {
        passwordButtonRef.current?.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        signupButtonRef.current?.focus();
      } else if (document.activeElement === signupButtonRef.current) {
        logInButtonRef.current?.focus();
      }
    } else if (e.key === "ArrowUp") {
      if (document.activeElement === signupButtonRef.current) {
        passwordButtonRef.current?.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        emailButtonRef.current?.focus();
      }
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (user.email && user.password) {
      const users = JSON.parse(localStorage.getItem("User") || "[]");

      const newUser = {
        id: users.length + 1,
        email: user.email,
        password: user.password,
      };

      users.push(newUser);

      localStorage.setItem("User", JSON.stringify(users));

      alert("Sign up successful! User stored in local storage.");

      setUser({
        email: "",
        password: "",
      });
    } else {
      alert("Please fill out both fields.");
    }
    setCurrentModal("login");
  };

  useEffect(() => {
    emailButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyNavigation);

    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [handleKeyNavigation]);

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

          {/* {error && (
            <h3 className="error-message" style={{ color: "red" }}>
              {error}
            </h3>
          )} */}
          <Button type="submit" variant="primary" size="lg">
            Sign Up
          </Button>
        </form>
        <p className="p">
          Don't have an account? <span className="span">Log In</span>
        </p>
        {/* <link>Forgot Password?</link> */}
      </div>

      {/* <Keyboard
  show={keyboardVisible}
  onClose={() => setKeyboardVisible(false)}
  inputType={focusedInput}
/> */}
    </div>
  );
};

export default SignUp;
