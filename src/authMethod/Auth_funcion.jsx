import {
  setLoginSuccess,
  setVerification,
} from "../store/slices/userLoggedSlice";
import { getUserData } from "../store/slices/userDataSlice";
import { axios_instance } from "../config/axios_instance";
import axios from "axios";
import { getOtherUserData } from "../store/slices/anOtherUserSlice";
const { baseURL } = axios_instance.defaults;

export const auth_check = async (dispatch) => {
  await axios
    .get(`${baseURL}/auth_check`, { withCredentials: true })
    .then((res) => {
      const { user, other_user } = res.data.data;
      dispatch(getUserData(user));
      dispatch(getOtherUserData(other_user));
      dispatch(setLoginSuccess(true));
      dispatch(setVerification(true));
      console.log(res);
    })
    .catch((err) => {
      dispatch(setLoginSuccess(false));
      dispatch(setVerification(false));
      console.log(err);
    });
};
