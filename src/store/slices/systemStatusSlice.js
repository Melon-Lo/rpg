import { createSlice } from "@reduxjs/toolkit";

const systemStatusSlice = createSlice({
  name: "systemStatus",
  initialState: {
    // 創立角色
    roleCreated: false,
    currentScene: "村莊",
    currentDialogue: {
      talker: "",
      img: "",
      content: "",
    },

    // 已破解的迷宮，寶箱不會再出現
    visitedMazes: [],

    // 遊戲進行到的階段，不同階段會有不同事件
    stage: 1,

    // 任務
    quests: {
      finishingQuest: false,
      shownAcceptDialogue: [], // 任務的npc，用來判別有沒有出現過接受對話了
      currentQuests: [], // 整包 quest
      finishedQuests: [], // 整包 quest
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
    addVisitedMaze(state, action) {
      state.visitedMazes = [...state.visitedMazes, action.payload];
    },
    changeVisitedMazes(state, action) {
      state.visitedMazes = action.payload;
    },
    changeStage(state, action) {
      state.stage = action.payload;
    },
    changeFinishingQuest(state, action) {
      state.quests.finishingQuest = action.payload;
    },
    changeCurrentQuests(state, action) {
      state.quests.currentQuests = action.payload;
    },
    changeFinishedQuests(state, action) {
      state.quests.finishedQuests = action.payload;
    },
    changeShownAcceptDialogue(state, action) {
      state.quests.shownAcceptDialogue = action.payload;
    },
    addFinishedQuest(state, action) {
      state.quests.finishedQuests = [
        ...state.quests.finishedQuests,
        action.payload,
      ];
    },
    addShownAcceptDialogue(state, action) {
      state.quests.shownAcceptDialogue = [
        ...state.quests.shownAcceptDialogue,
        action.payload,
      ];
    },
  },
});

export const {
  changeRoleCreated,
  changeCurrentScene,
  changeCurrentTalker,
  changeCurrentDialogue,
  addVisitedMaze,
  changeVisitedMazes,
  changeStage,
  changeFinishingQuest,
  changeCurrentQuests,
  changeFinishedQuests,
  changeShownAcceptDialogue,
  addFinishedQuest,
  addShownAcceptDialogue,
} = systemStatusSlice.actions;
export const systemStatusSliceReducer = systemStatusSlice.reducer;
