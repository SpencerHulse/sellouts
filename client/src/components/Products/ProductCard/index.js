import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";
import { idbPromise } from "../../../utils/helpers";

function ProductCard({ product }) {
  const { name: category } = product.category;
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

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addItemToCart = (quantity) => {
    const itemInCart = cartItems.find((item) => item._id === _id);

    dispatch(addToCart({ product, purchaseQuantity: quantity, _id }));

    if (itemInCart) {
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + quantity,
      });
    } else {
      idbPromise("cart", "put", {
        product,
        purchaseQuantity: quantity,
        _id,
      });
    }
  };

  return (
    <div className="">
      <Link to={`/product/${_id}`}>
        <img
          className=""
          // src={mainImage}
          alt={`${name} ${category} ${mainImage}`}
        />
      </Link>
      <div className="">
        <Link to={`/product/${_id}`}>
          <h5 className="">
            {name} {category}
          </h5>
        </Link>
        <div>Rating: {rating}</div>
        <p className="">{description}</p>
        <div className="">
          <p className="">
            ${price} or on sale for ${promotionPrice}
          </p>
          {inventory <= 0 ? (
            <button className="" disabled>
              Unavailable
            </button>
          ) : (
            <button className="" onClick={() => addItemToCart(1)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
