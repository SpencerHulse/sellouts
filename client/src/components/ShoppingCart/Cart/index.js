import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import CartItem from "../CartItem";
import Checkout from "../Checkout";
import Auth from "../../../utils/auth";
import { calculateTotal } from "../../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../../redux/features/cartSlice";
import { useGetCart, useClickOutside } from "../../../hooks/cartHooks";
import "./style.css";

function ShoppingCart() {
  const dispatch = useDispatch();
  const { cartItems, cartOpen } = useSelector((state) => state.cart);
  let cartRef = useRef();
  let cartTabRef = useRef();

  useGetCart(cartItems);
  useClickOutside(cartOpen, cartRef, cartTabRef);

  const toggle = () => dispatch(toggleCart());

  if (!cartOpen) {
    return (
      <button className="cart-button" onClick={() => toggle()}>
        <TiShoppingCart size={30}>({cartItems.length})</TiShoppingCart>
      </button>
    );
  }

  return (
    <>
      <button className="cart-button" ref={cartTabRef} onClick={() => toggle()}>
        <TiShoppingCart size={30}>({cartItems.length})</TiShoppingCart>
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
                    <dd className="">${calculateTotal(cartItems)}</dd>
                  </div>
                </dl>
                <p className="">
                  Shipping and taxes will be calculated at checkout.
                </p>
              </div>
              {Auth.loggedIn() ? (
                <Checkout cartItems={cartItems} />
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
