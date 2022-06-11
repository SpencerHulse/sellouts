import React from "react";
import { useDispatch } from "react-redux";
import { useCategories } from "../../hooks/categoryHooks";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { selectCategory } from "../../redux/features/categorySlice";

function FilterOptions() {
  const dispatch = useDispatch();
  const categoryData = useCategories();

  function categoryHandler() {
    const value = document.getElementById("categories").value;
    dispatch(selectCategory(value));
  }

  return (
    <div>
      <select
        name="categories"
        id="categories"
        onChange={() => categoryHandler()}
      >
        <option value="">Choose a Category</option>
        {categoryData.map((category) => (
          <option value={category.name} key={category._id}>
            {capitalizeFirstLetter(category.name)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterOptions;
