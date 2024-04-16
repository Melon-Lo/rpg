import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    classTitle: "",
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    changeClassTitle(state, action) {
      state.classTitle = action.payload;
    },
  },
});

export const { changeName, changeClassTitle } = formSlice.actions;
export const formReducer = formSlice.reducer;
