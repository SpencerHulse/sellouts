import { useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateProducts } from "../../redux/features/productSlice";
// Apollo/GraphQL
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../graphql/queries";
import { idbPromise, effectivePromotion } from "../../utils/helpers";

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
  const { currentSaleOption, currentPriceOption, currentRatingOption } =
    useSelector((state) => state.filters);

  let filteredProducts = products;

  if (currentCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.name === currentCategory
    );
  }

  if (currentSaleOption.option === "yes") {
    filteredProducts = filteredProducts.filter((product) => {
      if (product.promotion) {
        return (
          effectivePromotion(product.promotion, product.promotion.ends) === true
        );
      } else {
        return false;
      }
    });
  }

  if (currentPriceOption) {
    if (currentPriceOption === 25) {
      filteredProducts = filteredProducts.filter(
        (product) => product.promotionPrice < currentPriceOption
      );
    } else if (currentPriceOption % 2) {
      filteredProducts = filteredProducts.filter(
        (product) => product.promotionPrice > currentPriceOption - 1
      );
    } else {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.promotionPrice > currentPriceOption / 2 &&
          product.promotionPrice < currentPriceOption
      );
    }
  }

  if (currentRatingOption) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating > currentRatingOption
    );
  }

  return filteredProducts;
}
