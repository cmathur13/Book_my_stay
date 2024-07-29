import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getCapitalizedString } from "../../utils/utils";

const Navbar = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [showNavButtons, setShowNavButtons] = useState(true);

  useEffect(() => {
    if (path === "register" || path === "login") {
      setShowNavButtons(false);
    }
  }, [path]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="link">
          <span className="logo">BookMyStay</span>
        </Link>
        {showNavButtons &&
          (user ? (
            <div className="navItems">
              <div> Hello, {getCapitalizedString(user.username)}</div>
              <Link to="/" className="link">
                <button className="navButton" onClick={handleLogout}>
                  Logout
                </button>
              </Link>
            </div>
          ) : (
            <div className="navItems">
              <Link to="/register" className="link">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login" className="link">
                <button className="navButton">Login</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
