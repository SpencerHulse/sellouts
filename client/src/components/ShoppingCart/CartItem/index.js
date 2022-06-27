import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../../redux/features/cartSlice";
import { idbPromise } from "../../../utils/helpers";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { product, purchaseQuantity } = item;

  function onChange(e) {
    function removeItem() {
      dispatch(removeFromCart(item));
      idbPromise("cart", "delete", { _id: product._id });
    }

    // Prevents empty input and thus NaN value
    if (!e.target.value || e.target.value < 0) return;

    if (e.target.value === "0") return removeItem();

    const change = parseInt(e.target.value) - purchaseQuantity;

    if (change === -1 && purchaseQuantity === 1) return removeItem();

    dispatch(
      addToCart({
        product,
        purchaseQuantity: change,
      })
    );

    idbPromise("cart", "put", {
      product,
      purchaseQuantity: parseInt(e.target.value),
      _id: product._id,
    });
  }

  return (
    <li key={product.id} className="cart-list pb-3 mt-3 shadow-bot">
      <div className="d-flex justify-content-between">
        <div>
          <img
            className="orderlist-img"
            src={product.mainImage}
            alt={`${product.name}`}
          />
        </div>
        <div className="d-flex flex-column">
          <p className="h5">
            <a href={`/product/${product._id}`}>{product.name}</a>
          </p>
          <p>{product.promotionPrice} / each</p>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <label htmlFor={`quantity-`} className="px-1 align-self-center">
            Qty:
          </label>
          <input
            id={`quantity-`}
            name={`quantity-`}
            className="cart-quantity align-self-center"
            value={purchaseQuantity}
            onChange={onChange}
            type="number"
          />
        </div>
        <button type="button" className="default-button">
          <span
            aria-label="trash"
            onClick={() => {
              dispatch(removeFromCart(item));
              idbPromise("cart", "delete", { _id: product._id });
            }}
          >
            Remove
          </span>
        </button>
      </div>
    </li>
  );
};

export default CartItem;
