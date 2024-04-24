import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
  name: "battle",
  initialState: {
    inBattle: false,
    executingCommand: false,
    turn: "",
  },
  reducers: {
    changeInBattle(state, action) {
      state.inBattle = action.payload;
    },
    changeExecutingCommand(state, action) {
      state.executingCommand = action.payload;
    },
    changeTurn(state, action) {
      state.turn = action.payload;
    },
  },
});

export const { changeInBattle, changeExecutingCommand, changeTurn } =
  battleSlice.actions;
export const battleSliceReducer = battleSlice.reducer;
