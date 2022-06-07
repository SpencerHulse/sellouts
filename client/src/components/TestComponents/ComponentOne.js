import { Link, Outlet } from "react-router-dom";

const ComponentOne = () => {
  return (
    <>
      <h2>Component One</h2>
      <Link to="/c1/nested">Nested</Link>
      <Outlet />
    </>
  );
};

export default ComponentOne;
