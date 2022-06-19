import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { useSelector } from "react-redux";
import { useProducts } from "../../../hooks/productHooks";
import { effectivePromotion } from "../../../utils/helpers";

function ProductList() {
  // Getting current filter options from Redux store
  const { currentCategory } = useSelector((state) => state.categories);
  const { currentSaleOption, currentPriceOption, currentRatingOption } =
    useSelector((state) => state.filters);
  // Custom hook that handles retrieving product data
  const productData = useProducts();
  // The set items per page
  const itemsPP = 5;
  // Local state for the current page, number of pages, filtered products, and visible products
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(productData.length / itemsPP);
  const [filteredProducts, setFilteredProducts] = useState([...productData]);
  const [visibleProducts, setVisibleProducts] = useState([
    ...productData.slice(0, itemsPP),
  ]);

  // Handles changing the page
  function changePage(direction) {
    if (page < pages && direction === "next") {
      setPage(page + 1);
    } else if (page > 1 && direction === "prev") {
      setPage(page - 1);
    }
  }

  // Handles determining the number of pages
  useEffect(() => {
    function numberOfPages() {
      if (filteredProducts.length % itemsPP === 0) {
        setPages(filteredProducts.length / itemsPP);
      } else {
        setPages(Math.floor(filteredProducts.length / itemsPP) + 1);
      }
    }

    numberOfPages(filteredProducts);
  }, [filteredProducts.length, filteredProducts]);

  // Handles filtering products and resetting the page count when a new filter is added
  useEffect(() => {
    let products = [...productData];
    if (currentCategory) {
      products = products.filter(
        (product) => product.category.name === currentCategory
      );
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
    setPage(1);
    setFilteredProducts(products);
  }, [
    productData,
    currentCategory,
    currentSaleOption.option,
    currentPriceOption,
    currentRatingOption,
  ]);

  // Handles determining the visible products from the filtered products array
  useEffect(() => {
    const start = (page - 1) * itemsPP;
    const end = page * itemsPP;

    setVisibleProducts(filteredProducts.slice(start, end));
  }, [filteredProducts, page]);

  return (
    <>
      <div className="d-flex flex-wrap mt-5" id="top-of-products">
        <div className="row row-cols-xl-5 row-cols-sm-1">
          {visibleProducts.length ? (
            visibleProducts.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })
          ) : (
            <div>There are no products here!</div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-baseline">
        <a href="#top-of-products" className="pagination-link">
          <button className="prev-button" onClick={() => changePage("prev")}>
            Previous
          </button>
        </a>
        <p>
          Page {page} of {pages || 1}
        </p>
        <a href="#top-of-products" className="pagination-link">
          <button className="next-button" onClick={() => changePage("next")}>
            Next
          </button>
        </a>
      </div>
    </>
  );
}

export default ProductList;
