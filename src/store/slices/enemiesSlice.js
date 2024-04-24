import { createSlice } from "@reduxjs/toolkit";

const enemiesSlice = createSlice({
  name: "enemies",
  initialState: {
    name: "",
    img: "",
    HP: 0,
    maxHP: 0,
    ATK: 0,
    DEF: 0,
    MATK: 0,
    MDEF: 0,
    SPD: 0,
    money: 0,
    loot: [],
  },
  reducers: {
    changeEnemy(state, action) {
      const { name, HP, maxHP, ATK, DEF, MATK, MDEF, SPD, money, loot, img } =
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
        money,
        loot,
        img,
      };
    },
    changeEnemyHP(state, action) {
      state.HP = action.payload;
    },
  },
});

export const { changeEnemy, changeEnemyHP } = enemiesSlice.actions;
export const enemiesSliceReducer = enemiesSlice.reducer;
