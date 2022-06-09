import React from "react";
import Hamburger from "./Hamburger";
import Auth from "../../../utils/auth";

function MobileNav() {
  return (
    <>
      {/* Hamburger and relevant options only appears when logged in */}
      {Auth.loggedIn() && <Hamburger />}
      <div className="logo">Logo</div>
      {!Auth.loggedIn() && <div>Login/Signup</div>}
    </>
  );
}

export default MobileNav;
