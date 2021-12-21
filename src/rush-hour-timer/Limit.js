import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Gohome from "./Gohome";
import Left from "./Left";

function Limit(props) {
  let now = new Date();
  const [hour, setHour] = useState(now.getHours());
  const [min, setMin] = useState(now.getMinutes());
  const [sec, setSec] = useState(now.getSeconds());
  const tick =
    (parseInt(props.limitHour) - 1 - hour) * 60 * 60 +
    (60 - min + parseInt(props.limitMin) - 1) * 60 +
    (60 - sec);
  const [limitTime, setLimitTime] = useState(tick);
  const interval = useRef(null);
  const [overTime, setOverTime] = useState(false);

  useEffect(() => {
    interval.current = setInterval(() => {
      now = new Date();
      setHour(now.getHours());
      setMin(now.getMinutes());
      setSec(now.getSeconds());
      setLimitTime((limitTime) => limitTime - 1);
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    setLimitTime(tick);
    if (limitTime <= 0) {
      setOverTime(true);
      Swal.fire({
        icon: "success",
        title: "Go Home",
        text: "집에 가라",
        showConfirmButton: false,
        timer: 2000,
      });
      clearInterval(interval.current);
    }
  }, [sec]);

  return overTime ? <Gohome /> : <Left tick={tick} />;
}

export default Limit;
