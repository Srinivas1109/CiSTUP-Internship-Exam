import { useState } from "react";
import "./styles/App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <div className="card">
        <Home />
      </div>
    </div>
  );
}

export default App;
