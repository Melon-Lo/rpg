import { createSlice } from "@reduxjs/toolkit";

const charStats = createSlice({
  name: "charStats",
  initialState: {
    name: "",
    classTitle: "",
    engClassTitle: "",
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
  },
});

export const { rollDiceToDetermineStats } = charStats.actions;
export const charStatsReducer = charStats.reducer;
