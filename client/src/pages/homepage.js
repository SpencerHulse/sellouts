import { Link, Outlet } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <h1>Welcome to the Homepage</h1>
      <p>Below is an outlet!</p>
      <Link to="/c1">Component One</Link> | <Link to="/c2">Component Two</Link>
      <Outlet />
    </>
  );
};

export default Homepage;
