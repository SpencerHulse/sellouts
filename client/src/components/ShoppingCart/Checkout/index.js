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

    getCheckout({
      variables: { products: productIds },
    });
  }

  useCheckoutRedirect(data);

  return cartItems.length ? (
    <div className="">
      <button type="submit" className="" onClick={submitCheckout}>
        Checkout
      </button>
    </div>
  ) : (
    <div className="mt-10">
      <button type="submit" className="" disabled>
        Checkout
      </button>
    </div>
  );
}

export default Checkout;
