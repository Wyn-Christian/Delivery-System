import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavPage } from "../contexts/NavPage";
import { useEffect, useContext } from "react";
import { ColorModeContext } from "../contexts/Theme";
import { useUser } from "../contexts/User";

const NavItem = ({ title, icon, to, selected, setSelected }) => {
  const [navPage, setNavPage] = useNavPage();

  let classnames = [];
  if (title === "Logout") {
    classnames.push("logout");
  }

  return (
    <li className={navPage === title ? "active" : undefined}>
      <NavLink
        to={to}
        className={() => {
          return classnames.join(" ");
        }}
        onClick={() => setNavPage(title)}
      >
        <i className={`bx bxs-${icon}`} />
        <span className="text">{title}</span>
      </NavLink>
    </li>
  );
};

function Sidebar({ isNavHide, setNavHide }) {
  const colorMode = useContext(ColorModeContext);
  const { user, setUser } = useUser();

  useEffect(() => console.log(user), [user]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    isDarkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div>
      <section id="sidebar" className={isNavHide ? "hide" : ""}>
        <NavLink to="/" className="brand">
          {isDarkMode ? (
            <img src="img/logow.png" alt="" />
          ) : (
            <img src="img/logo.png" alt="" />
          )}
        </NavLink>
        {user && (
          <ul className="side-menu top">
            <NavItem title="Dashboard" to="/" icon="dashboard" />
            <NavItem title="Inventory" to="/inventory" icon="layer" />
            <NavItem title="Products" to="/products" icon="cake" />
            <NavItem title="Checkouts" to="/checkouts" icon="cart" />
            <NavItem title="Orders" to="/orders" icon="package" />
          </ul>
        )}
        {user && (
          <ul className="side-menu">
            <NavItem title="Account" to="/account" icon="user" />
            <NavItem title="Logout" to="/logout" icon="log-out-circle" />
          </ul>
        )}
        {!user && (
          <ul className="side-menu">
            <NavItem title="Login" to="/login" icon="log-in-circle" />
            <NavItem title="Register" to="/register" icon="user-plus" />
          </ul>
        )}
      </section>

      <section id="content">
        <nav>
          <i className="bx bx-menu" onClick={() => setNavHide(!isNavHide)} />

          <form action="/">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="bx bx-search" />
              </button>
            </div>
          </form>
          <input
            type="checkbox"
            id="switch-mode"
            hidden
            onChange={() => {
              setIsDarkMode(!isDarkMode);
              colorMode.toggleColorMode();
            }}
          />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <NavLink to="/" className="profile">
            <img src="img/no-profile-pic.jpg" alt="pic" />
          </NavLink>
        </nav>
      </section>
    </div>
  );
}

export default Sidebar;
