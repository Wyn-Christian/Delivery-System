import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNavPage } from "../contexts/NavPage";

import axios from "axios";

// User Custom Hooks
export const useUserSource = () => {
  const [user, setUser] = useState({
    id: "63c696af30257e3cc3447a27",
    username: "admin",
    first_name: "Admin",
    last_name: "Sample",
    email: "admin@sample.com",
    password: "1234",
  });
  const [inventories, setInventories] = useState([]);

  const navigate = useNavigate();
  const { setNavHide } = useNavPage();

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/catalog/inventories/${user.id}`)
        .then((result) => {
          setInventories(result.data.list_inventories);
        });
    }
  }, [user]);

  const loginUser = ({ username, password }) => {
    axios
      .post("http://localhost:5000/users/login", { username, password })
      .then((result) => {
        console.log(result.data);
        let userDB = result.data;
        if (userDB) {
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

  return {
    user,
    setUser,
    loginUser,
    logoutUser,
    inventories,
    setInventories,
  };
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
