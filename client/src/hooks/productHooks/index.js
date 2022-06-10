import { useEffect } from "react";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../graphql/queries";
import { idbPromise } from "../../utils/helpers";

export function useProducts() {
  const { loading, data: productData } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (productData) {
      productData.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {});
    }
  }, [productData, loading]);

  return productData;
}
