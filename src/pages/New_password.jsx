import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Input_field } from "../component/Input_field";
import { Btn } from "../component/Btn";
import { TbPasswordUser } from "react-icons/tb";
import { MdMarkEmailUnread } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { GiBloodyStash } from "react-icons/gi";
import axios from "axios";
import { axios_instance } from "../config/axios_instance";
import {
  setLoginSuccess,
  setVerification,
} from "../store/slices/userLoggedSlice";
import { auth_check } from "../authMethod/Auth_funcion";
import { stop_loader } from "../store/slices/loaderSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const { baseURL } = axios_instance.defaults;

export const New_password = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const [newPassword, setNewPassword] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      dispatch(stop_loader(true));
      navigate("/");
    }
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const input_value = (value, id) => {
    setNewPassword({ ...newPassword, [id]: value });
  };

  console.log(newPassword);

  const onSubmit = (e) => {
    e.preventDefault();
    const { password, confirm_password } = newPassword;
    newPassword.email = email;
    if (password !== confirm_password) {
      setErrMsg("Confirm Password does not match");
    } else {
      axios
        .post(`${baseURL}/set_new_password`, newPassword, {
          withCredentials: true,
        })
        .then((res) => {
          auth_check(dispatch);
          console.log(res.data);

          localStorage.removeItem("email");
          dispatch(stop_loader(true));
        })
        .catch((err) => {
          dispatch(setLoginSuccess(false));
          console.log(err.response.data.message);
          const { message } = err.response.data;
          setErrMsg(message);
        });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-image">
      <Paper
        elevation={24}
        square
        sx={{
          height: "auto",
          width: "80%",
          maxWidth: 500,
          p: 2,
          bgcolor: secondary.main,
          border: `5px solid ${primary.main}`,
        }}
      >
        <Stack
          sx={{
            mb: 2,
            textAlign: "center",
            borderLeft: `2px solid ${primary.main}`,
            borderRight: `2px solid ${primary.main}`,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: primary.main,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GiBloodyStash className="mr-1 text-primary-main" />
            BLOODY
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Set New Password
          </Typography>
        </Stack>

        <form onSubmit={onSubmit} className="p-2">
          {/* password */}
          <Box sx={{ mb: 2 }}>
            <Input_field
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff color="error" />
                    ) : (
                      <Visibility color="error" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              id="password"
              input_value={input_value}
              startAdornment={
                <TbPasswordUser className="text-lg text-primary-main" />
              }
            />

            {/* confirm password */}
            <Input_field
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff color="error" />
                    ) : (
                      <Visibility color="error" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter Confirm Password"
              id="confirm_password"
              input_value={input_value}
              startAdornment={
                <TbPasswordUser className="text-lg text-primary-main" />
              }
            />

            {/* Error Message */}
            <Typography variant="body2" sx={{ color: "red" }}>
              {errMsg}
            </Typography>
          </Box>

          {/* Login Button */}
          <Btn
            tooltip_text="Set Password"
            type="submit"
            text="Set Password"
            sx={{
              mx: 0,
              fontSize: "medium",
              p: 0,
              width: "100%",
              borderRadius: 5,
              "@media(max-width: 500px)": {
                fontSize: "small",
              },
            }}
          />
        </form>
      </Paper>
    </div>
  );
};
