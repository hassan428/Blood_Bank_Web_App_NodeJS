import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
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

export const LogIn = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const input_value = (value, id) => {
    setErrMsg("");
    setLogIn({ ...logIn, [id]: value });
  };

  setTimeout(() => {
    dispatch(stop_loader(false));
  }, 2000);
  console.log(logIn);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseURL}/login`, logIn, { withCredentials: true })
      .then((res) => {
        auth_check(dispatch);
        console.log(res.data);
        dispatch(setVerification(true));
        dispatch(setLoginSuccess(true));
        dispatch(stop_loader(true));
      })
      .catch((err) => {
        dispatch(setLoginSuccess(false));
        console.log(err.response.data);
        const { message } = err.response.data;
        if (!message) {
          setErrMsg("An error occurred.");
        } else {
          setErrMsg(message);
        }
      });
  };

  const handleForgotPassword = () => {
    const { email } = logIn;

    if (email) {
      // Email validation pattern
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      if (emailPattern.test(email)) {
        localStorage.setItem("email", email);
        axios
          .post(`${baseURL}/send_otp`, { email }, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            dispatch(stop_loader(true));
            navigate("/forgetpasswordOTP");
          })
          .catch((err) => {
            localStorage.removeItem("email");
            console.log(err);
          });
      } else {
        setErrMsg("Please enter a valid email address.");
      }
    } else {
      setErrMsg("Please enter your email address.");
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
          pb: 0,
          bgcolor: secondary.main,
          border: `5px solid ${primary.main}`,
          "@media (max-width: 400px)": {
            width: "90%",
            p: 1,
            pb: 0,
          },
        }}
      >
        <Stack
          sx={{
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
            Please Log In
          </Typography>
        </Stack>

        <form onSubmit={onSubmit} className="p-2">
          {/* Input fields */}
          <Box sx={{ mb: 1 }}>
            <Input_field
              type="email"
              placeholder="Enter Email"
              id="email"
              input_value={input_value}
              startAdornment={
                <MdMarkEmailUnread className="text-lg text-primary-main" />
              }
            />

            <Input_field
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
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

            {/* Error Message */}
            <Typography
              variant="body2"
              sx={{ color: "red", fontWeight: "bold", fontSize: "small" }}
            >
              {errMsg}
            </Typography>

            {/* Forgot Password link */}
            <Typography
              variant="body2"
              sx={{ ":hover": { textDecorationLine: "underline" } }}
            >
              <Link
                onClick={handleForgotPassword}
                // style={{ color: primary.main }}
              >
                Forgot Password?
              </Link>
            </Typography>
          </Box>

          {/* Sign Up link */}
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              onClick={() => dispatch(stop_loader(true))}
              style={{ color: primary.main }}
            >
              SignUp
            </Link>
          </Typography>

          {/* Login Button */}
          <Btn
            tooltip_text="Login"
            type="submit"
            text="Login"
            sx={{
              m: 0,
              fontSize: "larger",
              p: 0,
              width: "100%",
              borderRadius: 5,
              "@media(max-width: 500px)": {
                fontSize: "medium",
              },
            }}
          />
        </form>
      </Paper>
    </div>
  );
};
