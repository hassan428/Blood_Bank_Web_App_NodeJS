// import PropTypes from 'prop-types'
import { Input, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import React from "react";
import { useTheme } from "styled-components";

export const Input_field = (props) => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;
  const {
    val,
    type,
    placeholder,
    endAdornment,
    id,
    label,
    classname,
    startAdornment,
  } = props;
  return (
    <>
      <div className="flex w-full my-2 items-center space-x-1">
        <label className="font-black xl:text-xl cursor-pointer" htmlFor={id}>
          {startAdornment}
        </label>
        <OutlinedInput
          sx={{
            border: "1px solid black",

            borderRadius: "5px",
            // backgroundColor: "white",
            ":hover": {
              backgroundColor: secondary.main,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "2px solid black",
            },
          }}
          endAdornment={endAdornment}
          variant="outlined"
          type={type}
          required={true}
          value={val}
          placeholder={`${placeholder}`}
          size="small"
          id={id}
          label={label}
          onChange={(e) => props.input_value(e.target.value, e.target.id, e)}
          className={` w-full text-center rounded-lg border border-black bg-white hover:bg-secondary-main ${classname}`}
        />
      </div>
    </>
  );
};
