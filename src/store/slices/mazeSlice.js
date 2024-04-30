import { createSlice } from "@reduxjs/toolkit";

const mazeSlice = createSlice({
  name: "maze",
  initialState: {
    // DEV ONLY
    inMaze: false,
    mazeName: "",
    playerPosition: {},
    enemiesPosition: [],
    chestsPosition: [],
    bossPosition: {},
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
    changeEnemiesPosition(state, action) {
      state.enemiesPosition = action.payload;
    },
    changeChestsPosition(state, action) {
      state.chestsPosition = action.payload;
    },
    changeBossPosition(state, action) {
      state.bossPosition = action.payload;
    },
  },
});

export const {
  changeInMaze,
  changeMazeName,
  changePlayerPosition,
  changeEnemiesPosition,
  changeChestsPosition,
  changeBossPosition,
} = mazeSlice.actions;
export const mazeSliceReducer = mazeSlice.reducer;
