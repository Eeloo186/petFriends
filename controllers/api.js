const axios = require("axios");
const moment = require("moment");

const { Weather } = require("../models");

exports.getWeather = async (req, res) => {
  console.log("날씨 컨트롤러 진입");



  const REST_API_KEY = process.env.KAKAO_MAPS_API_KEY;
  const url = 'https://dapi.kakao.com/v2/local/search/address.json';
  
  await axios({
    method: 'get',
    url: url,
    params: {
      query: '대구광역시 서구 내당동 245-4'
    },
    headers: {
      Authorization: `KakaoAK ${REST_API_KEY}`
    }
  })
    .then(response => {
      console.log(`--------------------------------------`);
      // console.log(`-----------${Object.keys(response)}----------------`);
      console.log(`-----------${response.data.documents[0].x}----------------`);
      console.log(`-----------${response.data.documents[0].y}----------------`);
      const rs = getGrid(response.data.documents[0].y, response.data.documents[0].x);
      console.log(`----------------${rs.x}----------------`);
      console.log(`----------------${rs.y}----------------`);
      console.log(`--------------------------------------`);
    })
    .catch(error => {
      console.error(error);
    });

























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
    // API 요청에 활용(=현재 날씨)
    const nextHour = moment().add(1, "hour");
    const date = nextHour.format("YYYYMMDD");
    const hour = nextHour.format("HH") + "00";
    // console.log(date, hour);

    console.log("캐시 데이터 없음 API 요청합니다");
    // 요청 주소값 만들어야함
    // base_data, base_time, nx, ny 찾아야함
    // nx, ny는 가입유저 주소를 바탕으로 생성함
    // base_data, base_time은 현재 시각을 기준으로 가장 최근(과거)의 예보를 찾아옴

    // ❍단기예보
    // - Base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
    // - API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10

    // base_date, base_time 결정
    // 현재 시각에서 가장 가까운 과거의 Base_time을 찾는다
    const now = moment();
    const baseTimeArray = ["02", "05", "08", "11", "14", "17", "20", "23"];

    const diff = [];
    for (let i = 0; i < baseTimeArray.length; i++) {
      diff[i] = parseInt(now.format("HH")) - parseInt(baseTimeArray[i]);
      if (diff[i] < 1) {
        diff[i] += 24;
      }
    }

    let base_date;
    let base_time;
    diff.forEach((element, index) => {
      if (element > 0 && element < 4) {
        const base = now.subtract(diff[index], "hour");
        base_date = base.format("YYYYMMDD");
        base_time = base.format("HH") + "00";
      }
    });

    // 로그인 한 유저의 주소 정보로 카카오지도API에서 geocoder를 불러와서
    // 좌표값을 구한 후 그것을 다시 nx, ny값으로 변환한다
    
    // const nx = coord.dataValues.nx;
    // const ny = coord.dataValues.ny;
    // console.log(coord);
    // console.log(coord.dataValues.nx);

    let query = "";
    const apiAddress = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    const serviceKey = process.env.WEATHER_API_KEY;
    const pageNo = "1";
    const numOfRows = "1000";
    const dataType = "JSON";
    // const base_date = "";
    // const base_time = "";
    // const nx = "";
    // const ny = "";

    query =
      apiAddress +
      "?" +
      "serviceKey=" +
      serviceKey +
      "&" +
      "pageNo=" +
      pageNo +
      "&" +
      "numOfRows=" +
      numOfRows +
      "&" +
      "dataType=" +
      dataType +
      "&" +
      "base_date=" +
      base_date +
      "&" +
      "base_time=" +
      base_time +
      "&" +
      "nx=" +
      nx +
      "&" +
      "ny=" +
      ny;
    console.log(query);

    await axios
      .get(query)
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




// 위도 경도를 좌표로 변환
function getGrid(v1, v2){
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기준점 Y좌표(GRID)

  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = re * sf / Math.pow(ro, sn);
  const rs = {};

  let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
  console.log(ra);
  console.log(sn);
  console.log(Math.pow(ra, sn));
  ra = re * sf / Math.pow(ra, sn);
  

  let theta = v2 * DEGRAD - olon;
  if (theta > Math.PI) {
    theta -= 2.0 * Math.PI;
  }
  if (theta < -Math.PI) {
    theta += 2.0 * Math.PI;
  }
  theta *= sn;
  rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  console.log(`v1 : ${v1}`);
  console.log(`v2 : ${v2}`);
  console.log(`x : ${rs.x}`);
  console.log(`y : ${rs.y}`);



  return rs;
}