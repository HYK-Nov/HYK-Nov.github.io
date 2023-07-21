import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./main-page/Main";
import Random_Pepe from "./random-pepe/Random_Pepe";
import Rush_Hour_Timer from "./rush-hour-timer/Rush_Hour_Timer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/rush-hour-timer" element={<Rush_Hour_Timer />} />
        <Route path="/random-pepe" element={<Random_Pepe />} />
      </Routes>
    </>
  );
}

export default App;
