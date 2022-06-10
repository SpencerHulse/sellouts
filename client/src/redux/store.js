import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import categoryReducer from "./features/categorySlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
  },
});
