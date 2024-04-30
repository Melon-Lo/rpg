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
  },
});

export const {
  changeInMaze,
  changeMazeName,
  changePlayerPosition,
  changeEnemiesPosition,
  changeChestsPosition,
} = mazeSlice.actions;
export const mazeSliceReducer = mazeSlice.reducer;
