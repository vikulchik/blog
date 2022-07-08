import React, { useState } from "react";
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
import { AuthContext } from "./context/auth.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function Main(): JSX.Element {
  const [authContext, setAuthContext] = useState(null);
  return <React.StrictMode>
    <AuthContext.Provider value={ { value: authContext, setAuthContext } }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <App /> } />
          <Route path="/register" element={ <Register /> } />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  </React.StrictMode>;
}

root.render(<Main />);

reportWebVitals();
