import { useSelector } from "react-redux";
import FilterOptions from "../components/FilterOptions";
import ProductList from "../components/Products/ProductList";
import { capitalizeFirstLetter } from "../utils/helpers";

const Homepage = () => {
  const { currentCategory } = useSelector((state) => state.categories);
  return (
    <>
      <h1>Oh the horror! The color scheme! Hahahahaha!</h1>
      <FilterOptions />
      <h2>
        {currentCategory
          ? capitalizeFirstLetter(currentCategory)
          : "All Products"}
      </h2>
      <ProductList />
    </>
  );
};

export default Homepage;
