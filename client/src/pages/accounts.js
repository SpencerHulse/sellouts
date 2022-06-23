import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Accounts/LoginForm";
import SignupForm from "../components/Accounts/SignupForm";
import { loggedInRedirect } from "../utils/helpers";

function Login({ formType }) {
  loggedInRedirect();
  return (
    <div className="bg-tint fullpage row m-0">
      <div className="text-center col p-0">
        <h1 className="m-5">Welcome to Sellouts!</h1>
        <div className="bg-white pt-5 pb-5 account-mid">
          <h2 className="fw-light mb-3">
            {formType === "login" ? "Sign In" : "Sign Up"}
          </h2>
          <p className="mb-5">
            Or{" "}
            <Link
              className="login-switch"
              to={formType === "login" ? "/signup" : "/login"}
            >
              {formType === "login" ? "join today" : "login now"}
            </Link>
            !
          </p>
          {formType === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}

export default Login;
