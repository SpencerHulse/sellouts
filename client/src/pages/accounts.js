import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Forms/Accounts/LoginForm";
import SignupForm from "../components/Forms/Accounts/SignupForm";

function Login({ formType }) {
  return (
    <div>
      <div>
        <h2>
          {formType === "login"
            ? "Sign in to your account"
            : "Sign up for an account"}
        </h2>
        <p>
          Or{" "}
          <Link to={formType === "login" ? "/signup" : "/login"}>
            {formType === "login" ? "join today" : "login now"}
          </Link>
          !
        </p>
      </div>
      {formType === "login" ? <LoginForm /> : <SignupForm />}
    </div>
  );
}

export default Login;
