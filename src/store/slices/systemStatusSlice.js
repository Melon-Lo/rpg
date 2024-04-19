import { createSlice } from "@reduxjs/toolkit";

const systemStatusSlice = createSlice({
  name: "systemStatus",
  initialState: {
    roleCreated: false,
  },
  reducers: {
    changeRoleCreated(state, action) {
      state.roleCreated = action.payload;
    },
  },
});

export const { changeRoleCreated } = systemStatusSlice.actions;
export const systemStatusSliceReducer = systemStatusSlice.reducer;
