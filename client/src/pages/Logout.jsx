import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/User";

function Logout({ setNavHide }) {
  const theme = useTheme();
  const { setUser } = useUser();
  const navigate = useNavigate();

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
        <div className="text-login">Logout?</div>
        <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
          Are you sure?
        </div>
        <button
          className="btn mt-3"
          onClick={() => {
            setUser(undefined);
            navigate("/login");
            setNavHide(true);
          }}
        >
          Log-out
        </button>
      </div>
    </main>
  );
}

export default Logout;
