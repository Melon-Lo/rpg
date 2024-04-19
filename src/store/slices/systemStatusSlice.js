import { createSlice } from "@reduxjs/toolkit";

const systemStatusSlice = createSlice({
  name: "systemStatus",
  initialState: {
    // roleCreated: false,

    // DEV ONLY 為了寫 mainPage
    roleCreated: true,

    currentLocation: "村莊",
  },
  reducers: {
    changeRoleCreated(state, action) {
      state.roleCreated = action.payload;
    },
  },
});

export const { changeRoleCreated } = systemStatusSlice.actions;
export const systemStatusSliceReducer = systemStatusSlice.reducer;
