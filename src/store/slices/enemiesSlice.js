import { createSlice } from "@reduxjs/toolkit";

const enemiesSlice = createSlice({
  name: "enemies",
  initialState: {
    name: "",
    HP: 0,
    maxHP: 0,
    ATK: 0,
    DEF: 0,
    MATK: 0,
    MDEF: 0,
    SPD: 0,
    loot: [],
  },
  reducers: {
    changeEnemy(state, action) {
      const { name, HP, maxHP, ATK, DEF, MATK, MDEF, SPD, loot } =
        action.payload;
      return {
        ...state,
        name,
        HP,
        maxHP,
        ATK,
        DEF,
        MATK,
        MDEF,
        SPD,
        loot,
      };
    },
  },
});

export const { changeEnemy } = enemiesSlice.actions;
export const enemiesSliceReducer = enemiesSlice.reducer;
