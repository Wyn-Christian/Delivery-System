import { Routes, Route } from "react-router-dom";
import { useState } from "react";
// COMPONENTS
import Sidebar from "./components/Sidebar";

// PAGES
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Products from "./pages/Products";
import Checkouts from "./pages/Checkouts";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

import { ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./contexts/Theme";

function App() {
  const [isNavHide, setNavHide] = useState(true);
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Sidebar {...{ isNavHide, setNavHide }} />
          <section id="content" className={`${isNavHide ? "hide" : ""}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/products" element={<Products />} />
              <Route path="/checkouts" element={<Checkouts />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<Login {...{ setNavHide }} />} />
              <Route
                path="/register"
                element={<Register {...{ setNavHide }} />}
              />
              <Route path="/logout" element={<Logout {...{ setNavHide }} />} />
            </Routes>
          </section>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
