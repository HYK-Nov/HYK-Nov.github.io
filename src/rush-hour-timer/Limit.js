import { Snackbar } from "@material-ui/core";
import { Button, IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
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
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseRounded fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const useNotification = (title, options) => {
    if (!("Notification" in window)) {
      return;
    }

    const fireNotif = () => {
      /* 권한 요청 부분 */
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            /* 권한을 요청받고 nofi를 생성해주는 부분 */
            new Notification(title, options);
          } else {
            return;
          }
        });
      } else {
        /* 권한이 있을때 바로 noti 생성해주는 부분 */
        new Notification(title, options);
      }
    };
    return fireNotif;
  };

  const triggerNotif = useNotification("Go Home", {
    body: "집에 가라",
  });

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
      setOpen(true);
      Swal.fire({
        icon: "success",
        title: "Go Home",
        text: "집에 가라",
        showConfirmButton: false,
        timer: 3000,
      });
      triggerNotif();
      clearInterval(interval.current);
    }
  }, [sec]);

  return (
    <>
      {overTime ? <Gohome /> : <Left tick={tick} />}
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Go Home"
        action={action}
      /> */}
    </>
  );
}

export default Limit;
