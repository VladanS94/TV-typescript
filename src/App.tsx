import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";
import { useLocalStorage } from "react-use";

function App() {
  const [currentModal, setCurrentModal] = useState("login");
  const [activeMenuItem] = useState(0);

  const [token] = useLocalStorage("token", null);

  useEffect(() => {
    if (token) {
      setCurrentModal("home");
    }
  }, [token]);
  return (
    <div className="App">
      {currentModal === "home" ? (
        <Home
          setCurrentModal={setCurrentModal}
          activeMenuItem={activeMenuItem}
        />
      ) : (
        <SignUp
          setCurrentModal={setCurrentModal}
          activeMenuItem={activeMenuItem}
        />
      )}

      {currentModal === "sign-up" && (
        <SignUp
          setCurrentModal={setCurrentModal}
          activeMenuItem={activeMenuItem}
        />
      )}
    </div>
  );
}

export default App;
