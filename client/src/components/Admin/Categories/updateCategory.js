import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CATEGORY } from "../../../graphql/mutations";
import { useCategories } from "../../../hooks/categoryHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";

function UpdateCategory() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formState, setFormState] = useState({ name: "" });
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const categories = useCategories();

  useEffect(() => {
    if (!selectedCategory) return;

    const categoryData = categories.filter(
      (category) => category._id === selectedCategory
    );

    document.getElementById("name").value = capitalizeFirstLetter(
      categoryData[0].name
    );
  }, [categories, selectedCategory]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  function handleSelect(event) {
    const { value } = event.target;
    setSelectedCategory(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { name } = formState;

    if (!name || !selectedCategory) return;

    updateCategory({ variables: { id: selectedCategory, name: name } });

    window.location.assign("/admin");
  }

  return (
    <>
      {formState && (
        <div>
          <div className="mt-5 dialog">
            <form action="submit" onSubmit={handleSubmit}>
              <div className="dialog-section">
                <h2 className="fw-light">Categories</h2>
                <p className="description">
                  Select the category you want to update
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
              <div className="dialog-section">
                <h2 className="fw-light">Name</h2>
                <p className="description">
                  A name for the category that will be displayed throughout
                  your online store
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
              <button className="default-button button-filled">
                Submit
              </button>
            </form>
          </div>
        </div>
      )
      }
    </>
  );
}

export default UpdateCategory;
