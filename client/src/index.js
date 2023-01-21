import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

// GLOBAL CONTEXT
import { NavPageProvider } from "./contexts/NavPage";
import { UserProvider } from "./contexts/User";
import { PortsProvider } from "./contexts/Ports";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PortsProvider>
        <NavPageProvider>
          <UserProvider>
            <CssBaseline />
            <App />
          </UserProvider>
        </NavPageProvider>
      </PortsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
