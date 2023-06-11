import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationId: null,
  user: null,
  messages: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      return (state = action.payload);
    },
    addMessages: (state, action) => {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
  },
});

export const { setMessages, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
