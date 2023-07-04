import {createSlice} from "@reduxjs/toolkit";

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
            const updatedState = [...state, action.payload];
            updatedState.sort((a, b) => {
                return a.lastMessage.createdAt > b.lastMessage.createdAt
                    ? -1
                    : a.lastMessage.createdAt < b.lastMessage.createdAt
                        ? 1
                        : 0;
            });
            return updatedState;
        },
        setLastMessage: (state, action) => {
            const lastMessage = action.payload;
            const updatedState = state.map((data) => {
                if (data.conversationId === lastMessage.conversation_id) {
                    return {
                        ...data,
                        lastMessage: {createdAt: lastMessage.createdAt, content: lastMessage.content},
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
        deleteConversationSlice: (state, action) => {
            const conversationId = action.payload.conversationId

            const updateState = [...state]

            return updateState.filter(conversation => {
                return conversation.conversationId !== conversationId
            });

        }
    },

});

export const {setConversations, setLastMessage, addConversation, deleteConversationSlice} = conversationSlice.actions;
export default conversationSlice.reducer;
