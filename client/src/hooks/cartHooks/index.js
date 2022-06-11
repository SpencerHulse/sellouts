import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";
import { addMultipleItems } from "../../redux/features/cartSlice";
import { toggleCart } from "../../redux/features/cartSlice";

export function useGetCart(cartItems) {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch(addMultipleItems([...cart]));
    }

    if (!cartItems.length) {
      getCart();
    }
  }, [cartItems.length, dispatch]);
}

export function useClickOutside(cartOpen, cartRef, cartTabRef) {
  const dispatch = useDispatch();
  const toggle = () => dispatch(toggleCart());

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
}
