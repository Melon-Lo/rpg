import { createSlice } from "@reduxjs/toolkit";

const mazeSlice = createSlice({
  name: "maze",
  initialState: {
    // DEV ONLY
    inMaze: false,
    mazeName: "",
    playerPosition: {},
    enemies: [],
    chests: [],
    boss: {},
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
    changeChests(state, action) {
      state.chests = action.payload;
    },
    changeBoss(state, action) {
      state.boss = action.payload;
    },
  },
});

export const {
  changeInMaze,
  changeMazeName,
  changePlayerPosition,
  changeEnemies,
  changeChests,
  changeBoss,
} = mazeSlice.actions;
export const mazeSliceReducer = mazeSlice.reducer;
