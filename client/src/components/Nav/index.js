import React from "react";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import Cart from "../ShoppingCart/Cart";
import { useWindowWidth } from "../../hooks/navHooks";

function Header() {
  return (
    <nav className="navbar d-flex">
      {/* place non-mobile in null spot */}
      {useWindowWidth() < 768 ? <MobileNav /> : <Navbar />}
      <Cart />
    </nav>
  );
}

export default Header;
