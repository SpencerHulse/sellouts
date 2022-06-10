import React from "react";
import { NavLink } from "react-router-dom";
import Auth from "../../../utils/auth";
import "./style.css";

function Navbar() {
  return (
    <>
      <div>Logo</div>
      <ul className="navbar-list">
        {Auth.loggedIn() && Auth.getProfile().data.admin && (
          <li className="navbar-li">
            <NavLink to="/admin" className="navbar-item">
              Admin
            </NavLink>
          </li>
        )}
        {Auth.loggedIn() ? (
          <>
            <li className="navbar-li">
              <NavLink to="/orders" className="navbar-item">
                Orders
              </NavLink>
            </li>
            <li className="navbar-li">
              <NavLink to="/account" className="navbar-item">
                Account
              </NavLink>
            </li>
            <li className="navbar-li" onClick={() => Auth.logout()}>
              <NavLink to="/" className="navbar-item">
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <li className="navbar-li">
            <NavLink to="/login" className="navbar-item">
              Login/Signup
            </NavLink>
          </li>
        )}
      </ul>
    </>
  );
}

export default Navbar;
