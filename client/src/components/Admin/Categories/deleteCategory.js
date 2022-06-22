import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../../../graphql/mutations";
import { useCategories } from "../../../hooks/categoryHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";

function DeleteCategory() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const categories = useCategories();

  function handleSelect(event) {
    const { value } = event.target;
    setSelectedCategory(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedCategory) return;

    deleteCategory({ variables: { id: selectedCategory } });

    window.location.assign("/admin");
  }

  return (
    <>
      {categories && (
        <div className="fullpage bg-tint">
          <div className="container">
            <div className="row">
              <div className="mt-5 dialog">
                <form action="submit" onSubmit={handleSubmit}>
                  <div className="dialog-section">
                    <h2 className="fw-light">Categories</h2>
                    <p className="description">
                      Select the category you want to delete
                    </p>
                    <label htmlFor="category" className="d-none">
                      Category
                    </label>
                    <select
                      className="default-input"
                      name="category"
                      id="category"
                      required
                      onChange={handleSelect}
                    >
                      <option value="">Select a Category</option>
                      {categories.map((category) => (
                        <option value={category._id} key={category._id}>
                          {capitalizeFirstLetter(category.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="default-button button-filled">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteCategory;
