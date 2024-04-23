import { createSlice, nanoid } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    money: 50,
    data: [
      {
        name: "補藥",
        quantity: 3,
      },
      {
        name: "魔法藥",
        quantity: 2,
      },
    ],
  },
  reducers: {
    changeItem(state, action) {
      const { name, quantity } = action.payload;
      const existingItem = state.data.find((item) => item.name === name);

      // 如果已經有該物品，則改變該物品的數量
      if (existingItem) {
        existingItem.quantity += quantity;
        // 如果沒有該物品，則在陣列中加入該物品，數量為第二個參數
      } else {
        state.data = [...state.data, { name, quantity }];
      }

      // 如果物品用完了，從陣列中刪除
      state.data = state.data.filter((item) => item.quantity > 0);
    },
  },
});

export const { changeItem } = itemsSlice.actions;
export const itemsSliceReducer = itemsSlice.reducer;
