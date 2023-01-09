import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

function Register() {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      repassword: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        <div className="text-login">Register Here</div>
        <form className="p-3 mt-3" onSubmit={formik.handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="first_name"
              id="FirstName"
              placeholder="First Name"
              // required
              onChange={formik.handleChange}
              value={formik.values.first_name}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="last_name"
              id="LastName"
              placeholder="Last Name"
              // required
              onChange={formik.handleChange}
              value={formik.values.last_name}
            />
          </div>

          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              // required
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="username"
              id="userName"
              placeholder="Username"
              // required
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              // required
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span id="StrengthDisp" className="badge displayBadge"></span>
          </div>
          <div className="form-field d-flex align-items-center">
            <input
              type="password"
              name="repassword"
              id="pass"
              placeholder="Re-type Password"
              // required
              onChange={formik.handleChange}
              value={formik.values.repassword}
            />
          </div>
          <button className="btn mt-3" type="submit">
            Register
          </button>
        </form>

        <div className="text-center fs-6">
          <br />
          Have an Account? <Link to="/login">Log in</Link> here
        </div>
      </div>
    </main>
  );
}

export default Register;
