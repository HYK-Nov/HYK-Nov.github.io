import React from "react";

function Now(props) {
  const hour =
    props.date.getHours() < 13
      ? props.date.getHours()
      : props.date.getHours() - 12;
  const meridiem = props.date.getHours() < 12 ? "AM" : "PM";

  return (
    <div>
      <h2>Now</h2>
      <h1>
        {String(hour).padStart(2, "0")}:
        {String(props.date.getMinutes()).padStart(2, "0")}:
        {String(props.date.getSeconds()).padStart(2, "0")} &nbsp;
        {meridiem}
      </h1>
      {/* <h1>
        {hour}시간
        {props.date.getMinutes()}분{props.date.getSeconds()}초 &nbsp;
        {meridiem}
      </h1> */}
    </div>
  );
}
export default Now;
