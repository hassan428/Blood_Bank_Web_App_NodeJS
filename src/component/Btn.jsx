import React from "react";
import { Button, Fade, Tooltip, Zoom, tooltipClasses } from "@mui/material";
import { useTheme } from "styled-components";

const Btn = (props) => {
  const theme = useTheme();
  const { primary, secondary } = theme.palette;

  const { tooltip_text, onclick, text, sx, type, startIcon } = props;
  return (
    <Tooltip
      TransitionComponent={Zoom}
      arrow
      title={tooltip_text}
      placement="bottom"
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
              {
                marginTop: 0,
                bgcolor: "black",
                fontWeight: "bold",
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
              {
                marginBottom: "1px",
                bgcolor: "black",
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
              {
                marginLeft: "0px",
                bgcolor: "black",
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
              {
                marginRight: "0px",
                bgcolor: "black",
              },
          },
        },
      }}
    >
      <Button
        onClick={onclick}
        type={type}
        size="small"
        startIcon={startIcon}
        variant="contained"
        sx={{
          bgcolor: primary.main,
          color: secondary.main,
          p: 0.5,
          fontSize: "x-large",
          fontWeight: "bold",
          border: `2px solid ${secondary.main}`,

          ":hover": {
            bgcolor: secondary.main,
            color: primary.main,
            border: `2px solid ${primary.main}`,
          },

          textTransform: "capitalize",
          ...sx,
        }}
      >
        {text}
      </Button>
    </Tooltip>
  );
};

export { Btn };
