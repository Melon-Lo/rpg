import { createSlice, nanoid } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    money: 50,
    data: [],
  },
  reducers: {
    addItem(state, action) {
      state.data.push({
        id: nanoid(),
        name: action.payload.name,
      });
    },
  },
});

export const { addItem } = itemsSlice.actions;
export const itemsSliceReducer = itemsSlice.reducer;
