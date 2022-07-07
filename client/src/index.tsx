import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Register } from "./pages/register/register.component";
import "./settings/api.request.middleware";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
