import { createSlice } from "@reduxjs/toolkit";

const battleSlice = createSlice({
  name: "battle",
  initialState: {
    inBattle: false,
    executingCommand: false,
    selfDefeated: false,
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
    changeSelfDefeated(state, action) {
      state.selfDefeated = action.payload;
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
  changeSelfDefeated,
  changeEnemyDefeated,
} = battleSlice.actions;
export const battleSliceReducer = battleSlice.reducer;
