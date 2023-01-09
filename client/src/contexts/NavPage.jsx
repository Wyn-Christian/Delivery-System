import { useState, useContext, createContext } from "react";

function useNavPageSource() {
  const [navPage, setNavPage] = useState("Dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNavHide, setNavHide] = useState(true);

  return {
    navPage,
    setNavPage,
    isDarkMode,
    setIsDarkMode,
    isNavHide,
    setNavHide,
  };
}
const NavPageContext = createContext();
export const useNavPage = () => useContext(NavPageContext);

export function NavPageProvider({ children }) {
  return (
    <NavPageContext.Provider value={useNavPageSource()}>
      {children}
    </NavPageContext.Provider>
  );
}
