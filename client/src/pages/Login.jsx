import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useUser } from "../contexts/User";

function Login() {
  const theme = useTheme();
  const { loginUser } = useUser();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  return (
    <main>
      <div className="wrapper">
        <div className="logo">
          <img
            src={
              theme.palette.mode === "light"
                ? "img/inventory.png"
                : "img/inventoryWhite.png"
            }
            alt="inventory-logo"
          />
        </div>
        <div className="text-login">Login Here </div>
        <form className="p-3 mt-3" onSubmit={formik.handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <button className="btn mt-3" type="submit">
            Log-In
          </button>
        </form>

        <div className="text-center fs-6">
          <br />
          No Account? <Link to="/register">sign up</Link> here
        </div>
      </div>
    </main>
  );
}

export default Login;
