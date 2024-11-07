import React, { useState, useRef, useCallback, useEffect } from "react";
import "./Login.css";
import Loader from "../../components/Loader/Loader";
import Keyboard from "../../components/Keyboard/Keyboard";
import usePost from "../../hooks/usePost";
import { Button } from "../../components/Button";

const Login = ({ setCurrentModal }: any) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState("");

  const emailButtonRef = useRef<HTMLInputElement>(null);
  const passwordButtonRef = useRef<HTMLInputElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const signUpAccountRef = useRef<HTMLAnchorElement>(null);

  const { logIn } = usePost();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await logIn("/", user);

    setUser({
      email: "",
      password: "",
    });
    setCurrentModal("home");
  };

  const handleKeyNavigation = useCallback((e: any) => {
    if (e.key === "ArrowDown") {
      if (document.activeElement === emailButtonRef.current) {
        passwordButtonRef.current?.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        loginButtonRef.current?.focus();
      } else if (document.activeElement === loginButtonRef.current) {
        signUpAccountRef.current?.focus();
      }
    } else if (e.key === "ArrowUp") {
      if (document.activeElement === signUpAccountRef.current) {
        loginButtonRef.current?.focus();
      } else if (document.activeElement === loginButtonRef.current) {
        passwordButtonRef.current?.focus();
      } else if (document.activeElement === passwordButtonRef.current) {
        emailButtonRef.current?.focus();
      }
    }
  }, []);

  const handleShowKeyboard = (e: any) => {
    if (e.key === "Enter") {
      if (document.activeElement === emailButtonRef.current) {
        setFocusedInput("email");
      } else if (document.activeElement === passwordButtonRef.current) {
        setFocusedInput("password");
      }
      setKeyboardVisible(true);
    }
    if (e.key === "Escape") {
      setKeyboardVisible(false);
    }
  };

  useEffect(() => {
    emailButtonRef.current?.focus();
    window.addEventListener("keydown", handleKeyNavigation);
    return () => {
      window.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [handleKeyNavigation]);

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
      <Keyboard
        show={keyboardVisible}
        onClose={() => setKeyboardVisible(false)}
        inputType={focusedInput}
      />
    </div>
  );
};

export default Login;
