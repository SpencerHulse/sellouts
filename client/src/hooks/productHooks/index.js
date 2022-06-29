import { useEffect, useState } from "react";
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

export function useFilterProducts(productData) {
  // Getting current filter options from Redux store
  const { currentCategory } = useSelector((state) => state.categories);
  const { currentSaleOption, currentPriceOption, currentRatingOption } =
    useSelector((state) => state.filters);

  const [filteredProducts, setFilteredProducts] = useState("");

  useEffect(() => {
    let products = [...productData];

    if (currentCategory) {
      products = products.filter((product) => {
        const { name } = product?.category || "Uncategorized";
        return name === currentCategory;
      });
    }

    if (currentSaleOption.option === "yes") {
      products = products.filter((product) => {
        if (product.promotion) {
          return (
            effectivePromotion(product.promotion, product.promotion.ends) ===
            true
          );
        } else {
          return false;
        }
      });
    }

    if (currentPriceOption) {
      if (currentPriceOption === 25) {
        products = products.filter(
          (product) => product.promotionPrice < currentPriceOption
        );
      } else if (currentPriceOption % 2) {
        products = products.filter(
          (product) => product.promotionPrice > currentPriceOption - 1
        );
      } else {
        products = products.filter(
          (product) =>
            product.promotionPrice > currentPriceOption / 2 &&
            product.promotionPrice < currentPriceOption
        );
      }
    }

    if (currentRatingOption) {
      products = products.filter(
        (product) => product.rating > currentRatingOption
      );
    }

    setFilteredProducts(products);
  }, [
    currentCategory,
    currentPriceOption,
    currentRatingOption,
    currentSaleOption.option,
    productData,
  ]);

  if (filteredProducts) return filteredProducts;
}

export function useVisibleProducts(products, filteredProducts, page, itemsPP) {
  const [visibleProducts, setVisibleProducts] = useState([
    ...products.slice(0, itemsPP),
  ]);

  // Handles determining the visible products from the filtered products array
  useEffect(() => {
    const start = (page - 1) * itemsPP;
    const end = page * itemsPP;
    setVisibleProducts(filteredProducts.slice(start, end));
  }, [filteredProducts, itemsPP, page]);

  return visibleProducts;
}
