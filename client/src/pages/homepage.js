import { useSelector } from "react-redux";
import FilterOptions from "../components/Filtering/FilterOptions";
import FilterList from "../components/Filtering/FilterList";
import ProductList from "../components/Products/ProductList";
import { capitalizeFirstLetter } from "../utils/helpers";

const Homepage = () => {
  const { currentCategory } = useSelector((state) => state.categories);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between flex-wrap align-items-center mt-5">
            <h2>
              {currentCategory
                ? capitalizeFirstLetter(currentCategory)
                : "All Products"}
            </h2>
            <FilterOptions />
          </div>
          <FilterList />
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default Homepage;
