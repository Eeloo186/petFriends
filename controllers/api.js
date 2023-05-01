const axios = require("axios");
const moment = require("moment");

exports.getWeather = async (req, res) => {
  console.log("날씨 컨트롤러 진입");
  const { id } = req.params;

  // 캐시된 데이터가 있는지 확인합니다.
  const cachedData = req.cookies[`weatherData${id}`];
  if (cachedData) {
    console.log("캐시된 데이터 반환");
    return res.json(JSON.parse(cachedData));
  }

  // 캐시된 데이터가 없으면 API 요청을 보냅니다.
  try {
    // 가장 가까운 다음 시간을 구해서(example : 1시 23분 -> 2시 00분)
    // API 요청에 활용
    const nextHour = moment().add(1, "hour");
    const date = nextHour.format("YYYYMMDD");
    const hour = nextHour.format("HH") + "00";

    console.log("캐시 데이터 없음 API 요청합니다");
    await axios
      .get(
        // 요청 주소값 만들어야함
        // base_data, base_time, nx, ny 찾아야함
        // nx, ny는 가입유저 주소를 바탕으로 생성함
        // base_data, base_time은 현재 시각을 기준으로 가장 최근의 예보를 찾아옴
        "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=GagIS40BuLCzeM4PLX3y0XHMjpk2TTttOp%2FogkESWnqH6LxnfHwnmBkD3dfFt2IxF2dWToI6WtQCZPlOp1qO2A%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20230501&base_time=2000&nx=55&ny=127"
      )
      .then((response) => {
        // POP	강수확률
        // TMP	1시간 기온
        // fcstValue 수치값
        let temp, pop;
        response.data.response.body.items.item.forEach((data) => {
          if (data.fcstDate == date && data.fcstTime == hour) {
            if (data.category == "TMP") {
              console.log(`현재온도 : ${data.fcstValue}`);
              temp = data.fcstValue;
            } else if (data.category == "POP") {
              console.log(`강수확률 : ${data.fcstValue}`);
              pop = data.fcstValue;
            }
          }
        });

        const data = {
          temp,
          pop,
        };

        // 쿠키 설정
        res.cookie(`weatherData${id}`, JSON.stringify(data), {
          maxAge: 10 * 60 * 1000, // 캐시 유효 시간 10분
        });
        return res.json(data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send("날씨 데이터를 가져올 수 없습니다.");
  }
};
