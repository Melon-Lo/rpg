import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
  name: "battle",
  initialState: {
    inBattle: false,
  },
  reducers: {
    changeInBattle(state, action) {
      state.inBattle = action.payload;
    },
  },
});

export const { changeInBattle } = battleSlice.actions;
export const battleSliceReducer = battleSlice.reducer;
