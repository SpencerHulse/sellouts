import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY } from "../../../graphql/mutations";

function AddCategory() {
  const [formState, setFormState] = useState({ name: "" });
  const [addCategory] = useMutation(ADD_CATEGORY);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { name } = formState;

    if (name) {
      addCategory({ variables: { name: name } });
    }

    window.location.assign("/admin");
  }

  return (
    <div className="fullpage bg-tint">
      <div className="container">
        <div className="row">
          <div className="mt-5 dialog">
            <form action="submit" onSubmit={handleSubmit}>
              <div className="dialog-section">
                <h2 className="fw-light">Name</h2>
                <p className="description">
                  A name for the category that will be displayed throughout your
                  online store
                </p>
                <label htmlFor="name" className="d-none">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Category Name"
                  className="default-input"
                  onChange={handleChange}
                />
              </div>
              <button className="default-button button-filled">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
