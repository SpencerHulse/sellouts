import React from "react";
import ProductCard from "../ProductCard";
import { useProducts } from "../../../hooks/productHooks";
import { useVisibleProducts } from "../../../hooks/productHooks";

function ProductList() {
  const productData = useProducts();
  const products = useVisibleProducts(productData);
  return (
    <div className="d-flex flex-wrap justify-content-evenly mt-5">
      {products.length &&
        products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
    </div>
  );
}

export default ProductList;
