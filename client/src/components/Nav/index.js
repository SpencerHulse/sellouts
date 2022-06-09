import React, { useState, useEffect } from "react";
import MobileNav from "./MobileNav";
import ShoppingCart from "./ShoppingCart";
import Auth from "../../utils/auth";

function Header() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => setWindowWidth(getWindowWidth());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getWindowWidth() {
    const { innerWidth: width } = window;
    return width;
  }

  console.log(windowWidth);

  return (
    <nav className="navbar d-flex">
      {/* place non-mobile in null spot */}
      {windowWidth < 768 ? <MobileNav /> : null}
      <ShoppingCart />
    </nav>
  );
}

export default Header;
