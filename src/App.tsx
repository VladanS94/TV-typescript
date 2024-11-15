import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";
import { activeToken } from "./state/atoms/tokenState";
import { useRecoilState } from "recoil";
import { activePageState } from "./state/atoms/activePageState";

function App() {
  const [token] = useRecoilState(activeToken);
  const [activePage, setActivePage] = useRecoilState(activePageState);

  useEffect(() => {
    if (!token) {
      setActivePage("login");
    }
  }, []);

  return (
    <div className="App">
      {activePage === "home" ? (
        <Home setActivePage={setActivePage} activePage={activePage} />
      ) : activePage === "login" ? (
        <Login setActivePage={setActivePage} activePage={activePage} />
      ) : (
        <SignUp setActivePage={setActivePage} activePage={activePage} />
      )}
    </div>
  );
}

export default App;
