import ProductList from "../components/Products/ProductList";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../graphql/queries";

const Homepage = () => {
  const { data: productData } = useQuery(QUERY_PRODUCTS);
  const visibleProducts = productData;
  return (
    <>
      <h1>Welcome to the Homepage</h1>
      <ProductList visibleProducts={visibleProducts} />
    </>
  );
};

export default Homepage;
