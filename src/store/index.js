import { configureStore } from "@reduxjs/toolkit";
import { formReducer, changeName, changeClassTitle } from "./slices/formSlice";
import {
  charStatsReducer,
  rollDiceToDetermineStats,
} from "./slices/charStatsSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    charStats: charStatsReducer,
  },
});

export { store, changeName, changeClassTitle, rollDiceToDetermineStats };
