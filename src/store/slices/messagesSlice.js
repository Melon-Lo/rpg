import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [
      {
        type: "system",
        content: "test1",
      },
      {
        type: "system",
        content: "test2",
      },
      {
        type: "system",
        content: "test3",
      },
    ],
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push({
        type: action.payload.type,
        content: action.payload.content,
      });
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesSliceReducer = messagesSlice.reducer;
