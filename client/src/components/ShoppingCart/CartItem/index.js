import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../../redux/features/cartSlice";
import { idbPromise } from "../../../utils/helpers";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { product, purchaseQuantity } = item;

  function onChange(e) {
    // Prevents empty input and thus NaN value
    if (!e.target.value && e.target.value !== "0") {
      return;
    }
    const change = parseInt(e.target.value) - purchaseQuantity;

    if (change === -1 && purchaseQuantity === 1) {
      dispatch(removeFromCart(item));
      idbPromise("cart", "delete", { _id: product._id });
      return;
    }

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
    <li key={product.id} className="">
      <div className="">
        <img
          src={product.primaryImage}
          alt={`${product.name} ${product.category.categoryName}`}
        />
      </div>
      <div className="">
        <div>
          <div className="">
            <h4 className="">
              <a href={product.href} className="">
                {product.name}
              </a>
              <div>
                <button type="button" className="">
                  <span
                    aria-label="trash"
                    onClick={() => {
                      dispatch(removeFromCart(item));
                      idbPromise("cart", "delete", { _id: product._id });
                    }}
                    className=""
                  >
                    Remove
                  </span>
                </button>
              </div>
            </h4>
            <div className=" ">
              <p className="">{product.promotionPrice}</p>
              <label htmlFor={`quantity-`} className="sr-only">
                Quantity, {product.name}
              </label>
              <input
                id={`quantity-`}
                name={`quantity-`}
                className=""
                value={purchaseQuantity}
                onChange={onChange}
                type="number"
              />
            </div>
          </div>
          <p className="">{product.color}</p>
          <p className="">{product.size}</p>
        </div>
        <div className=""></div>
      </div>
    </li>
  );
};

export default CartItem;
