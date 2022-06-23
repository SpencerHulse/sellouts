import { useState } from "react";
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

function MobileFilterOptions() {
  const dispatch = useDispatch();
  const categoryData = useCategories();

  const [dropdown, setDropdown] = useState({ menu: false });

  const saleOptions = ["yes", "no"];
  const priceOptions = [50, 100, 200];
  const ratingOptions = [4, 3, 2, 1];

  return (
    <div
      className="my-2 d-flex flex-column"
      onMouseLeave={() => setDropdown({ menu: false })}
    >
      <button
        className="dropdown-button m-dropdown-init-btn"
        onClick={() => setDropdown({ ...dropdown, menu: !dropdown.menu })}
        onMouseEnter={() => setDropdown({ menu: true })}
      >
        Filter Options
      </button>
      <div className="new-dropdown">
        <button
          className={
            dropdown.menu ? `m-dropdown-button` : `m-dropdown-button hidden`
          }
        >
          Categories
        </button>
        <div className="dropdown-content m-dropdown-content">
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
      <div className="new-dropdown">
        <button
          className={
            dropdown.menu ? `m-dropdown-button` : `m-dropdown-button hidden`
          }
        >
          Price
        </button>
        <div className="dropdown-content m-dropdown-content">
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
      <div className="new-dropdown">
        <button
          className={
            dropdown.menu ? `m-dropdown-button` : `m-dropdown-button hidden`
          }
        >
          Min. Rating
        </button>
        <div className="dropdown-content m-dropdown-content">
          {ratingOptions.map((option, index) => (
            <div
              className="dd-item d-flex justify-content-center"
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
        <button
          className={
            dropdown.menu
              ? `m-dropdown-button last-dropdown`
              : `last-dropdown m-dropdown-button hidden`
          }
        >
          Promotional
        </button>
        <div className="dropdown-content m-dropdown-content">
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

export default MobileFilterOptions;
