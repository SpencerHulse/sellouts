import React from "react";
import MobileNav from "./MobileNav";
import ShoppingCart from "./ShoppingCart";
import { useWindowWidth } from "../../hooks/navHooks";
import Auth from "../../utils/auth";

function Header() {
  return (
    <nav className="navbar d-flex">
      {/* place non-mobile in null spot */}
      {useWindowWidth() < 768 ? <MobileNav /> : null}
      <ShoppingCart />
    </nav>
  );
}

export default Header;
