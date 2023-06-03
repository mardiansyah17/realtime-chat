import { createReducer, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  name: "mardi",
  email: "",
  picture: "",
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return (state = action.payload);

    default:
      return state;
  }
};

export default userReducer;
