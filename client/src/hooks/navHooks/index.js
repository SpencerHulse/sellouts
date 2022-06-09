import { useState, useEffect } from "react";
/* Gets the window width */
function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}
/* Custom hook */
export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  /* Watches for screen resize to update the width */
  useEffect(() => {
    const handleResize = () => setWindowWidth(getWindowWidth());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
