import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <>
      <div>Signup</div>
      <p>
        <Link to="/login">Login</Link> instead!
      </p>
    </>
  );
}

export default Signup;
