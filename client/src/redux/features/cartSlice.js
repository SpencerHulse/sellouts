import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.cartOpen = !state.cartOpen;
    },
    addToCart: (state, { payload }) => {
      const { product, purchaseQuantity, _id } = payload;
      let updated = false;

      state.cartItems.map((item) => {
        if (item.product._id === product._id) {
          item.purchaseQuantity += purchaseQuantity;
          updated = true;
        }
        return item;
      });

      if (!updated) {
        state.cartItems.push({ product, purchaseQuantity, _id });
      }
    },
    addMultipleItems: (state, { payload }) => {
      state.cartItems = payload;
    },
    removeFromCart: (state, { payload }) => {
      const newCart = state.cartItems.filter(
        (item) => item.product._id !== payload.product._id
      );

      state.cartItems = newCart;
      if (!state.cartItems.length) state.cartOpen = false;
    },
  },
});

export const { toggleCart, addToCart, addMultipleItems, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
