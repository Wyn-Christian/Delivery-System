import { useState } from "react";

import Header from "../components/Header";
import { useUser } from "../contexts/User";
import { useFormik } from "formik";
import { Snackbar } from "@mui/material";

function Account() {
  const [hasErrors, setHasErrors] = useState(false);
  const { user } = useUser();

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
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      username: user.username,
      password: user.password,
      repassword: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <main>
      <Header title={"Account"} />
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

      <div className="account">
        <div className="pfp">
          <img
            src="img/no-profile-pic.jpg"
            style={{ width: "350px", borderRadius: "20px" }}
            alt="pic"
          />
        </div>

        <div className="information">
          <h1>My Profile</h1> <br />
          <h2>username</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="username"
              className="input"
              onChange={formik.handleChange}
              value={formik.values.username}
              disabled
            />
            <h2>First Name</h2>
            <input
              type="text"
              name="first_name"
              className="input"
              onChange={formik.handleChange}
              value={formik.values.first_name}
            />
            <h2>Last Name</h2>
            <input
              type="text"
              name="last_name"
              className="input"
              onChange={formik.handleChange}
              value={formik.values.last_name}
            />
            <h2>Email</h2>
            <input
              type="text"
              name="email"
              className="input"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <h2>Password</h2>
            <input
              type="password"
              name="password"
              className="input"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <h2>Re-enter Password</h2>
            <input
              type="password"
              name="repassword"
              className="input"
              onChange={formik.handleChange}
              value={formik.values.repassword}
            />

            <button type="submit" className="btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Account;
