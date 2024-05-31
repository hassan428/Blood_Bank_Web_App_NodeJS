import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  loginSuccess: false,
  verification: false,
  userID: "",
};

const userLogged = createSlice({
  name: "userLogged",
  initialState: initial_state,
  reducers: {
    setLoginSuccess: (state, actions) => {
      const { payload } = actions;
      state.loginSuccess = payload;
    },
    setUserID: (state, actions) => {
      const { payload } = actions;
      state.userID = payload;
    },
    setVerification: (state, actions) => {
      const { payload } = actions;
      state.verification = payload;
    },
  },
});

export const { setLoginSuccess, setUserID, setVerification } =
  userLogged.actions;
export default userLogged.reducer;
