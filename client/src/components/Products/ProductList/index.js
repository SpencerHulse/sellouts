import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { useProducts } from "../../../hooks/productHooks";
import { useVisibleProducts } from "../../../hooks/productHooks";

function ProductList() {
  const productData = useProducts();
  // const products = useVisibleProducts(productData);

  const itemsPP = 5;

  const [page, setPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState([
    ...productData.slice(0, itemsPP),
  ]);

  console.log(visibleProducts);

  function numberOfPages() {
    if (productData.length % itemsPP === 0) {
      return productData.length / itemsPP;
    } else {
      return Math.floor(productData.length / itemsPP) + 1;
    }
  }

  const pages = numberOfPages(productData);
  console.log(pages);

  useEffect(() => {
    const start = (page - 1) * itemsPP;
    const end = page * itemsPP;
    setVisibleProducts(productData.slice(start, end));
  }, [page, productData]);

  return (
    <div className="d-flex flex-wrap mt-5">
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
  );
}

export default ProductList;
