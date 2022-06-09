import React from "react";
import Hamburger from "./Hamburger";
import ShoppingCart from "./ShoppingCart";

function Header() {
  return (
    <nav className="navbar d-flex">
      <Hamburger />
      <div className="logo">Logo</div>
      <ShoppingCart />
    </nav>
  );
}

export default Header;
