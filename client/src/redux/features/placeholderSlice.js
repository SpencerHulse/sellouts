import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  placeholderArr: [],
  placeholderOpen: false,
};

const placeholderSlice = createSlice({
  name: "placeholder",
  initialState,
  reducers: {
    placeholder: (state, action) => {
      state.placeholderOpen = !state.placeholderOpen;
    },
  },
});

export const { placeholder } = placeholderSlice.actions;

export default placeholderSlice.reducer;
