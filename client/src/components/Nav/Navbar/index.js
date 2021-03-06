import React from "react";
import { NavLink } from "react-router-dom";
import Auth from "../../../utils/auth";

function Navbar() {
  return (
    <>
      <div className="col-4 ps-5">
        <ul className="navbar-list d-flex justify-content-start">
          {Auth.loggedIn() && Auth.getProfile().data.admin && (
            <li className="navbar-li">
              <NavLink to="/admin/dashboard" className="navbar-item">
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
              <li className="navbar-li" onClick={() => Auth.logout()}>
                <div className="navbar-item logout">Logout</div>
              </li>
            </>
          ) : (
            <li className="navbar-li">
              <NavLink to="/login" className="navbar-item text-black">
                Login/Signup
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div>
        <a href="/" className="logo col-4 text-black">
          Sellouts
        </a>
      </div>
    </>
  );
}

export default Navbar;
