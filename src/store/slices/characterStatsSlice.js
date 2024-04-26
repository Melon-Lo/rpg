import { createSlice } from "@reduxjs/toolkit";
import classes from "../../data/classes";

const characterStats = createSlice({
  name: "characterStats",
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
  //   skills: [],
  // },

  // DEV ONLY
  initialState: {
    name: "小明",
    classTitle: "法師",
    level: 1,
    HP: 100,
    maxHP: 100,
    MP: 50,
    maxMP: 50,
    ATK: 30,
    DEF: 10,
    MATK: 30,
    MDEF: 20,
    SPD: 30,
    exp: 43,
    expToNextLevel: 100,
    skills: ["治療", "火焰", "下雨", "聲波", "地獄鬼火"],
  },
  reducers: {
    changeStatName(state, action) {
      state.name = action.payload;
    },
    changeStatClassTitle(state, action) {
      state.classTitle = action.payload;
    },
    changeHP(state, action) {
      state.HP = Math.floor(action.payload);
      // HP 不會超過最大值
      if (state.HP >= state.maxHP) {
        state.HP = state.maxHP;
      }

      // HP 不會低於 0
      if (state.HP < 0) {
        state.HP = 0;
      }
    },
    changeMP(state, action) {
      state.MP = Math.floor(action.payload);
      // MP 不會超過最大值
      if (state.MP >= state.maxMP) {
        state.MP = state.maxMP;
      }

      // MP 不會低於 0
      if (state.MP < 0) {
        state.MP = 0;
      }
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
    changeEXP(state, action) {
      state.exp = Math.floor(action.payload);
    },
    addSkill(state, action) {
      state.skills = action.payload;
    },
  },
});

export const {
  changeStatName,
  changeStatClassTitle,
  generateStats,
  resetStats,
  changeHP,
  changeMP,
  changeEXP,
  addSkill,
} = characterStats.actions;
export const characterStatsReducer = characterStats.reducer;
