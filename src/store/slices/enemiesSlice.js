import { createSlice } from "@reduxjs/toolkit";

const enemiesSlice = createSlice({
  name: "enemies",
  initialState: {
    name: "",
    img: "",
    isBoss: false,
    stage: 0,
    HP: 0,
    maxHP: 0,
    ATK: 0,
    DEF: 0,
    MATK: 0,
    MDEF: 0,
    SPD: 0,
    weakness: "",
    exp: 0,
    money: 0,
    loot: [],
  },
  reducers: {
    changeEnemy(state, action) {
      const {
        name,
        HP,
        isBoss,
        stage,
        maxHP,
        ATK,
        DEF,
        MATK,
        MDEF,
        SPD,
        weakness,
        exp,
        money,
        loot,
        img,
      } = action.payload;

      state.name = name;
      state.HP = HP;
      state.isBoss = isBoss;
      state.stage = stage;
      state.maxHP = maxHP;
      state.ATK = ATK;
      state.DEF = DEF;
      state.MATK = MATK;
      state.MDEF = MDEF;
      state.SPD = SPD;
      state.weakness = weakness;
      state.exp = exp;
      state.money = money;
      state.loot = loot;
      state.img = img;
    },
    changeEnemyHP(state, action) {
      state.HP = Math.floor(action.payload);
      if (state.HP < 0) {
        state.HP = 0;
      }
    },
  },
});

export const { changeEnemy, changeEnemyHP } = enemiesSlice.actions;
export const enemiesSliceReducer = enemiesSlice.reducer;
