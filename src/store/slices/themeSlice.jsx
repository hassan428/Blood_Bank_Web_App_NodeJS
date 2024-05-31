import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  theme: localStorage.getItem("theme"),
};

const theme = createSlice({
  name: "theme",
  initialState: initial_state,
  reducers: {
    themeChange: (state, actions) => {
      const { payload } = actions;
      // console.log(payload);
      state.theme = payload;
    },
  },
});

export const { themeChange } = theme.actions;
export default theme.reducer;
