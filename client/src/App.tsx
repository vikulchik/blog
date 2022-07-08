import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App">
      <h1>Homepage</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default App;
