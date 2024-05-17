import { createSlice } from "@reduxjs/toolkit";
import classes from "../../data/classes";
import itemsData from "../../data/items";
import calculateEquipmentsStats from "../../utils/characterStats/calculateEquipmentsStats";

const characterStats = createSlice({
  name: "characterStats",
  initialState: {
    // DEV ONLY
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
    exp: 0,
    expToNextLevel: 20,
    skills: [],
    equipments: {},
    equipmentsStats: {},
    // 總數值 = 自身數值 + 裝備數值
    totalStats: {},
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    changeClassTitle(state, action) {
      state.classTitle = action.payload;
    },
    changeHP(state, action) {
      state.HP = Math.floor(action.payload);
      // HP 不會超過最大值
      if (state.HP >= state.totalStats.maxHP) {
        state.HP = state.totalStats.maxHP;
      }

      // HP 不會低於 0
      if (state.HP < 0) {
        state.HP = 0;
      }
    },
    changeMP(state, action) {
      state.MP = Math.floor(action.payload);
      // MP 不會超過最大值
      if (state.MP >= state.totalStats.maxMP) {
        state.MP = state.totalStats.maxMP;
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
      const currentClassTitleInitialSkills = currentClassTitle.initialSkills;
      const currentClassTitleInitialEquipments =
        currentClassTitle.initialEquipments;

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
      state.skills = currentClassTitleInitialSkills;
      state.equipments = currentClassTitleInitialEquipments;

      // 1 級狀態
      state.level = 1;
      state.exp = 0;
      state.expToNextLevel = 20;

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
      state.skills = [...state.skills, action.payload];
    },
    changeSkills(state, action) {
      state.skills = action.payload;
    },
    changeEquipments(state, action) {
      state.equipments = action.payload;
    },
    changeEquipmentsStats(state, action) {
      state.equipmentsStats = calculateEquipmentsStats(state.equipments);
    },
    changeTotalStats(state, action) {
      state.totalStats = {
        ...state.totalStats,
        ATK: state.ATK + (state.equipmentsStats.ATK || 0),
        DEF: state.DEF + (state.equipmentsStats.DEF || 0),
        MATK: state.MATK + (state.equipmentsStats.MATK || 0),
        MDEF: state.MDEF + (state.equipmentsStats.MDEF || 0),
        SPD: state.SPD + (state.equipmentsStats.SPD || 0),
        maxHP: state.maxHP + (state.equipmentsStats.maxHP || 0),
        maxMP: state.maxMP + (state.equipmentsStats.maxMP || 0),
      };
    },
    changeCharacterStats(state, action) {
      const {
        level,
        HP,
        maxHP,
        MP,
        maxMP,
        ATK,
        DEF,
        MATK,
        MDEF,
        SPD,
        exp,
        expToNextLevel,
      } = action.payload;
      state.level = level;
      state.HP = HP;
      state.maxHP = maxHP;
      state.MP = MP;
      state.maxMP = maxMP;
      state.ATK = ATK;
      state.DEF = DEF;
      state.MATK = MATK;
      state.MDEF = MDEF;
      state.SPD = SPD;
      state.exp = exp;
      state.expToNextLevel = expToNextLevel;
    },
  },
});

export const {
  changeName,
  changeClassTitle,
  generateStats,
  resetStats,
  changeHP,
  changeMP,
  changeEXP,
  addSkill,
  changeSkills,
  changeEquipments,
  changeEquipmentsStats,
  changeTotalStats,
  changeCharacterStats,
} = characterStats.actions;
export const characterStatsReducer = characterStats.reducer;
