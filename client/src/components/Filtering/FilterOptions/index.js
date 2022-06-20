import React from "react";
import ReactStars from "react-stars";
import { useDispatch } from "react-redux";
import { useCategories } from "../../../hooks/categoryHooks";
import { capitalizeFirstLetter } from "../../../utils/helpers";
import { selectCategory } from "../../../redux/features/categorySlice";
import {
  selectSaleOption,
  selectPriceOption,
  selectRatingOption,
} from "../../../redux/features/filterSlice";

function FilterOptions() {
  const dispatch = useDispatch();
  const categoryData = useCategories();

  const saleOptions = ["yes", "no"];
  const priceOptions = [50, 100, 200];
  const ratingOptions = [4, 3, 2, 1];

  function clearSelections() {
    dispatch(selectCategory(""));
    dispatch(selectSaleOption(""));
    dispatch(selectPriceOption(""));
    dispatch(selectRatingOption(""));
  }

  return (
    <div>
      <div className="new-dropdown me-2 mt-sm-2 mt-md-0">
        <button className="dropdown-button">Category</button>
        <div className="dropdown-content">
          {categoryData.map((category) => (
            <div
              className="dd-item"
              key={category._id}
              onClick={() => dispatch(selectCategory(category.name))}
            >
              {capitalizeFirstLetter(category.name)}
            </div>
          ))}
        </div>
      </div>
      <div className="new-dropdown  me-2 mt-sm-2">
        <button className="dropdown-button">Price</button>
        <div className="dropdown-content">
          <div
            className="dd-item"
            onClick={() => dispatch(selectPriceOption(25))}
          >
            ${0} to ${25}
          </div>
          {priceOptions.map((option, index) => (
            <div
              className="dd-item"
              key={"priceOption" + index}
              onClick={() => dispatch(selectPriceOption(option))}
            >
              ${option / 2} to ${option}
            </div>
          ))}
          <div
            className="dd-item"
            onClick={() =>
              dispatch(
                selectPriceOption(priceOptions[priceOptions.length - 1] + 1)
              )
            }
          >
            Over ${priceOptions[priceOptions.length - 1]}
          </div>
        </div>
      </div>
      <div className="new-dropdown me-2 mt-sm-2">
        <button className="dropdown-button">Minimum Rating</button>
        <div className="dropdown-content">
          {ratingOptions.map((option, index) => (
            <div
              className="dd-item"
              key={"ratingOptions" + index}
              onClick={() => dispatch(selectRatingOption(option))}
            >
              <ReactStars
                count={5}
                size={20}
                value={option}
                edit={false}
                color2={"#7f60db"}
                color1={"rgba(0, 0, 0, 0.19)"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="new-dropdown">
        <button className="dropdown-button">Promotions Only</button>
        <div className="dropdown-content">
          {saleOptions.map((option, index) => (
            <div
              className="dd-item"
              key={"saleOption" + index}
              onClick={() => dispatch(selectSaleOption({ option }))}
            >
              {capitalizeFirstLetter(option)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterOptions;
