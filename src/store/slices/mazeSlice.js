import { createSlice } from "@reduxjs/toolkit";

const mazeSlice = createSlice({
  name: "maze",
  initialState: {
    // DEV ONLY
    inMaze: false,
    mazeName: "",
    playerPosition: {},
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
  },
});

export const { changeInMaze, changeMazeName, changePlayerPosition } =
  mazeSlice.actions;
export const mazeSliceReducer = mazeSlice.reducer;
