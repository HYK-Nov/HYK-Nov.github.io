import { Typography } from "@mui/material";
import React from "react";

function Today(props) {
  const day_E = [
    ["MON", "#F94144"],
    ["TUE", "#F8961E"],
    ["WED", "#F9C74F"],
    ["THU", "#20c997"],
    ["FRI", "#248BDA"],
    ["SAT", "#323C73"],
    ["SUN", "#902E54"],
  ];

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        style={{ fontWeight: "bold" }}
      >
        TODAY
      </Typography>
      <Typography variant="h4" gutterBottom component="div">
        {props.date.getFullYear()}-
        {String(props.date.getMonth() + 1).padStart(2, "0")}-
        {String(props.date.getDate()).padStart(2, "0")} &nbsp;
        <Typography
          variant="h5"
          gutterBottom
          component="span"
          style={{
            color: day_E[props.date.getDay() - 1][1],
            fontWeight: "bold",
          }}
        >
          {day_E[props.date.getDay() - 1][0]}
        </Typography>
      </Typography>
    </div>
  );
}

export default Today;
