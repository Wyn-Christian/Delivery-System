import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

// GLOBAL CONTEXT
import { NavPageProvider } from "./contexts/NavPage";
import { UserProvider } from "./contexts/User";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <NavPageProvider>
          <CssBaseline />
          <App />
        </NavPageProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
