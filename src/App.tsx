import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";
import { useLocalStorage } from "react-use";

function App() {
  const [currentModal, setCurrentModal] = useState("login");
  const [token] = useLocalStorage("token", null);

  useEffect(() => {
    if (token) {
      setCurrentModal("home");
    }
  }, [token]);
  return (
    <div className="App">
      {currentModal === "home" ? (
        <Home setCurrentModal={setCurrentModal} />
      ) : (
        <Login setCurrentModal={setCurrentModal} />
      )}

      {currentModal === "sign-up" && (
        <SignUp setCurrentModal={setCurrentModal} />
      )}
    </div>
  );
}

export default App;
