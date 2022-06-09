import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../../utils/auth";
import "./style.css";

function Navbar() {
  const navLinks = ["Admin", "Orders", "Account", "Logout", "Login/Signup"];
  return (
    <>
      <div>Logo</div>
      <ul className="navbar-list">
        {Auth.loggedIn() && Auth.getProfile().data.admin && (
          <li className="navbar-li">
            <Link to="/" className="navbar-item">
              {navLinks[0]}
            </Link>
          </li>
        )}
        {Auth.loggedIn() && (
          <>
            <li className="navbar-li">
              <Link to="/" className="navbar-item">
                {navLinks[1]}
              </Link>
            </li>
            <li className="navbar-li">
              <Link to="/" className="navbar-item">
                {navLinks[2]}
              </Link>
            </li>
            <li className="navbar-li">
              <Link to="/" className="navbar-item">
                {navLinks[3]}
              </Link>
            </li>
          </>
        )}
        <li className="navbar-li">
          <Link to="/" className="navbar-item">
            {navLinks[4]}
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
