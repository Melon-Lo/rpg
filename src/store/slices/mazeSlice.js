import { createSlice } from "@reduxjs/toolkit";

const mazeSlice = createSlice({
  name: "maze",
  initialState: {
    inMaze: false,
    mazeName: "",
    playerPosition: {},
    enemies: [],
    boss: {},
    visitedMazesChests: [],
  },
  reducers: {
    changeInMaze(state, action) {
      state.inMaze = action.payload;
    },
    changeMazeName(state, action) {
      state.mazeName = action.payload;
    },
    changePlayerPosition(state, action) {
      state.playerPosition = action.payload;
    },
    changeEnemies(state, action) {
      state.enemies = action.payload;
    },
    changeBoss(state, action) {
      state.boss = action.payload;
    },
    changeVisitedMazesChests(state, action) {
      state.visitedMazesChests = action.payload;
    },
  },
});

export const {
  changeInMaze,
  changeMazeName,
  changePlayerPosition,
  changeEnemies,
  changeBoss,
  changeVisitedMazesChests,
} = mazeSlice.actions;
export const mazeSliceReducer = mazeSlice.reducer;
