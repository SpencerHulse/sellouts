import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { selectCategory } from "../../../redux/features/categorySlice";
import {
  selectSaleOption,
  selectPriceOption,
  selectRatingOption,
} from "../../../redux/features/filterSlice";

function MobileFilterList() {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state) => state.categories);
  const { currentSaleOption, currentPriceOption, currentRatingOption } =
    useSelector((state) => state.filters);

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
    <div className="d-flex flex-wrap align-items-center my-2">
      <div className="new-dropdown">
        {activeFilter() === true ? (
          <>
            <button className="dropdown-button m-dropdown-btn">
              Active Filters
            </button>
            <div className="dropdown-content m-dropdown-btn">
              {currentCategory && (
                <div className="dd-item d-flex justify-content-between">
                  Category
                  <span onClick={() => dispatch(selectCategory(""))}>
                    {" "}
                    <IoIosClose size="24px" />
                  </span>
                </div>
              )}
              {currentPriceOption && (
                <div className="dd-item d-flex justify-content-between">
                  Price
                  <span onClick={() => dispatch(selectPriceOption(""))}>
                    {" "}
                    <IoIosClose size="24px" />
                  </span>
                </div>
              )}
              {currentRatingOption && (
                <div className="dd-item d-flex justify-content-between">
                  Rating
                  <span onClick={() => dispatch(selectRatingOption(""))}>
                    {" "}
                    <IoIosClose size="24px" />
                  </span>
                </div>
              )}
              {currentSaleOption.option === "yes" && (
                <div className="dd-item d-flex justify-content-between">
                  On Sale
                  <span onClick={() => dispatch(selectSaleOption(""))}>
                    {" "}
                    <IoIosClose size="24px" />
                  </span>
                </div>
              )}

              <div
                className="dd-item filter-item m-dropdown-btn"
                onClick={clearSelections}
              >
                Clear Filters
              </div>
            </div>
          </>
        ) : (
          <button className="dropdown-button m-no-bg-img m-dropdown-btn">
            Active Filters
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileFilterList;
