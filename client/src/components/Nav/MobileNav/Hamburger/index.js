import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Hamburger() {
  const navLinks = ["Admin", "Orders", "Account", "Logout"];

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
          {navLinks.map((navLink, index) => {
            return (
              <li key={index} onClick={toggleHamburger}>
                <Link to="/" className="hamburger-item">
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
