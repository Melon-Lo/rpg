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
  changeSkills,
  changeCharacterStats,
} from "./slices/characterStatsSlice";

// items
import {
  itemsSliceReducer,
  changeItem,
  changeItems,
  changeMoney,
  resetItems,
} from "./slices/itemsSlice";

// systemStatus
import {
  systemStatusSliceReducer,
  changeRoleCreated,
  changeCurrentScene,
  changeCurrentDialogue,
  addVisitedMaze,
  changeVisitedMazes,
} from "./slices/systemStatusSlice";

// messages
import {
  messagesSliceReducer,
  addMessage,
  clearMessages,
} from "./slices/messagesSlice";

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

// maze
import {
  mazeSliceReducer,
  changeInMaze,
  changeMazeName,
  changePlayerPosition,
  changeEnemies,
  changeBoss,
  changeVisitedMazesChests,
} from "./slices/mazeSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    characterStats: characterStatsReducer,
    items: itemsSliceReducer,
    systemStatus: systemStatusSliceReducer,
    messages: messagesSliceReducer,
    battle: battleSliceReducer,
    enemies: enemiesSliceReducer,
    maze: mazeSliceReducer,
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
  changeSkills,
  changeCharacterStats,
  addVisitedMaze,

  // systemStatus
  changeRoleCreated,
  changeCurrentScene,
  changeCurrentDialogue,
  changeVisitedMazes,

  // items
  changeItem,
  changeItems,
  changeMoney,
  resetItems,

  // messages,
  addMessage,
  clearMessages,

  // battle
  changeInBattle,
  changeExecutingCommand,
  changeTurn,
  changeSelfDefeated,
  changeEnemyDefeated,

  // enemies
  changeEnemy,
  changeEnemyHP,

  // maze
  changeInMaze,
  changeMazeName,
  changePlayerPosition,
  changeEnemies,
  changeBoss,
  changeVisitedMazesChests,
};
