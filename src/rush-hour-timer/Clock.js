import React, { useEffect, useRef, useState } from "react";
import Limit from "./Limit";
import Now from "./Now";
import Today from "./Today";

function Clock() {
  let now = new Date();
  const [hour, setHour] = useState(now.getHours());
  const [min, setMin] = useState(now.getMinutes());
  const [sec, setSec] = useState(now.getSeconds());
  const interval = useRef(null);
  const [limitHour, setLimitHour] = useState("18");
  const [limitMin, setLimitMin] = useState("00");

  useEffect(() => {
    interval.current = setInterval(() => {
      now = new Date();
      // setHour(now.getHours());
      // setMin(now.getMinutes());
      setSec(now.getSeconds());
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  const setTimerOnClick = (e) => {
    e.preventDefault();
    setLimitHour(document.getElementById("setTimer").value.slice(0, 2));
    setLimitMin(document.getElementById("setTimer").value.slice(3, 5));
  };

  return (
    <>
      <Today date={now} />
      <Now date={now} />
      <Limit limitHour={limitHour} limitMin={limitMin} />
      <form>
        시간 입력 &nbsp;
        <input id={"setTimer"} type={"time"} defaultValue={"18:00"} />
        <button onClick={setTimerOnClick}>submit</button>
      </form>
    </>
  );
}
export default Clock;
