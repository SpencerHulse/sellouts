import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSaleOption: "",
  currentPriceOption: "",
  currentRatingOption: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    selectPriceOption: (state, action) => {
      state.currentPriceOption = action.payload;
    },
    selectSaleOption: (state, action) => {
      state.currentSaleOption = action.payload;
    },
    selectRatingOption: (state, action) => {
      state.currentRatingOption = action.payload;
    },
  },
});

export const { selectPriceOption, selectSaleOption, selectRatingOption } =
  filterSlice.actions;

export default filterSlice.reducer;
