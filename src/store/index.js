import { configureStore } from "@reduxjs/toolkit";

import { formReducer, changeName, changeClassTitle } from "./slices/formSlice";
import {
  changeStatName,
  changeStatClassTitle,
  charStatsReducer,
  generateStats,
  resetStats,
} from "./slices/charStatsSlice";
import { itemsSliceReducer } from "./slices/itemsSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    charStats: charStatsReducer,
    items: itemsSliceReducer,
  },
});

export {
  store,
  changeName,
  changeClassTitle,
  changeStatName,
  changeStatClassTitle,
  generateStats,
  resetStats,
};
