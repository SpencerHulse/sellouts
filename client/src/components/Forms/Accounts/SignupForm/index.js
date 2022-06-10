import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../../../graphql/mutations";
import Auth from "../../../../utils/auth";

function SignupForm() {
  const [addUser] = useMutation(ADD_USER);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          username: formState.username,
        },
      });

      if (mutationResponse.data.addUser.message) {
        setErrorMessage(mutationResponse.data.addUser.message);
        return;
      }

      const token = mutationResponse.data.addUser.token;
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
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="username"
            required
            className=""
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
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
            required
            className=""
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
      </div>

      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}

      <div>
        <button type="submit" className="">
          Sign up
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
