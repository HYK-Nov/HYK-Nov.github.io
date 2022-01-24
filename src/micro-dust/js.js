$(document).ready(function () {    
    //inputGroupSelect01 선택시, selected 부여 및 페이지 새로고침
    var selected = localStorage.getItem('selected');

    if (selected) {
        $("#inputGroupSelect01").val(selected);
    }

    $("#inputGroupSelect01").change(function () {
        localStorage.setItem('selected', $(this).val());
        location.reload();
    });
    
    
    /* 오픈API 불러오기 */
    
    var area = $("#inputGroupSelect01 option:selected").val(); //지역 값 불러오기

    var pm10 = 0;
    var pm25 = 0;
    var o3 = 0;

    //시도별 실시간 측정정보 조회 
    $.ajax({
        async: false,
        type: "GET",
        url: "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=8LxClBXaNZQ6UhV%2BglFx%2BpC09YNGnBTpBc5qu7w3cU5Fq0BKHHXz%2F3vDY1vQNz41djy433sGkYzj3WROg8D5uw%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=" + encodeURIComponent(area) + "&ver=1.0",
        success: function (data) {
            var realData = data.response.body.items;

            $('#updateInfomation').html("업데이트: " + realData[0].dataTime);

            //pm10(미세먼지) 평균
            for (i = 0; i < realData.length; i++) {
                if (realData[i].pm10Value == "-") {
                    realData[i].pm10Value = 0;
                }

                pm10 += Number(realData[i].pm10Value);
            };

            pm10 = Math.round(pm10 / realData.length);

            //pm2.5(초미세먼지) 평균
            for (i = 0; i < realData.length; i++) {
                if (realData[i].pm25Value == "-") {
                    realData[i].pm25Value = 0;
                }

                pm25 += Number(realData[i].pm25Value);
            };

            pm25 = Math.round(pm25 / realData.length);

            //o3(오존) 평균
            for (i = 0; i < realData.length; i++) {
                if (realData[i].o3Value == "-") {
                    realData[i].o3Value = 0;
                }

                o3 += Number(realData[i].o3Value);
            };

            o3 = (o3 / realData.length).toFixed(3);
            
            //프로그레스 바 길이
            $("#PM_progress1 .progress-bar").animate({
                width: String(pm10 / 2) + "%"
            }, 800);

            $("#PM_progress2 .progress-bar").animate({
                width: String(pm25) + "%"
            }, 800);


            //pm10(미세먼지)수치에 따른 색상 변화
            if (pm10 <= 30) {
                $("#PM_progress1 .progress-bar").css('background', '#32A1FF');
                $("#PM_bold1").css('color', '#32A1FF').html("좋음 " + pm10);
                $("#PM_icon").attr("src", "image/icon_good.svg");
            } else if (30 < pm10 <= 80) {
                $("#PM_progress1 .progress-bar").css('background', '#00C73C');
                $("#PM_bold1").css('color', '#00C73C').html("보통 " + pm10);
                $("#PM_icon").attr("src", "image/icon_soso.svg");
            } else if (80 < pm10 <= 150) {
                $("#PM_progress1 .progress-bar").css('background', '#FDA60E');
                $("#PM_bold1").css('color', '#FDA60E').html("나쁨 " + pm10);
                $("#PM_icon").attr("src", "image/icon_bad.svg");
            } else {
                $("#PM_progress1 .progress-bar").css('background', '#E64746');
                $("#PM_bold1").css('color', '#E64746').html("매우나쁨 " + pm10);
                $("#PM_icon").attr("src", "image/icon_worst.svg");
            }

            //pm2.5(초미세먼지)에 따른 색상 변화
            if (pm25 <= 15) {
                $("#PM_progress2 .progress-bar").css('background', '#32A1FF');
                $("#PM_bold2").css('color', '#32A1FF').html("좋음 " + pm25);
            } else if (15 < pm25 <= 35) {
                $("#PM_progress2 .progress-bar").css('background', '#00C73C');
                $("#PM_bold2").css('color', '#00C73C').html("보통 " + pm25);
            } else if (35 < pm25 <= 75) {
                $("#PM_progress2 .progress-bar").css('background', '#FDA60E');
                $("#PM_bold2").css('color', '#FDA60E').html("나쁨 " + pm25);
            } else {
                $("#PM_progress2 .progress-bar").css('background', '#E64746');
                $("#PM_bold2").css('color', '#FDA60E').html("매우나쁨 " + pm25);
            }
        }
    });
    
    
    var today = new Date();
    
    //대기질 예보통보 조회
    $.ajax({
        async: false,
        type: "GET",
        url: "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=8LxClBXaNZQ6UhV%2BglFx%2BpC09YNGnBTpBc5qu7w3cU5Fq0BKHHXz%2F3vDY1vQNz41djy433sGkYzj3WROg8D5uw%3D%3D&returnType=json&numOfRows=100&pageNo=1&searchDate=" + today.getFullYear() + "-" + ("00" + (today.getMonth() + 1)).slice(-2) + "-" + ("00" + today.getDate()).slice(-2) +  "&InformCode=PM10&ver=1.1",
        success: function (data) {
            var realData2 = data.response.body.items;
            
            $('#pm10').attr("src", realData2[0].imageUrl7);
            $('#pm25').attr("src", realData2[3].imageUrl8);
            
            $('#airInfomation').html(realData2[0].dataTime);
        }
    });
})