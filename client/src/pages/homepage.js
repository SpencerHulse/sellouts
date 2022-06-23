import { useSelector } from "react-redux";
import FilterNav from "../components/Filtering";
import MobileFilterOptions from "../components/Filtering/MobileFilterOptions";
import MobileFilterList from "../components/Filtering/MobileFilterList";
import ProductList from "../components/Products/ProductList";
import { capitalizeFirstLetter } from "../utils/helpers";
import { useWindowWidth } from "../hooks/navHooks";

const Homepage = () => {
  const { currentCategory } = useSelector((state) => state.categories);
  return (
    <>
      {useWindowWidth() > 768 ? (
        <div className="container-fluid p-0">
          <div className="row m-0">
            <div className="twocols p-0">
              <div className="col1 shadow-sm p-0 f-nav-col">
                <div>
                  <FilterNav />
                </div>
              </div>
              <div className="col2 p-0 column-two">
                <div className="p-5">
                  <div className="flex-row justify-space-between">
                    <div>
                      <h2 className="text-center">
                        {currentCategory
                          ? capitalizeFirstLetter(currentCategory)
                          : "All Products"}
                      </h2>
                      <ProductList />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between flex-wrap align-items-center">
              <MobileFilterOptions />
              <MobileFilterList />
            </div>
            <h2>
              {currentCategory
                ? capitalizeFirstLetter(currentCategory)
                : "All Products"}
            </h2>
            <ProductList />
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
