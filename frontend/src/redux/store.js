import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import user from "./userSlice";
import conversations from "./conversationSlice";
import messages from "./messagesSlice";
const combinedReducer = combineReducers({
  user,
  conversations,
  messages,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state

      user: action.payload.user,
      conversations: action.payload.conversations,
      messages: action.payload.messages,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: false });
