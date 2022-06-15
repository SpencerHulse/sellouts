import React from "react";
import { useDispatch } from "react-redux";
import { useCategories } from "../../hooks/categoryHooks";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { selectCategory } from "../../redux/features/categorySlice";

function FilterOptions() {
  const dispatch = useDispatch();
  const categoryData = useCategories();

  function categoryHandler(value) {
    // const value = document.getElementById("categories").value;
    dispatch(selectCategory(value));
  }

  return (
    <div>

      <div className="new-dropdown">
        <button className="dropdown-button">Category</button>
        <div className="dropdown-content">
        {categoryData.map((category) => (
          <div className="dd-item" onClick={() => categoryHandler(category.name)}>{category.name}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default FilterOptions;
