const initialState = {
  conversationId: null,
  user: null,
  messages: [],
};
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONVERSATION":
      const { conversationId, user, messages } = action.payload;
      return (state = {
        conversationId,
        user,
        messages,
      });
    case "ADD_MESSAGE":
      const { message } = action.payload;
      return {
        ...state,
        messages: [...state.messages, message],
      };
    default:
      return state;
  }
};

export default messageReducer;
