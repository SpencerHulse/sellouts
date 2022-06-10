import React from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "./Hamburger";
import Auth from "../../../utils/auth";

function MobileNav() {
  return (
    <>
      {/* Hamburger and relevant options only appears when logged in */}
      {Auth.loggedIn() && <Hamburger />}
      <div className="logo">Logo</div>
      {!Auth.loggedIn() && (
        <NavLink to="/login" className="navbar-item">
          Login/Signup
        </NavLink>
      )}
    </>
  );
}

export default MobileNav;
