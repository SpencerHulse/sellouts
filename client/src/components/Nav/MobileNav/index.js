import React from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "./Hamburger";
import Auth from "../../../utils/auth";

function MobileNav() {
  return (
    <>
      {/* Hamburger and relevant options only appears when logged in */}
      {Auth.loggedIn() && <Hamburger />}
      <NavLink to="/" className="hamburger-logo">
        Logo
      </NavLink>
      {!Auth.loggedIn() && (
        <NavLink to="/login" className="navbar-item">
          Login/Signup
        </NavLink>
      )}
    </>
  );
}

export default MobileNav;
