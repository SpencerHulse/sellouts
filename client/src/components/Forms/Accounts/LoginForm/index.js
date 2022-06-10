import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../../graphql/mutations";
import Auth from "../../../../utils/auth";

function LoginForm() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });

      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form className="" action="#" method="POST" onSubmit={handleFormSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div className="">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className=""
            placeholder="Email address"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className=""
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
      </div>

      {error && (
        <div>
          <p>The provided credentials are incorrect</p>
        </div>
      )}

      <div>
        <button type="submit" className="">
          Sign in
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
