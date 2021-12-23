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
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import {
  red,
  pink,
  deepPurple,
  lightBlue,
  lime,
  amber,
} from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CloseRounded,
  AccessTimeFilledRounded,
  DirectionsRunRounded,
} from "@mui/icons-material";
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

  //MUI 관련
  const themeColor = [
    red[400],
    pink[400],
    deepPurple[400],
    lightBlue[400],
    lime[400],
    amber[400],
  ];
  const [changeThemeColor, setChangeThemeColor] = useState(0);
  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: themeColor[changeThemeColor],
      },
    },
  });
  document.body.style.backgroundColor = themeColor[changeThemeColor];

  const changeTheme = (e) => {
    setChangeThemeColor(e.target.getAttribute("id"));
  };

  return (
    <Container maxWidth="xs" variant="middle">
      <Collapse in={open} sx={{ mt: 2 }}>
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
              <CloseRounded fontSize="inherit" />
            </IconButton>
          }
        >
          <strong>당일</strong> 퇴근 할 경우에만 쓰세요
        </Alert>
      </Collapse>
      <Box
        sx={{
          my: 2,
          py: 3,
          px: 5,
          boxShadow: 2,
          borderRadius: 3,
          display: "flex",
        }}
        style={{ backgroundColor: "white" }}
      >
        <Stack spacing={2}>
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: themeColor[changeThemeColor],
              width: "3.5rem",
              height: "3.5rem",
              mt: 2,
            }}
          >
            <DirectionsRunRounded fontSize="large" />
          </Avatar>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ textAlign: "center" }}
          >
            RUSH HOUR TIMER
          </Typography>
          <Grid container spacing={2} sx={{ py: 3 }}>
            <Grid item xs={12}>
              <Today date={now} />
            </Grid>
            <Grid item xs={12}>
              <Now date={now} />
            </Grid>
            <Grid item xs={12}>
              <Limit limitHour={limitHour} limitMin={limitMin} xs={12} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={8} sx={{ pr: 1 }}>
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
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={4} sx={{ pl: 1 }}>
              <ThemeProvider theme={buttonTheme}>
                <Button
                  variant="contained"
                  onClick={setTimerOnClick}
                  startIcon={<AccessTimeFilledRounded />}
                  color={buttonTheme.primary}
                  style={{ height: "100%" }}
                >
                  APPLY
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
          <Grid container sx={{ pt: 2 }}>
            {themeColor.map((value, idx) => (
              <Grid key={idx} item xs>
                <Box
                  id={idx}
                  sx={{
                    height: "2rem",
                    width: "2rem",
                    backgroundColor: value,
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: value,
                      opacity: [0.9, 0.8, 0.7],
                    },
                    mx: 1,
                  }}
                  onClick={changeTheme}
                />
              </Grid>
            ))}
          </Grid>
          <br />
        </Stack>
      </Box>
    </Container>
  );
}
export default Clock;
