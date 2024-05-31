import { createSlice } from "@reduxjs/toolkit";

const initial_state = [];

const anOtheruserData = createSlice({
  name: "anOtheruserData",
  initialState: initial_state,
  reducers: {
    getOtherUserData: (state, actions) => {
      const { payload } = actions;
      console.log("otherdata", payload);
      return (state = payload);
    },
  },
});

export const { getOtherUserData } = anOtheruserData.actions;
export default anOtheruserData.reducer;
