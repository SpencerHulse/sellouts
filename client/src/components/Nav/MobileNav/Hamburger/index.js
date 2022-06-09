import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const hamburgerNavLinks = [
  "Admin",
  "Orders",
  "Account",
  "Signup/Login",
  "Logout",
];

function Hamburger() {
  function toggleNav() {
    document.body.classList.toggle("nav-open");
  }

  return (
    <div className="hamburger-container">
      <button
        className="nav-toggle"
        aria-label="toggle navigation"
        onClick={toggleNav}
      >
        <span className="hamburger"></span>
      </button>
      <div className="nav">
        <ul className="nav-list">
          {hamburgerNavLinks.map((navLink, index) => {
            return (
              <li key={index} onClick={toggleNav} className="nav-li">
                <Link to="/" className="nav-item">
                  {navLink}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Hamburger;
