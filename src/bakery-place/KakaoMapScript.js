/*global kakao */
import React, { useState } from "react";
import markerData from "./markerData";

export default function KakaoMapScript() {
  const { kakao } = window;
  const mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
    };

  // 지도를 생성한다
  const map = new kakao.maps.Map(mapContainer, mapOption);

  // 주소-좌표 변환 객체를 생성합니다
  const geocoder = new kakao.maps.services.Geocoder();

  markerData.forEach((element) => {
    geocoder.addressSearch(element.address, function(result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 지도에 마커를 생성하고 표시한다
        const marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도 객체
          position: coords, // 마커의 좌표
          clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });

        // 마커 위에 표시할 인포윈도우를 생성한다
        const infowindow = new kakao.maps.InfoWindow({
          content: element.content, // 인포윈도우에 표시할 내용
          // removable: element.removeable,
        });
        infowindow.setZIndex(9999);

        infowindow.open(map, marker);

        // 마커에 마우스클릭 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function() {
          window.open(element.link);
        });
      }
    });
  });
}
