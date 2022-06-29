import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import {
  useProducts,
  useFilterProducts,
  useVisibleProducts,
} from "../../../hooks/productHooks";
import { numberOfPages } from "../../../utils/helpers";

function ProductList() {
  // Custom hook that handles retrieving product data
  const productData = useProducts();
  // The set items per page
  const itemsPP = 5;
  // Local state for the current page, number of pages, filtered products, and visible products
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(productData.length / itemsPP);
  const [filteredProducts, setFilteredProducts] = useState([...productData]);

  // Custom hook that returns data based on the filter options
  const products = useFilterProducts(productData);
  // Custom hook to determine products currently showing on the page
  const visibleProducts = useVisibleProducts(
    productData,
    filteredProducts,
    page,
    itemsPP
  );

  // Handles determining the number of pages
  useEffect(() => {
    setPages(numberOfPages(filteredProducts, itemsPP));
  }, [filteredProducts.length, filteredProducts]);

  // Handles filtering products and resetting the page count when a new filter is added
  useEffect(() => {
    if (products) {
      setPage(1);
      setFilteredProducts(products);
    }
  }, [productData, products]);

  // Handles changing the page
  function changePage(direction) {
    if (page < pages && direction === "next") {
      setPage(page + 1);
    } else if (page > 1 && direction === "prev") {
      setPage(page - 1);
    }
  }

  return (
    <div className="d-flex flex-column justify-content-between home-products">
      <div
        className="d-flex flex-wrap justify-content-center mt-4"
        id="top-of-products"
      >
        <div className="d-flex flex-wrap justify-content-evenly">
          {visibleProducts.length ? (
            visibleProducts.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })
          ) : (
            <div className="">There are no products here!</div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-baseline">
        {page === 1 ? (
          <button className="disabled-btn disabled-prev" disabled>
            Prev
          </button>
        ) : (
          <a href="#top-of-products" className="pagination-link">
            <button className="prev-button" onClick={() => changePage("prev")}>
              Prev
            </button>
          </a>
        )}
        <p>
          Page {page} of {pages || 1}
        </p>
        {page === pages ? (
          <button className="disabled-btn disabled-next" disabled>
            Next
          </button>
        ) : (
          <a href="#top-of-products" className="pagination-link">
            <button className="next-button" onClick={() => changePage("next")}>
              Next
            </button>
          </a>
        )}
      </div>
    </div>
  );
}

export default ProductList;
