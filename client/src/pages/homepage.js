import ProductList from "../components/Products/ProductList";
import { useProducts } from "../hooks/productHooks";

const Homepage = () => {
  // Custom hook for product data
  const productData = useProducts();
  const visibleProducts = productData;
  return (
    <>
      <h1>Welcome to the Homepage</h1>
      <ProductList visibleProducts={visibleProducts} />
    </>
  );
};

export default Homepage;
