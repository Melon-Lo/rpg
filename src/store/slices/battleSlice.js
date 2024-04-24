import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
  name: "battle",
  initialState: {
    inBattle: false,
    executingCommand: false,
  },
  reducers: {
    changeInBattle(state, action) {
      state.inBattle = action.payload;
    },
    changeExecutingCommand(state, action) {},
  },
});

export const { changeInBattle } = battleSlice.actions;
export const battleSliceReducer = battleSlice.reducer;
