import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  currentCategory: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    selectCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { updateCategories, selectCategory } = categorySlice.actions;

export default categorySlice.reducer;
