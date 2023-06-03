import { combineReducers } from "redux";
import userReducer from "./userReducer";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
const reducer = combineReducers({
  user: userReducer,
});

// create a makeStore function
export const store = configureStore({ reducer });

const makeStore = () => store;

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false });
