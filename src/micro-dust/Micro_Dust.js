import React, { useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  LinearProgress,
  Box,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { HomeRounded } from "@mui/icons-material";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

function Micro_Dust() {
  /* 오픈API 불러오기 */
  const [area, setArea] = useState("서울");
  const API_KEY = process.env.REACT_APP_API_KEY;

  let pm10 = 0,
    pm25 = 0,
    o3 = 0;
  let date;

  //시도별 실시간 측정정보 조회
  axios
    .get(
      `/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=100&pageNo=1&sidoName=${encodeURIComponent(
        area
      )}&ver=1.0`
    )
    .then((res) => {
      const data = res.data.response.body.items;
      console.log(data);

      //pm10(미세먼지) 평균
      for (let i = 0; i < data.length; i++) {
        if (data[i].pm10Value !== "-") {
          pm10 += Number(data[i].pm10Value);
        }
      }
      pm10 = Math.round(pm10 / data.length);

      //pm2.5(초미세먼지) 평균
      for (let i = 0; i < data.length; i++) {
        if (data[i].pm25Value !== "-") {
          pm25 += Number(data[i].pm25Value);
        }
      }
      pm25 = Math.round(pm25 / data.length);

      //o3(오존) 평균
      for (let i = 0; i < data.length; i++) {
        if (data[i].o3Value == "-") {
          data[i].o3Value = 0;
        }
        o3 += Number(data[i].o3Value);
      }
      o3 = (o3 / data.length).toFixed(3);
    })
    .catch((err) => {
      console.log(err);
    });

  const PM_Color = ["#32A1FF", "#00C73C", "#FDA60E", "#E64746"];
  const [changePMColor, setChangePMColor] = useState(0);
  const buttonTheme = createTheme({
    palette: {
      primary: {
        main: PM_Color[changePMColor],
      },
    },
  });

  return (
    <>
      <Link to="/">
        <HomeRounded fontSize="large" sx={{ pt: 2 }} />
      </Link>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={area}
          onChange={(e) => {
            setArea(e.target.value);
          }}
        >
          <MenuItem value={"서울"}>서울</MenuItem>
          <MenuItem value={"부산"}>부산</MenuItem>
          <MenuItem value={"대구"}>대구</MenuItem>
          <MenuItem value={"인천"}>인천</MenuItem>
          <MenuItem value={"광주"}>광주</MenuItem>
          <MenuItem value={"대전"}>대전</MenuItem>
          <MenuItem value={"울산"}>울산</MenuItem>
          <MenuItem value={"경기"}>경기</MenuItem>
          <MenuItem value={"강원"}>강원</MenuItem>
          <MenuItem value={"충북"}>충북</MenuItem>
          <MenuItem value={"충남"}>충남</MenuItem>
          <MenuItem value={"전북"}>전북</MenuItem>
          <MenuItem value={"전남"}>전남</MenuItem>
          <MenuItem value={"경북"}>경북</MenuItem>
          <MenuItem value={"경남"}>경남</MenuItem>
          <MenuItem value={"제주"}>제주</MenuItem>
          <MenuItem value={"세종"}>세종</MenuItem>
        </Select>
        <FormHelperText>지역명</FormHelperText>
      </FormControl>
      <Box sx={{ width: "100%" }}>
        <h3>미세먼지</h3>
        <LinearProgress
          id="PM_progress1"
          variant="determinate"
          value={pm10 / 2}
        />
        <h3>초미세먼지</h3>
        <LinearProgress
          id="PM_progress2"
          color="secondary"
          variant="determinate"
          value={pm25}
        />
      </Box>
      <div>
        {pm10} / {pm25}
      </div>
    </>
  );
}

export default Micro_Dust;
