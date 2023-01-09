import { Routes, Route } from "react-router-dom";

// COMPONENTS
import Sidebar from "./components/Sidebar";

// PAGES
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Products from "./pages/Products";
import Checkouts from "./pages/Checkouts";
// import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import { useNavPage } from "./contexts/NavPage";

import { ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./contexts/Theme";

function App() {
  const [theme, colorMode] = useMode();
  const { isNavHide } = useNavPage();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Sidebar />
          <section id="content" className={`${isNavHide ? "hide" : ""}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/products" element={<Products />} />
              <Route path="/checkouts" element={<Checkouts />} />
              {/* <Route path="/orders" element={<Orders />} /> */}

              <Route path="/account" element={<Account />} />
              <Route path="/logout" element={<Logout />} />

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </section>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
