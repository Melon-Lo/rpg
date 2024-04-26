import { configureStore } from "@reduxjs/toolkit";

// form
import { formReducer, changeName, changeClassTitle } from "./slices/formSlice";

// characterStats
import {
  changeStatName,
  changeStatClassTitle,
  characterStatsReducer,
  generateStats,
  resetStats,
  changeHP,
  changeMP,
  changeEXP,
  addSkill,
  changeCharacterStats,
} from "./slices/characterStatsSlice";

// items
import {
  itemsSliceReducer,
  changeItem,
  changeMoney,
} from "./slices/itemsSlice";

// systemStatus
import {
  systemStatusSliceReducer,
  changeRoleCreated,
  changeCurrentScene,
  changeCurrentDialogue,
} from "./slices/systemStatusSlice";

// messages
import { messagesSliceReducer, addMessage } from "./slices/messagesSlice";

// battle
import {
  battleSliceReducer,
  changeInBattle,
  changeExecutingCommand,
  changeTurn,
  changeSelfDefeated,
  changeEnemyDefeated,
} from "./slices/battleSlice";

// enemies
import {
  enemiesSliceReducer,
  changeEnemy,
  changeEnemyHP,
} from "./slices/enemiesSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    characterStats: characterStatsReducer,
    items: itemsSliceReducer,
    systemStatus: systemStatusSliceReducer,
    messages: messagesSliceReducer,
    battle: battleSliceReducer,
    enemies: enemiesSliceReducer,
  },
});

export {
  store,

  // form
  changeName,
  changeClassTitle,

  // characterStats
  changeStatName,
  changeStatClassTitle,
  generateStats,
  resetStats,
  changeHP,
  changeMP,
  changeEXP,
  addSkill,
  changeCharacterStats,

  // systemStatus
  changeRoleCreated,
  changeCurrentScene,
  changeCurrentDialogue,

  // items
  changeItem,
  changeMoney,

  // messages,
  addMessage,

  // battle
  changeInBattle,
  changeExecutingCommand,
  changeTurn,
  changeSelfDefeated,
  changeEnemyDefeated,

  // enemies
  changeEnemy,
  changeEnemyHP,
};
