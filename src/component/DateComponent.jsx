import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useTheme } from "styled-components";
import { Stack } from "@mui/material";

export function DateComponent({ startAdornment, getDateOfBirth }) {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "DatePicker",
          "MobileDatePicker",
          "DesktopDatePicker",
          "StaticDatePicker",
        ]}
        className={` w-full text-center rounded-lg border border-black bg-white hover:bg-secondary-main`}
      >
        <Stack flexDirection={"row"} alignItems={"center"}>
          <label
            className="font-black xl:text-xl mr-1 cursor-pointer"
            htmlFor={"Date Of Birth"}
          >
            {startAdornment}
          </label>
          <MobileDatePicker
            label="Date Of Birth"
            sx={{
              borderRadius: "5px",
              backgroundColor: "white",
              mb: 2,
              width: "100%",
              ":hover": {
                backgroundColor: secondary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid black",
              },
            }}
            onChange={(e) => getDateOfBirth(e.$d)}
          />
        </Stack>
      </DemoContainer>
    </LocalizationProvider>
  );
}
