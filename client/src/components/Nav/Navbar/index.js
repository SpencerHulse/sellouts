import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../navLinks";
// import Auth from "../../utils/auth";

function Navbar() {
  return (
    <>
      <div>Logo</div>
      {navLinks.map((navLink, index) => {
        return (
          <li key={index} className="">
            <Link to="/" className="">
              {navLink}
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default Navbar;
