import React from "react";
import MobileNav from "./MobileNav";
import Navbar from "./Navbar";
import Cart from "../ShoppingCart/Cart";
import { useWindowWidth } from "../../hooks/navHooks";

function Header() {
  return (
    <nav className="navbar d-flex">
      <div className={useWindowWidth() < 768 ? "container nav-p" : "container"}>
        {/* place non-mobile in null spot */}
        {useWindowWidth() < 768 ? <MobileNav /> : <Navbar />}
        <div className="col-4 text-end">
          <Cart />
        </div>
      </div>
    </nav>
  );
}

export default Header;
