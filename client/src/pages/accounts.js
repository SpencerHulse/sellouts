import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Forms/Accounts/LoginForm";
import SignupForm from "../components/Forms/Accounts/SignupForm";
import { loggedInRedirect } from "../utils/helpers";

function Login({ formType }) {
  loggedInRedirect();
  return (
    <div className="bg-tint fullpage row">
      <div className="text-center col">
        <h1 className="m-5">Welcome to Sellouts!</h1>
        <div className="bg-white pt-5 pb-5">
          <h2 className="fw-light mb-3">
            {formType === "login"
              ? "Sign In"
              : "Sign Up"}
          </h2>
          <p className="mb-5">
            Or{" "}
            <Link className="login-switch" to={formType === "login" ? "/signup" : "/login"}>
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
