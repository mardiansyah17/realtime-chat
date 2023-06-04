const initialState = {
  conversationId: null,
  messages: [],
};
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONVERSATION":
      const { conversationId, messages } = action.payload;
      return (state = {
        conversationId,
        messages,
      });

    default:
      return state;
  }
};

export default messageReducer;
