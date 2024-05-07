import { createSlice } from "@reduxjs/toolkit";

const systemStatusSlice = createSlice({
  name: "systemStatus",
  initialState: {
    // 創立角色
    // DEV ONLY 為了寫 MainPage 才設為 true，不然預設是 false
    roleCreated: false,

    // 一般狀況
    currentScene: "村莊",
    currentDialogue: {
      talker: "",
      img: "",
      content: "",
    },
  },
  reducers: {
    changeRoleCreated(state, action) {
      state.roleCreated = action.payload;
    },
    changeCurrentScene(state, action) {
      state.currentScene = action.payload;

      // 每當移動場景時，對話要清空
      state.currentDialogue = {
        talker: "",
        img: "",
        content: "",
      };
    },
    changeCurrentDialogue(state, action) {
      state.currentDialogue = action.payload;
    },
  },
});

export const {
  changeRoleCreated,
  changeCurrentScene,
  changeCurrentTalker,
  changeCurrentDialogue,
} = systemStatusSlice.actions;
export const systemStatusSliceReducer = systemStatusSlice.reducer;
