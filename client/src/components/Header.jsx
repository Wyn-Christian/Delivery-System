import { Link } from "react-router-dom";
import { useNavPage } from "../contexts/NavPage";

function Header({ title }) {
  const [navPage, setNavPage] = useNavPage();

  return (
    <div className="head-title">
      <div className="left">
        <h1>{title}</h1>

        <ul className="breadcrumb">
          <li>
            <Link to="/" onClick={() => setNavPage("Dashboard")}>
              Home
            </Link>
          </li>
          {navPage !== "Dashboard" && (
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
          )}
          {navPage !== "Dashboard" && (
            <li>
              <Link
                to={`/${title.toLowerCase()}`}
                onClick={() => setNavPage(title)}
                className="active"
              >
                {title}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
