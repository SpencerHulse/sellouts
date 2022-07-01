import { useState } from "react";
import { ToastContainer, ToastHeader, Toast } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_CATEGORY } from "../../../graphql/mutations";

function AddCategory() {
  const [show, setShow] = useState(false);
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

    if (!name) return;

    addCategory({ variables: { name: name } });
    setShow(true);

    setTimeout(function () {
      window.location.assign("/admin/categories");
    }, 1000);
  }

  return (
    <>
      <ToastContainer style={{ position: "fixed", top: 0, right: 0 }}>
        <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <ToastHeader className="justify-content-between me-2">
            <Toast.Body>Category successfully added!</Toast.Body>
          </ToastHeader>
        </Toast>
      </ToastContainer>
      <div>
        <div className="dialog">
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
    </>
  );
}

export default AddCategory;
