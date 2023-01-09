import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

const userInfo = [
  {
    id: "1",
    username: "John-Doe-Sheesh",
    first_name: "John",
    last_name: "Doe",
    birthday: "10/10/2002",
    email: "john.doe@sample.com",
    password: "sample",
  },
  {
    id: "2",
    username: "lance123",
    first_name: "Lance",
    last_name: "Lurance",
    birthday: "06/10/2002",
    email: "lancelurance@sample.com",
    password: "lance",
  },
];

// User Custom Hooks
export const useUserSource = () => {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

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
        }
        return result;
      });
  };

  return { user, setUser, loginUser };
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
