import { configureStore } from "@reduxjs/toolkit";

// characterStats
import {
  changeName,
  changeClassTitle,
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
  changeMessages,
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

  // characterStats
  changeName,
  changeClassTitle,
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
  changeMessages,
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
