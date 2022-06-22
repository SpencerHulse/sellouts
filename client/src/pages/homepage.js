import { useSelector } from "react-redux";
import FilterNav from "../components/Filtering";
import FilterOptions from "../components/Filtering/FilterOptions";
import FilterList from "../components/Filtering/FilterList";
import ProductList from "../components/Products/ProductList";
import { capitalizeFirstLetter } from "../utils/helpers";

const Homepage = () => {
  const { currentCategory } = useSelector((state) => state.categories);
  return (
    <>
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="twocols p-0">
            <div className="col1 shadow-sm p-0 f-nav-col">
              <div>
                <FilterNav />
              </div>
            </div>
            <div className="col2 p-0">
              <div className="p-5">
                <div className="flex-row justify-space-between">
                  <div className="col-12">
                    <ProductList />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*       <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between flex-wrap align-items-center mt-5">
            <h2>
              {currentCategory
                ? capitalizeFirstLetter(currentCategory)
                : "All Products"}
            </h2>
            <FilterNav />
            <FilterOptions />
          </div>
          <FilterList />
          <ProductList />
        </div>
      </div> */}
    </>
  );
};

export default Homepage;
