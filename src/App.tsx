import React, { useState } from "react";
import "./App.css";
import { Button } from "./components/Button";

function App() {
  const [name, setName] = useState("Vladan");
  return (
    <div className="App">
      <Button variant="error" size="md" onClick={() => setName("Andreja")}>
        Promeni Ime
      </Button>
      <p>{name}</p>
    </div>
  );
}

export default App;
