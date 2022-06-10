import ProductList from "../components/Products/ProductList";
import { useProducts } from "../hooks/productHooks";
import { useCategories } from "../hooks/categoryHooks";

const Homepage = () => {
  // Custom hook for product data
  const productData = useProducts();
  // Custom hook for category data
  const categoryData = useCategories();
  console.log(productData, categoryData);
  // For eventual filtering...? Might also do a helper function of sorts.
  const visibleProducts = productData;
  return (
    <>
      <h1>Welcome to the Homepage</h1>
      <ProductList visibleProducts={visibleProducts} />
    </>
  );
};

export default Homepage;
