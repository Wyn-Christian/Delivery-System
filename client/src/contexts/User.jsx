import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNavPage } from "../contexts/NavPage";

// User Custom Hooks
export const useUserSource = () => {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  const { setNavHide } = useNavPage();

  const loginUser = ({ username, password }) => {
    fetch("./mock/user.json")
      .then((res) => res.json())
      .then((result) => {
        let userDB = result.filter(
          (v) => v.username === username && v.password === password
        );
        if (userDB.length) {
          setUser(...userDB);
          navigate("/");
          setNavHide(false);
        }
        return result;
      });
  };

  const logoutUser = () => {
    setUser(undefined);
    navigate("/login");
    setNavHide(true);
  };

  return { user, setUser, loginUser, logoutUser };
};

export const UserContext = createContext({});
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={useUserSource()}>
      {children}
    </UserContext.Provider>
  );
};
