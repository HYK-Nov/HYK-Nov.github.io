import React, { useEffect, useMemo, useRef, useState } from "react";
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
  Menu,
  MenuItem,
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
  MenuRounded,
  HomeRounded,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Rush_Hour_Timer() {
  let now = new Date();
  // const [hour, setHour] = useState(now.getHours());
  // const [min, setMin] = useState(now.getMinutes());
  const [sec, setSec] = useState(now.getSeconds());
  const interval = useRef(null);
  const [limitHour, setLimitHour] = useState("18");
  const [limitMin, setLimitMin] = useState("00");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    interval.current = setInterval(() => {
      now = new Date();
      // setHour(now.getHours());
      // setMin(now.getMinutes());
      setSec(now.getSeconds());
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (now.getDay() === 6 || now.getDay() === 7) {
      Swal.fire({
        title: "저런! 오늘은 주말이랍니다",
        text: "일하러 나오셨다니 안타깝군요",
        imageUrl:
          "https://w.namu.la/s/dcac377b449edd131d6a622ba068e29295fc0600192b61a4402cf2dd96b4dd4a9ee3eb5ee4ac8fc6a55c5b3b53f25ae3b4a2245fa9bfbcb8f6cddf9bf6129d751e0bbc148176715a8be0e1394dbfe4c7b17511ca4bb2f07e1af144576734028ba4d573bc34579d28e22b7d69831d3983",
        imageWidth: 250,
        imageHeight: 250,
      });
    }
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
  const [changeThemeColor, setChangeThemeColor] = useState(5);
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
      <Link to="/">
        <HomeRounded fontSize="large" sx={{ color: "white", pt: 2 }} />
      </Link>
      <Collapse in={open} sx={{ pt: 1 }}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(!open);
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
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Grid item>
              <IconButton aria-label="menu">
                <MenuRounded />
              </IconButton>
              <Menu id="basic-menu">
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <Grid container sx={{ px: 2 }}>
            <Grid item xs={12} sx={{ pb: 3 }}>
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
                sx={{ textAlign: "center", mt: 2 }}
              >
                RUSH HOUR TIMER
              </Typography>
            </Grid>
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
          <Grid container sx={{ pt: 2, pb: 1 }}>
            {themeColor.map((value, idx) => (
              <Grid key={idx} item xs>
                <Box
                  id={idx}
                  sx={{
                    width: "2em",
                    height: "1.5em",
                    position: "absolute",
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
export default Rush_Hour_Timer;
