// OTPTimer.js
import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useTheme } from "styled-components";

const OTPTimer = ({ onResendClick, initialMinutes }) => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
          } else {
            setMinutes((minutes) => minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!isActive && minutes === 0 && seconds === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  return (
    <Box textAlign="center">
      <Typography
        variant="p"
        sx={{
          my: 1,
          fontSize: "small",
          fontWeight: "bold",
          color: primary.main,
        }}
      >
        OTP will expire in
        {isActive
          ? ` ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
          : "You can resend OTP"}
      </Typography>
      <Button
        variant="outlined"
        disabled={isActive}
        onClick={() => {
          setIsActive(true);
          setMinutes(initialMinutes);
          setSeconds(0);
          onResendClick();
        }}
        sx={{
          backgroundColor: primary.main,
          color: secondary.main,
          "&:hover": {
            backgroundColor: primary.main,
            color: secondary.main,
            fontWeight: "bold",
          },
        }}
      >
        Resend OTP
      </Button>
    </Box>
  );
};

export { OTPTimer };
