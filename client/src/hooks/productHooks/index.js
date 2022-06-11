import { useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../../redux/features/productSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../graphql/queries";
import { idbPromise } from "../../utils/helpers";

export function useProducts() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (productData) {
      // Redux update
      dispatch(updateProducts(productData.products));
      // IndexedDB update
      productData.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch(updateProducts(products));
      });
    }
  }, [productData, loading, dispatch]);

  return products;
}

export function useVisibleProducts(products) {
  const { currentCategory } = useSelector((state) => state.categories);
  let filteredProducts = products;

  if (currentCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.name === currentCategory
    );
  }

  return filteredProducts;
}
