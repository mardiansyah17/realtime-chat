import { createSlice } from "@reduxjs/toolkit";

export const conversationSlice = createSlice({
  name: "conversations",
  initialState: [],
  reducers: {
    setConversations: (state, action) => {
      if (action.payload) {
        return [...state, ...action.payload];
      }
    },
    addConversation: (state, action) => {
      return [...state, action.payload];
    },
    setLastMessage: (state, action) => {
      const lastMessage = action.payload;
      console.log(action.payload);
      const updatedState = state.map((data) => {
        if (data.conversationId === lastMessage.conversation_id) {
          return {
            ...data,
            lastMessage: { createdAt: lastMessage.createdAt, content: lastMessage.content },
          };
        }
        return data;
      });
      updatedState.sort((a, b) => {
        return a.lastMessage.createdAt > b.lastMessage.createdAt
          ? -1
          : a.lastMessage.createdAt < b.lastMessage.createdAt
          ? 1
          : 0;
      });
      return updatedState;
    },
  },
});

export const { setConversations, setLastMessage, addConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
