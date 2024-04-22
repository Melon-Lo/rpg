import { createSlice } from "@reduxjs/toolkit";

const systemStatusSlice = createSlice({
  name: "systemStatus",
  initialState: {
    // roleCreated: false,

    // DEV ONLY 為了寫 MainPage
    roleCreated: true,

    currentScene: "村莊",
    currentTalker: "",
  },
  reducers: {
    changeRoleCreated(state, action) {
      state.roleCreated = action.payload;
    },
    changeCurrentScene(state, action) {
      state.currentScene = action.payload;
    },
    changeCurrentTalker(state, action) {
      state.currentTalker = action.payload;
    },
  },
});

export const { changeRoleCreated, changeCurrentScene, changeCurrentTalker } =
  systemStatusSlice.actions;
export const systemStatusSliceReducer = systemStatusSlice.reducer;
