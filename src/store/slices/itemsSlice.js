import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    money: 50,
  },
  reducers: {},
});

export const {} = itemsSlice.actions;
export const itemsSliceReducer = itemsSlice.reducer;
