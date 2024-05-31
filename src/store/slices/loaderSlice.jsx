import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  loader: true,
  DataLoader: true,
};

const loader = createSlice({
  name: "loader",
  initialState: initial_state,

  reducers: {
    stop_loader(state, action) {
      state.loader = action.payload;
    },
    stopDataLoader(state, action) {
      state.DataLoader = action.payload;
    },
  },
});

export const { stop_loader, stopDataLoader } = loader.actions;
export default loader.reducer;
