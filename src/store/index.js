import { configureStore } from "@reduxjs/toolkit";
import { formReducer, changeName, changeClassTitle } from "./slices/formSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export { store, changeName, changeClassTitle };
