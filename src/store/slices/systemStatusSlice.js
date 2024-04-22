import { createSlice } from "@reduxjs/toolkit";

const systemStatusSlice = createSlice({
  name: "systemStatus",
  initialState: {
    // roleCreated: false,

    // DEV ONLY 為了寫 MainPage
    roleCreated: true,

    currentScene: "村莊",
  },
  reducers: {
    changeRoleCreated(state, action) {
      state.roleCreated = action.payload;
    },
    changeCurrentScene(state, action) {
      state.currentScene = action.payload;
    },
  },
});

export const { changeRoleCreated, changeCurrentScene } =
  systemStatusSlice.actions;
export const systemStatusSliceReducer = systemStatusSlice.reducer;
