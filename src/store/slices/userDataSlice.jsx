import { createSlice } from "@reduxjs/toolkit";

const initial_state = {};

const userData = createSlice({
  name: "userData",
  initialState: initial_state,
  reducers: {
    getUserData: (state, actions) => {
      const { payload } = actions;
      console.log("user", payload);
      return (state = payload);
    },
  },
});

export const { getUserData } = userData.actions;
export default userData.reducer;
