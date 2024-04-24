import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
  name: "battle",
  initialState: {
    inBattle: false,
    executingCommand: false,
    enemyDefeated: false,
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
    changeEnemyDefeated(state, action) {
      state.enemyDefeated = action.payload;
    },
  },
});

export const {
  changeInBattle,
  changeExecutingCommand,
  changeTurn,
  changeEnemyDefeated,
} = battleSlice.actions;
export const battleSliceReducer = battleSlice.reducer;
