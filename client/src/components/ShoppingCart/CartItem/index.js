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
    <li key={product.id} className="flex cart-list">
      <div className="orderlist-img">
        <img
          src={product.primaryImage}
          alt={`${product.name} ${product.category.categoryName}`}
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between">
            <h4 className="text-sm">
              <a
                href={product.href}
                className="font-medium text-gray-700 hover:text-gray-800 dark:text-white"
              >
                {product.name}
              </a>
              <div>
                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <span
                    aria-label="trash"
                    onClick={() => {
                      dispatch(removeFromCart(item));
                      idbPromise("cart", "delete", { _id: product._id });
                    }}
                    className="text-green-700 hover:text-green-700 dark:text-green-600"
                  >
                    Remove
                  </span>
                </button>
              </div>
            </h4>
            <div className="ml-4 ">
              <p className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                {product.price}
              </p>
              <label htmlFor={`quantity-`} className="sr-only">
                Quantity, {product.name}
              </label>
              <input
                id={`quantity-`}
                name={`quantity-`}
                className="dark:bg-[#333333] dark:text-white product-quantity block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cart-quantity-pad"
                value={purchaseQuantity}
                onChange={onChange}
                type="number"
              />
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          <p className="mt-1 text-sm text-gray-500">{product.size}</p>
        </div>
        <div className="mt-4 flex-1 flex items-end justify-between"></div>
      </div>
    </li>
  );
};

export default CartItem;
