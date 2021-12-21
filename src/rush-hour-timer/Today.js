import React from "react";

function Today(props) {
  const day_E = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  // const day_K = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div>
      <h2>Today</h2>
      <h1>
        {props.date.getFullYear()}-
        {String(props.date.getMonth() + 1).padStart(2, "0")}-
        {String(props.date.getDate()).padStart(2, "0")} &nbsp;
        {day_E[props.date.getDay() - 1]}
      </h1>
      {/* <h1>
        {props.date.getFullYear()}년 {props.date.getMonth() + 1}월{" "}
        {props.date.getDate()}일 {day_K[props.date.getDay() - 1]}요일
      </h1> */}
    </div>
  );
}

export default Today;
