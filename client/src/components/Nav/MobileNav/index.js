import React from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "./Hamburger";
import Auth from "../../../utils/auth";
import { useWindowWidth } from "../../../hooks/navHooks";

function MobileNav() {
  const width = useWindowWidth();
  return (
    <>
      <div className="col-4 ps-5">
        {/* Hamburger and relevant options only appears when logged in */}
        {Auth.loggedIn() && <Hamburger />}
        <a href="/" className="hamburger-logo logo text-black">
          Sellouts
        </a>
        {!Auth.loggedIn() && (
          <div className="d-flex align-self-baseline">
            <NavLink
              to="/login"
              className="navbar-item text-black mobile-login-link"
            >
              {width > 600 ? "Login/Signup" : "Login"}
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

export default MobileNav;
