import React, { useEffect } from "react";
import KakaoMapScript from "./KakaoMapScript";

const Map_Container = () => {
  useEffect(() => {
    KakaoMapScript();
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "500px",
        height: "400px",
      }}
    ></div>
  );
};

export default Map_Container;
