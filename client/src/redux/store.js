import { configureStore } from "@reduxjs/toolkit";
import placeholderReducer from "./features/placeholderSlice";

export const store = configureStore({
  reducer: {
    placeholder: placeholderReducer,
  },
});
