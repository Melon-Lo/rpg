import { createSlice } from "@reduxjs/toolkit";

const charStats = createSlice({
  name: "charStats",

  // DEV ONLY
  // initialState: {
  //   name: "小明",
  //   classTitle: "戰士",
  //   engClassTitle: "fighter",
  //   level: 1,
  //   HP: 100,
  //   maxHP: 100,
  //   MP: 5,
  //   maxMP: 5,
  //   ATK: 10,
  //   DEF: 10,
  //   MATK: 10,
  //   MDEF: 10,
  //   SPD: 10,
  // },

  initialState: {
    name: "",
    classTitle: "",
    level: 1,
    HP: 0,
    maxHP: 0,
    MP: 0,
    maxMP: 0,
    ATK: 0,
    DEF: 0,
    MATK: 0,
    MDEF: 0,
    SPD: 0,
  },
  reducers: {
    rollDiceToDetermineStats(state, action) {
      // 使用 action.payload 更新狀態，狀態就是 action.payload 本身
      return action.payload;
    },
    resetStats(state, action) {
      state.maxHP = 0;
      state.maxMP = 0;
      state.ATK = 0;
      state.DEF = 0;
      state.MATK = 0;
      state.MDEF = 0;
      state.SPD = 0;
    },
  },
});

export const { rollDiceToDetermineStats, resetStats } = charStats.actions;
export const charStatsReducer = charStats.reducer;
