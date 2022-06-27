import React from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../../graphql/queries";
import { useCheckoutRedirect } from "../../../hooks/cartHooks";

function Checkout({ cartItems }) {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  function submitCheckout(event) {
    event.preventDefault();
    const productIds = [];

    cartItems.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    console.log(productIds);

    return;

    getCheckout({
      variables: { products: productIds },
    });
  }

  useCheckoutRedirect(data);

  return cartItems.length ? (
    <div>
      <button
        type="submit"
        className="default-button button-filled"
        onClick={submitCheckout}
      >
        Checkout
      </button>
    </div>
  ) : (
    <div>
      <button
        type="submit"
        className="default-button button-filled disabled-btn"
        disabled
      >
        Checkout
      </button>
    </div>
  );
}

export default Checkout;
