import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "../CartItem";
import Auth from "../../../utils/auth";
import { idbPromise } from "../../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCart,
  addMultipleItems,
} from "../../../redux/features/cartSlice";
import "./style.css";

function ShoppingCart() {
  const dispatch = useDispatch();
  const { cartItems, cartOpen } = useSelector((state) => state.cart);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch(addMultipleItems([...cart]));
    }

    if (!cartItems.length) {
      getCart();
    }
  }, [cartItems.length, dispatch]);

  function toggle() {
    dispatch(toggleCart());
  }

  function calculateTotal() {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.product.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch(addMultipleItems([...cart]));
    }

    if (!cartItems.length) {
      getCart();
    }
  }, [cartItems.length, dispatch]);

  let cartRef = useRef();
  let cartTabRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!cartOpen) {
        return;
      }

      if (
        !cartRef.current.contains(event.target) &&
        !cartTabRef.current.contains(event.target)
      ) {
        toggle();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  });

  if (!cartOpen) {
    return <button onClick={() => toggle()}>Cart ({cartItems.length})</button>;
  }

  return (
    <>
      <button ref={cartTabRef} onClick={() => toggle()}>
        Cart ({cartItems.length})
      </button>
      <div className="cart" ref={cartRef}>
        <div>
          <div className="" onClick={() => toggle()}>
            <button>Close cart</button>
          </div>
          <form>
            <section>
              <ul className="">
                {cartItems.map((item) => {
                  return <CartItem key={item.product._id} item={item} />;
                })}
              </ul>
              {!cartItems.length && "There's nothing here yet!"}
            </section>

            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="">
              <h2 className="sr-only">Order summary</h2>

              <div>
                <dl className="">
                  <div className="">
                    <dt className="">Subtotal</dt>
                    <dd className="">${calculateTotal()}</dd>
                  </div>
                </dl>
                <p className="">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>
              {Auth.loggedIn() ? (
                cartItems.length ? (
                  <div className="">
                    <button type="submit" className="">
                      Checkout
                    </button>
                  </div>
                ) : (
                  <div className="mt-10">
                    <button type="submit" className="" disabled>
                      Checkout
                    </button>
                  </div>
                )
              ) : (
                <span>
                  (
                  <Link className="" to="/login" onClick={() => toggle()}>
                    Log in
                  </Link>{" "}
                  to check out)
                </span>
              )}
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
