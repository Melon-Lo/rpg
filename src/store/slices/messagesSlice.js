import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [
      {
        type: "system",
        content: "歡迎來到好玩的RPG～祝你有個驚險刺激的冒險！",
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
