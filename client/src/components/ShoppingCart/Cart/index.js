import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosClose } from "react-icons/io";
import CartItem from "../CartItem";
import Checkout from "../Checkout";
import Auth from "../../../utils/auth";
import { calculateTotal } from "../../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../../redux/features/cartSlice";
import { useGetCart, useClickOutside } from "../../../hooks/cartHooks";

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
      <div className="cart shadow" ref={cartRef}>
        <div>
          <form>
            {/* Order summary */}
            <section aria-labelledby="summary-heading">
              <div className="d-flex justify-content-between">
                <div className="text-start close-cart" onClick={() => toggle()}>
                  <IoIosClose size="36px" />
                </div>
                <h2 className="sr-only h4 m-0 align-self-center">
                  Order Summary
                </h2>
              </div>
              <ul className="cart-ul">
                {cartItems.map((item) => {
                  return <CartItem key={item.product._id} item={item} />;
                })}
              </ul>
              {!cartItems.length && "There's nothing here yet!"}
              <div>
                <dl>
                  <div>
                    <dt>Subtotal</dt>
                    <dd>${calculateTotal(cartItems)}</dd>
                  </div>
                </dl>
                <p>Shipping and taxes will be calculated at checkout.</p>
              </div>
              {Auth.loggedIn() ? (
                <Checkout cartItems={cartItems} />
              ) : (
                <span>
                  (
                  <Link to="/login" onClick={() => toggle()}>
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
