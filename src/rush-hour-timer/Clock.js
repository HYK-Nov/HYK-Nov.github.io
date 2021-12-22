import React, { useEffect, useRef, useState } from "react";
import Limit from "./Limit";
import Now from "./Now";
import Today from "./Today";
import {
  Alert,
  Avatar,
  Button,
  Collapse,
  Container,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import DirectionsRunRoundedIcon from "@mui/icons-material/DirectionsRunRounded";
import Swal from "sweetalert2";

function Clock() {
  let now = new Date();
  // const [hour, setHour] = useState(now.getHours());
  // const [min, setMin] = useState(now.getMinutes());
  const [sec, setSec] = useState(now.getSeconds());
  const interval = useRef(null);
  const [limitHour, setLimitHour] = useState("18");
  const [limitMin, setLimitMin] = useState("00");
  const [open, setOpen] = React.useState(true);

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
    <Container maxWidth="xs">
      <Collapse in={open} style={{ margin: "1rem 0 1rem 0" }}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseRoundedIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 1 }}
        >
          <strong>당일</strong> 퇴근 할 경우에만 쓰세요
        </Alert>
      </Collapse>
      <Stack spacing={2}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "#2196f3",
            width: "3.5rem",
            height: "3.5rem",
          }}
        >
          <DirectionsRunRoundedIcon fontSize="large" />
        </Avatar>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ textAlign: "center" }}
        >
          RUSH HOUR TIMER
        </Typography>
        <List sx={{ bgcolor: "white" }}>
          <ListItem>
            <Today date={now} />
          </ListItem>
          <ListItem>
            <Now date={now} />
          </ListItem>
          <ListItem>
            <Limit limitHour={limitHour} limitMin={limitMin} />
          </ListItem>
          <ListItem>
            <Stack component="form" direction="row" spacing={2} noValidate>
              {/* <Typography variant="h6" gutterBottom>
                TIME SET &nbsp;
              </Typography> */}
              {/* <input id={"setTimer"} type={"time"} defaultValue={"18:00"} /> */}
              <TextField
                id="setTimer"
                label="Time Setting"
                type="time"
                defaultValue="18:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: "13rem" }}
              />
              <Button
                variant="contained"
                onClick={setTimerOnClick}
                startIcon={<AccessTimeFilledRoundedIcon />}
              >
                APPLY
              </Button>
            </Stack>
          </ListItem>
        </List>
        <br />
      </Stack>
    </Container>
  );
}
export default Clock;
