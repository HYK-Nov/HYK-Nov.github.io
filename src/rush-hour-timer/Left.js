import React from "react";

function Left(props) {
  const hour = parseInt(props.tick / 3600);
  const min = parseInt((props.tick - 3600 * hour) / 60);
  const sec = parseInt((props.tick - 3600 * hour) % 60);

  return (
    <div>
      <h2>Left</h2>
      <h1>
        {String(hour).padStart(2, "0")}:{String(min).padStart(2, "0")}:
        {String(sec).padStart(2, "0")}
        <br />
        {/* {hour}시간 {min}분 {sec}초 */}
      </h1>
    </div>
  );
}

export default Left;
