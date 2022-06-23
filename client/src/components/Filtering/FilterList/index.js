import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import ReactStars from "react-stars";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../../redux/features/categorySlice";
import {
  selectSaleOption,
  selectPriceOption,
  selectRatingOption,
} from "../../../redux/features/filterSlice";
import { capitalizeFirstLetter } from "../../../utils/helpers";

function FilterList() {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state) => state.categories);
  const { currentSaleOption, currentPriceOption, currentRatingOption } =
    useSelector((state) => state.filters);

  function priceString(price) {
    if (price === 25) {
      return "$0 to $25";
    } else if (price === 201) {
      // Not great because it currently relies on a static value that could eventually change over
      return "Over $200";
    } else {
      return `$${price / 2} to $${price}`;
    }
  }

  function clearSelections() {
    dispatch(selectCategory(""));
    dispatch(selectSaleOption(""));
    dispatch(selectPriceOption(""));
    dispatch(selectRatingOption(""));
  }

  function activeFilter() {
    if (
      currentCategory ||
      currentSaleOption.option === "yes" ||
      currentPriceOption ||
      currentRatingOption
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h2 className="shadow-bot">Active Filters</h2>
      {currentCategory && (
        <div className="my-2 filter-item d-flex justify-content-between">
          {capitalizeFirstLetter(currentCategory)}
          <span onClick={() => dispatch(selectCategory(""))}>
            {" "}
            <IoIosClose />
          </span>
        </div>
      )}
      {currentPriceOption && (
        <div className="my-2 filter-item d-flex justify-content-between">
          {priceString(currentPriceOption)}
          <span onClick={() => dispatch(selectPriceOption(""))}>
            {" "}
            <IoIosClose />
          </span>
        </div>
      )}
      {currentRatingOption && (
        <div className="my-2 d-flex justify-content-between align-items-center filter-item">
          <ReactStars
            count={5}
            value={currentRatingOption}
            size={20}
            edit={false}
            color2={"#7f60db"}
            color1={"rgba(0, 0, 0, 0.19)"}
          />
          <span onClick={() => dispatch(selectRatingOption(""))}>
            {" "}
            <IoIosClose />
          </span>
        </div>
      )}
      {currentSaleOption.option === "yes" && (
        <div className="my-2 filter-item d-flex justify-content-between">
          On Sale
          <span onClick={() => dispatch(selectSaleOption(""))}>
            {" "}
            <IoIosClose />
          </span>
        </div>
      )}
      {activeFilter() === false && (
        <p className="my-2">There are no active filters</p>
      )}
      <div className="my-2 filter-item" onClick={clearSelections}>
        Clear Filters
      </div>
    </div>
  );
}

export default FilterList;
