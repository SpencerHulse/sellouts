import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const {
    _id,
    description,
    inventory,
    mainImage,
    name,
    price,
    promotionPrice,
    rating,
  } = product;
  const { name: category } = product.category;

  return (
    <div className="">
      <Link to={`/product/${_id}`}>
        <img
          className=""
          // src={mainImage}
          alt={`${name} ${category}`}
        />
      </Link>
      <div className="">
        <Link to={`/product/${_id}`}>
          <h5 className="">
            {name} {category}
          </h5>
        </Link>
        <p className="">{description}</p>
        <div className="">
          <p className="">${price}</p>
          {inventory <= 0 ? (
            <button
              className=""
              /* onClick={addItemToCart} */
              disabled
            >
              Unavailable
            </button>
          ) : (
            <button
              className=""
              /* onClick={addItemToCart} */
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
