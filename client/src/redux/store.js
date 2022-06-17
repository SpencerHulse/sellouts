import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import categoryReducer from "./features/categorySlice";
import cartReducer from "./features/cartSlice";
import filterReducer from "./features/filterSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    filters: filterReducer,
  },
});
