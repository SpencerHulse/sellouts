import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { updateProducts } = productSlice.actions;

export default productSlice.reducer;
