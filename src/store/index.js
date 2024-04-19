import { configureStore } from "@reduxjs/toolkit";

import { formReducer, changeName, changeClassTitle } from "./slices/formSlice";
import {
  changeStatName,
  changeStatClassTitle,
  charStatsReducer,
  generateStats,
  resetStats,
} from "./slices/charStatsSlice";
import { itemsSliceReducer, addItem } from "./slices/itemsSlice";
import {
  systemStatusSliceReducer,
  changeRoleCreated,
} from "./slices/systemStatusSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    charStats: charStatsReducer,
    items: itemsSliceReducer,
    systemStatus: systemStatusSliceReducer,
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

  // systemStatus
  changeRoleCreated,

  // items
  addItem,
};
