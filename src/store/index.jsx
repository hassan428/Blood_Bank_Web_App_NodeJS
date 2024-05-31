import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import userDataSlice from "./slices/userDataSlice";
import userLoggedSlice from "./slices/userLoggedSlice";
// import bloodGroupSlice from "./slices/bloodGroupSlice";
import anOtherUserSlice from "./slices/anOtherUserSlice";
import loaderSlice from "./slices/loaderSlice";

const store = configureStore({
  reducer: {
    userData: userDataSlice,
    userLogged: userLoggedSlice,
    theme: themeSlice,
    // bloodGroup: bloodGroupSlice,
    anOtheruserData: anOtherUserSlice,
    loader: loaderSlice,
  },
});
export default store;
