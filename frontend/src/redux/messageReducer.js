const messageReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CONVERSATION":
      return (state = action.payload.messages);

    default:
      return state;
  }
};

export default messageReducer;
