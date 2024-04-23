import { createSlice } from "@reduxjs/toolkit";
import classes from "../../data/classes";

const charStats = createSlice({
  name: "charStats",
  // initialState: {
  //   name: "",
  //   classTitle: "",
  //   level: 1,
  //   HP: 0,
  //   maxHP: 0,
  //   MP: 0,
  //   maxMP: 0,
  //   ATK: 0,
  //   DEF: 0,
  //   MATK: 0,
  //   MDEF: 0,
  //   SPD: 0,
  //   exp: 0,
  //   expToNextLevel: 50,
  // },

  // DEV ONLY
  initialState: {
    name: "小明",
    classTitle: "法師",
    level: 1,
    HP: 60,
    maxHP: 70,
    MP: 10,
    maxMP: 30,
    ATK: 10,
    DEF: 10,
    MATK: 20,
    MDEF: 20,
    SPD: 3,
    exp: 43,
    expToNextLevel: 50,
  },
  reducers: {
    changeStatName(state, action) {
      state.name = action.payload;
    },
    changeStatClassTitle(state, action) {
      state.classTitle = action.payload;
    },
    changeHPorMP(state, action) {
      // 判別是要 增加/減少 HP/MP

      state.HP = action.payload;
    },
    generateStats(state, action) {
      const currentClassTitle = classes.find(
        (item) => item.classTitle === state.classTitle
      );
      const currentClassTitleInitialStats = currentClassTitle.initialStats;

      function getRandomStat(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      state.ATK = getRandomStat(
        currentClassTitleInitialStats.minATK,
        currentClassTitleInitialStats.maxATK
      );
      state.DEF = getRandomStat(
        currentClassTitleInitialStats.minDEF,
        currentClassTitleInitialStats.maxDEF
      );
      state.MATK = getRandomStat(
        currentClassTitleInitialStats.minMATK,
        currentClassTitleInitialStats.maxMATK
      );
      state.MDEF = getRandomStat(
        currentClassTitleInitialStats.minMDEF,
        currentClassTitleInitialStats.maxMDEF
      );
      state.SPD = getRandomStat(
        currentClassTitleInitialStats.minSPD,
        currentClassTitleInitialStats.maxSPD
      );

      // 固定數值
      state.maxHP = currentClassTitleInitialStats.maxHP;
      state.HP = currentClassTitleInitialStats.maxHP;
      state.maxMP = currentClassTitleInitialStats.maxMP;
      state.MP = currentClassTitleInitialStats.maxMP;
      state.level = 1;

      // 確保總和為 35
      let total = state.ATK + state.DEF + state.MATK + state.MDEF + state.SPD;
      if (total !== 35) {
        // 如果總和不為35，重新生成 ATK 和 DEF，直到總和為 35
        while (total !== 35) {
          state.ATK = getRandomStat(
            currentClassTitleInitialStats.minATK,
            currentClassTitleInitialStats.maxATK
          );
          state.DEF = getRandomStat(
            currentClassTitleInitialStats.minDEF,
            currentClassTitleInitialStats.maxDEF
          );
          state.MATK = getRandomStat(
            currentClassTitleInitialStats.minMATK,
            currentClassTitleInitialStats.maxMATK
          );
          state.MDEF = getRandomStat(
            currentClassTitleInitialStats.minMDEF,
            currentClassTitleInitialStats.maxMDEF
          );
          state.SPD = getRandomStat(
            currentClassTitleInitialStats.minSPD,
            currentClassTitleInitialStats.maxSPD
          );
          total = state.ATK + state.DEF + state.MATK + state.MDEF + state.SPD;
        }
      }
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

export const {
  changeStatName,
  changeStatClassTitle,
  generateStats,
  resetStats,
  changeHPorMP,
} = charStats.actions;
export const charStatsReducer = charStats.reducer;
