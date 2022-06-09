import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div>Login</div>
      <p>
        <Link to="/signup">Signup</Link> instead!
      </p>
    </>
  );
}

export default Login;
