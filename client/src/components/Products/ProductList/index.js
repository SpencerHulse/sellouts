import React from "react";
import ProductCard from "../ProductCard";
import { useProducts } from "../../../hooks/productHooks";
import { useCategories } from "../../../hooks/categoryHooks";

function ProductList() {
  // Custom hook for product data
  const productData = useProducts();
  // Custom hook for category data
  const categoryData = useCategories();
  // For eventual filtering...? Might also do a helper function of sorts.
  const visibleProducts = productData;
  console.log(visibleProducts, categoryData);
  return (
    <div>
      {visibleProducts.length &&
        visibleProducts.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
    </div>
  );
}

export default ProductList;
