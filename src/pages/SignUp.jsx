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
import { MdDateRange, MdMarkEmailUnread } from "react-icons/md";
import { SiNamecheap } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTheme } from "styled-components";
import { CustomSelect } from "../component/CustomSelect";
import { Gender } from "../component/Gender";
import axios from "axios";
import { GiBloodyStash } from "react-icons/gi";
import { setLoginSuccess } from "../store/slices/userLoggedSlice";
import { axios_instance } from "../config/axios_instance";
import { stop_loader } from "../store/slices/loaderSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DateComponent } from "../component/DateComponent";
const { baseURL } = axios_instance.defaults;

export const SignUp = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  setTimeout(() => {
    dispatch(stop_loader(false));
  }, 2000);

  // handle input fields
  const input_value = (value, id, event) => {
    if (id == "username") {
      value = value.toLowerCase();
      if (value.length <= 10) {
        value = value.split(" ").join(``);
        setUserNameInput(value);
        setErrMsg("");
        setSignUp({ ...signUp, [id]: value });
      } else {
        setUserNameInput(userNameInput);
        setErrMsg("Username must be 10 characters or less.");
      }
    } else {
      setSignUp({ ...signUp, [id]: value });
    }

    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   // setAvatar(reader.result);
    // };
    // reader.readAsDataURL(file);
    // console.log(reader);
  };

  console.log(signUp);

  const onSubmit = (e) => {
    setErrMsg("");
    e.preventDefault();

    axios
      .post(`${baseURL}/signup`, signUp, { withCredentials: true })
      .then((res) => {
        localStorage.setItem("email", res.data.data.email);
        console.log(res);
        navigate("/verifyOTP");
        dispatch(setLoginSuccess(true));
        dispatch(stop_loader(true));
      })
      .catch((err) => {
        dispatch(setLoginSuccess(false));
        console.log(err.response.data);
        const { message, error } = err.response.data;
        if (message == "Your password must be more than 8 characters") {
          setErrMsg(message);
        } else if (error.errors.birthDate.message) {
          setErrMsg(error.errors.birthDate.message);
        } else if (error.errorResponse) {
          const { code, errmsg } = error.errorResponse;
          if (code === 11000) {
            // Duplicate key error
            if (errmsg.includes("username")) {
              setErrMsg("Username already exists!");
            } else if (errmsg.includes("email")) {
              setErrMsg("email already exists!");
            }
          } else {
            setErrMsg("Error: " + errmsg); // For other types of errors
          }
        } else {
          setErrMsg("An error occurred."); // Default error message
        }
      });
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
          borderRadius: 2,
          m: "20px",
          border: `5px solid ${primary.main}`,
          "@media (max-width: 400px)": {
            width: "100%",
            p: 1,
            pb: 0,
            m: "5px",
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
            Please Sign Up
          </Typography>
        </Stack>

        <form onSubmit={onSubmit} className="p-2">
          {/* First & Last Name */}
          <Box sx={{ mb: 1 }}>
            <div className="flex items-center space-x-2 ">
              <Input_field
                placeholder="First Name"
                id="first_name"
                input_value={input_value}
                classname="mx-2"
                startAdornment={
                  <SiNamecheap className="text-lg text-primary-main" />
                }
              />
              <Input_field
                placeholder="Last Name"
                id="last_name"
                input_value={input_value}
                classname="mx-2"
                startAdornment={
                  <SiNamecheap className="text-lg text-primary-main" />
                }
              />
            </div>

            {/* Username */}
            <Input_field
              placeholder="Username"
              id="username"
              input_value={input_value}
              classname="mx-2"
              val={userNameInput}
              startAdornment={
                <SiNamecheap className="text-lg text-primary-main" />
              }
            />

            {/* Gender */}
            <Gender
              getGenderValue={(gender) => setSignUp({ ...signUp, gender })}
            />

            <DateComponent
              getDateOfBirth={(birthDate) =>
                setSignUp({ ...signUp, birthDate })
              }
              startAdornment={
                <MdDateRange className="text-lg text-primary-main" />
              }
            />

            {/* Blood Group */}
            <CustomSelect
              getBloodValue={(bloodGroup) =>
                setSignUp({ ...signUp, bloodGroup })
              }
            />

            {/* Email */}
            <Input_field
              type="email"
              placeholder="Enter Email"
              id="email"
              input_value={input_value}
              classname="mx-2 my-1"
              startAdornment={
                <MdMarkEmailUnread className="text-lg text-primary-main" />
              }
            />

            {/* Password */}
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

            {/* imageURL */}
            {/* <Input_field
              type="file"
              placeholder="Enter Email"
              id="imageUrl"
              input_value={input_value}
              classname="mx-2 my-1"
              startAdornment={
                <MdMarkEmailUnread className="text-lg text-primary-main" />
              }
            /> */}
          </Box>
          {/* Error Message */}
          <Typography
            variant="body2"
            sx={{
              fontSize: "small",
              fontWeight: "bold",
              color: "red",
            }}
          >
            {errMsg}
          </Typography>

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              onClick={() => dispatch(stop_loader(true))}
              to="/login"
              style={{ color: primary.main }}
            >
              Login
            </Link>
          </Typography>

          {/* Sign Up Button */}
          <Btn
            tooltip_text="Sign Up"
            type="submit"
            text="Sign Up"
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
