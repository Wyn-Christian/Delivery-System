import { useTheme } from "@mui/material";
import { useUser } from "../contexts/User";

function Logout() {
  const theme = useTheme();
  const { logoutUser } = useUser();

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
        <button className="btn mt-3" onClick={logoutUser}>
          Log-out
        </button>
      </div>
    </main>
  );
}

export default Logout;
