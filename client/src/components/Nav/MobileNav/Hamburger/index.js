import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../../../utils/auth";

function Hamburger() {
  function toggleHamburger() {
    document.body.classList.toggle("hamburger-open");
  }

  return (
    <div className="hamburger-container">
      <button
        className="hamburger-toggle"
        aria-label="toggle navigation"
        onClick={toggleHamburger}
      >
        <span className="hamburger"></span>
      </button>
      <div className="hamburger-nav">
        <ul className="hamburger-list">
          {Auth.getProfile().data.admin && (
            <li onClick={toggleHamburger}>
              <Link to="/admin/dashboard" className="hamburger-item">
                Admin
              </Link>
            </li>
          )}
          <li onClick={toggleHamburger}>
            <Link to="/orders" className="hamburger-item">
              Orders
            </Link>
          </li>
          <li onClick={toggleHamburger}>
            <div
              className="hamburger-item logout"
              onClick={() => Auth.logout()}
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Hamburger;
