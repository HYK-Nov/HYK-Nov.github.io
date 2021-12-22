import { Typography } from "@mui/material";
import React from "react";

function Left(props) {
  const hour = parseInt(props.tick / 3600);
  const min = parseInt((props.tick - 3600 * hour) / 60);
  const sec = parseInt((props.tick - 3600 * hour) % 60);

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        style={{ fontWeight: "bold" }}
      >
        LEFT
      </Typography>
      <Typography variant="h4" gutterBottom component="div">
        {String(hour).padStart(2, "0")}:{String(min).padStart(2, "0")}:
        {String(sec).padStart(2, "0")}
      </Typography>
      <br />
    </div>
  );
}

export default Left;
