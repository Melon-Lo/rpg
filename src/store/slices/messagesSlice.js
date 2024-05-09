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
    changeMessages(state, action) {
      state.messages = action.payload;
    },
    clearMessages(state, action) {
      state.messages = [];
    },
  },
});

export const { addMessage, changeMessages, clearMessages } =
  messagesSlice.actions;
export const messagesSliceReducer = messagesSlice.reducer;
