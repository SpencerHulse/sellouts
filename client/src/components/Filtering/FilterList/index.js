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

  return (
    <div className="d-flex align-items-center">
      <div className="filter-item" onClick={clearSelections}>
        Clear Filters
      </div>
      {currentCategory && (
        <div className="filter-item d-flex justify-content-between">
          {capitalizeFirstLetter(currentCategory)}
          <span onClick={() => dispatch(selectCategory(""))}>
            {" "}
            <IoIosClose />
          </span>
        </div>
      )}
      {currentPriceOption && (
        <div className="filter-item d-flex justify-content-between">
          {priceString(currentPriceOption)}
          <span onClick={() => dispatch(selectPriceOption(""))}>
            {" "}
            <IoIosClose />
          </span>
        </div>
      )}
      {currentRatingOption && (
        <div className="d-flex justify-content-between align-items-center filter-item">
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
        <div className="filter-item d-flex justify-content-between">
          On Sale
          <span onClick={() => dispatch(selectSaleOption(""))}>
            {" "}
            <IoIosClose />
          </span>
        </div>
      )}
    </div>
  );
}

export default FilterList;
