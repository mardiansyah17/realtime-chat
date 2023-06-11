import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
