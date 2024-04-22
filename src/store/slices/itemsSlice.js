import { createSlice, nanoid } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    money: 50,
    data: [
      {
        name: "草藥",
        quantity: 1,
      },
      {
        name: "魔力藥",
        quantity: 2,
      },
      {
        name: "復活藥",
        quantity: 3,
      },
    ],
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
