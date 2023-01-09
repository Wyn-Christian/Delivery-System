import { Snackbar, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";

function Register() {
  const theme = useTheme();
  const [hasErrors, setHasErrors] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setHasErrors(false);
  };

  const validate = (values) => {
    const errors = {};

    if (values.password !== values.repassword) {
      errors.password = "Password don't match!";
      setHasErrors(true);
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      repassword: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <main>
      {formik.errors.password ? (
        <Snackbar
          open={hasErrors}
          autoHideDuration={3000}
          onClose={handleClose}
          message={formik.errors.password}
          sx={{
            zIndex: "99999",
            "& .MuiSnackbarContent-message": {
              fontFamily: "Poppins !important",
              fontSize: "1rem",
            },
          }}
        />
      ) : null}

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
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
