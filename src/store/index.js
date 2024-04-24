import { configureStore } from "@reduxjs/toolkit";

// form
import { formReducer, changeName, changeClassTitle } from "./slices/formSlice";
import {
  changeStatName,
  changeStatClassTitle,
  characterStatsReducer,
  generateStats,
  resetStats,
  changeHP,
  changeMP,
} from "./slices/characterStatsSlice";

// items
import { itemsSliceReducer, changeItem } from "./slices/itemsSlice";

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
import { battleSliceReducer, changeInBattle } from "./slices/battleSlice";

// enemies
import { enemiesSliceReducer, changeEnemy } from "./slices/enemiesSlice";

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

  // systemStatus
  changeRoleCreated,
  changeCurrentScene,
  changeCurrentDialogue,

  // items
  changeItem,

  // messages,
  addMessage,

  // battle
  changeInBattle,

  // enemies
  changeEnemy,
};
