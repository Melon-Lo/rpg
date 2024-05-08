import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push({
        type: action.payload.type,
        content: action.payload.content,
      });
    },
    clearMessages(state, action) {
      state.messages = [];
    },
  },
});

export const { addMessage, clearMessages } = messagesSlice.actions;
export const messagesSliceReducer = messagesSlice.reducer;
