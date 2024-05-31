import { Stack, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { GiBloodyStash } from "react-icons/gi";
import { useTheme } from "styled-components";
import { OTPTimer } from "../component/TimeButton";
import axios from "axios";
import { axios_instance } from "../config/axios_instance";
import { useNavigate } from "react-router-dom";
import {
  setLoginSuccess,
  setVerification,
} from "../store/slices/userLoggedSlice";
import { useDispatch } from "react-redux";
import { auth_check } from "../authMethod/Auth_funcion";
import { stop_loader } from "../store/slices/loaderSlice";
const { baseURL } = axios_instance.defaults;

const OTPInput = ({ route_navigate, apis_end_point, localStorageProps }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { primary, secondary } = theme.palette;
  const [errMsg, setErrMsg] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      dispatch(stop_loader(true));
      navigate("/");
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false; // only allow numbers
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    setErrMsg("");
    // Move to next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const submit_otp_handle = (element, index) => {
    if (element.value.length > 1) {
      element.value = element.value[0]; // ensure only one character per input
      handleChange(element, index);
    }

    if (otp.every((num) => num !== "")) {
      console.log("Complete OTP:", otp.join(""));
      const completeOTP = otp.join("");
      console.log({ email, code: completeOTP });

      axios
        .post(
          // `${baseURL}/verify_otp`,
          baseURL + apis_end_point,
          { email, code: completeOTP },
          { withCredentials: true }
        )
        .then((res) => {
          auth_check(dispatch);
          navigate(route_navigate);
          console.log(res);
          localStorageProps();
          // localStorage.removeItem("email");
          dispatch(stop_loader(true));
        })
        .catch((err) => {
          dispatch(setVerification(false));
          console.log(err.response.data.message);
          setErrMsg(err.response.data.message);
        });
    }
  };

  const onResendClick = () => {
    console.log("Resend Clicked");
  };

  return (
    <div className="bg-image flex items-center justify-center min-h-screen">
      <div className="p-5 bg-secondary-main rounded-lg shadow-xl max-w-min">
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <GiBloodyStash className="text-3xl mr-1 items-center text-primary-main" />
          <Typography
            variant="h4"
            sx={{
              "@media(max-width: 500px)": {
                fontSize: "xx-large",
              },
              color: primary.main,
              fontSize: "40px",
              py: 1,
              textAlign: "center",
              fontWeight: "bold",
              //   bgcolor: primary.main,
            }}
          >
            BLOODY
          </Typography>
        </Stack>
        <Typography
          variant="p"
          sx={{
            fontSize: "x-small",
            textAlign: "center",
          }}
        >
          An OTP has been sent to your email address. Please check your email to
          proceed with verification.{" "}
          <a
            className="text-blue-600"
            target="_blank"
            href="https://mail.google.com/"
          >
            https://mail.google.com/
          </a>
        </Typography>
        <h2 className="text-xs my-1">Your email: {email}</h2>
        <h2 className="text-lg font-bold">Enter your OTP</h2>
        <div className="flex space-x-2 justify-center">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="otp-field w-9 h-12 sm:w-12 text-center text-xl font-bold rounded bg-white "
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyUp={(e) => submit_otp_handle(e.target, index)}
              ref={(ref) => (inputsRef.current[index] = ref)}
            />
          ))}
        </div>
        {/* Error Message */}
        <Typography
          variant="body2"
          sx={{
            my: 1,
            fontSize: "x-small",
            fontWeight: "bold",
            color: "red",
          }}
        >
          {errMsg}
        </Typography>

        <OTPTimer onResendClick={onResendClick} initialMinutes={2} />
      </div>
    </div>
  );
};
export { OTPInput };
