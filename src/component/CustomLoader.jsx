import { CircularProgress } from "@mui/material";
import React from "react";
import { useTheme } from "styled-components";

export const CustomLoader = () => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  // console.log(primary.main)
  return (
    <div className="min-h-screen flex justify-center items-center bg-inherit">
      <CircularProgress sx={{ color: primary.main }} />
    </div>
  );
};
