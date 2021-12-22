import { Typography } from "@mui/material";
import React from "react";

function Now(props) {
  const hour =
    props.date.getHours() < 13
      ? props.date.getHours()
      : props.date.getHours() - 12;
  const meridiem = props.date.getHours() < 12 ? 0 : 1;
  const meridiemInfo = [
    ["AM", "#F94144"],
    ["PM", "#248BDA"],
  ];

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        style={{ fontWeight: "bold" }}
      >
        NOW
      </Typography>
      <Typography variant="h4" gutterBottom component="div">
        {String(hour).padStart(2, "0")}:
        {String(props.date.getMinutes()).padStart(2, "0")}:
        {String(props.date.getSeconds()).padStart(2, "0")} &nbsp;
        <Typography
          variant="h5"
          gutterBottom
          component="span"
          style={{ color: meridiemInfo[meridiem][1] }}
        >
          {meridiemInfo[meridiem][0]}
        </Typography>
      </Typography>
    </div>
  );
}
export default Now;
