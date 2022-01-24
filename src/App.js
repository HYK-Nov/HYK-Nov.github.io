import React from "react";
import { Route, Routes } from "react-router-dom";
import Bakery_Place from "./bakery-place/Bakery_Place";
import Main from "./main-page/Main";
import Micro_Dust from "./micro-dust/Micro_Dust";
import Random_Pepe from "./random-pepe/Random_Pepe";
import Rush_Hour_Timer from "./rush-hour-timer/Rush_Hour_Timer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/rush-hour-timer" element={<Rush_Hour_Timer />} />
        <Route path="/random-pepe" element={<Random_Pepe />} />
        {/* <Route path="/bakery-place" element={<Bakery_Place />} /> */}
        {/* <Route path="/micro-dust" element={<Micro_Dust />} /> */}
      </Routes>
    </>
  );
}

export default App;
