import { configureStore } from "@reduxjs/toolkit";

// form
import { formReducer, changeName, changeClassTitle } from "./slices/formSlice";
import {
  changeStatName,
  changeStatClassTitle,
  charStatsReducer,
  generateStats,
  resetStats,
  changeHP,
  changeMP,
} from "./slices/charStatsSlice";

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

// enemies
import { enemiesSliceReducer, changeEnemy } from "./slices/enemiesSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    charStats: charStatsReducer,
    items: itemsSliceReducer,
    systemStatus: systemStatusSliceReducer,
    messages: messagesSliceReducer,
    enemies: enemiesSliceReducer,
  },
});

export {
  store,

  // form
  changeName,
  changeClassTitle,

  // charStats
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

  // enemies
  changeEnemy,
};
