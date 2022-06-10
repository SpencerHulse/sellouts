import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../../../utils/auth";
import "./style.css";

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
              <Link to="/" className="hamburger-item">
                Admin
              </Link>
            </li>
          )}
          <li onClick={toggleHamburger}>
            <Link to="/" className="hamburger-item">
              Orders
            </Link>
          </li>
          <li onClick={toggleHamburger}>
            <Link to="/" className="hamburger-item">
              Account
            </Link>
          </li>
          <li onClick={toggleHamburger}>
            <Link
              to="/"
              className="hamburger-item"
              onClick={() => Auth.logout()}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Hamburger;
