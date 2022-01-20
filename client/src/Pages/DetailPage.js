/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import Comment from "./../components/Comment";
import { useNavigate } from "react-router-dom";

const DetailPageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'NanumSquare','Cafe24', arial;
  .loadingImg {

  }
`;

const fontsize = {
  Titlefontsize: "1.5em",
  // Titlefontweight:
};

const Title = styled.h2`
  width: 30vw;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1%;
  margin-top: 2%;
  padding: 1rem;
  color: black;
  font-size: ${fontsize.Titlefontsize};
  font-weight: bold;
  text-align: center;
  /* box-shadow: 2px 2px 2px 1px rgb(180 180 180); */
  border-radius: 10px;
  /* background-color: #f7f7f7; */
  
  @media screen and (max-width: 900px) {
    width: 70vw;
    margin-bottom: 1rem;
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Dropdown = styled.div`
  display: flex;
  flex-direction: row;
  /* float: right; */
  width: 82vw;
  max-width: 1600px;
  margin-bottom: 1rem;
  justify-content: flex-end;
  

  #likeContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  #nav {
    cursor: pointer;
  }

  #nav ul img {
    width: 2rem;
  }

  #nav {
    list-style: none;
    margin: 0 auto;
  }

  #nav li {
    /* float: right; */
    position: relative;
    padding: 0;
    z-index: 1;
  }

  #nav li ul {
    left: -25%;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgb(180 180 180);
    background-color: #dfe3ee;
  }

  #nav li span {
    display: block;
    text-decoration: none;
    font-size: 1.2rem;
    width: 3rem;
    margin: 0.5rem 0;
    font-family: 'NanumSquare','Cafe24', arial;
  }

  #nav li:hover > span {
    transition: all 0.2s;
    font-size: 1.4rem;
    color: black;
    margin: 0;
    text-shadow: 0 1px 1px;
    width: 3rem;
    cursor: pointer;
    margin: 0.5rem 0;

  }

  #nav ul li {
    float: none;
    margin: 0;
    padding: 0;
  }

  #nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 3rem;
    background: white;
    text-align: center;
    opacity: 0;
    transition: all 0.3s;
  }

  #nav li:hover ul {
    transition: all 0.5s;
    opacity: 1;
  }
  #nav li:hover ul li {
    overflow: visible;
    padding: 0;
  }
`

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const ImgContainer = styled.div`
  width: 40vw;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  /* height: 40vw; */
  @media screen and (max-width: 900px) {
    margin: 0 auto;
    width: 80vw;
    margin-bottom: 1rem;
    height: 100%;
  }
`

const MainImg = styled.img`
  display: flex;
  height: 30vw; // 16:9 하려면 22.5
  max-width: 40vw;
  /* max-height: 30vw; */
  
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 3px 3px 4px 3px rgb(180 180 180);
  
  @media screen and (max-width: 900px) {
    max-width: 80vw;
    height: 50vw;
  }
`

const SubImgContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  /* border: 1px solid black; */
  border-radius: 10px;
  height: 10vw;
  align-items: center;
  justify-content: space-between;
  max-height: 100px;
  box-shadow: 3px 3px 4px 3px rgb(180 180 180);
  background-color: #f9fafc;

  .subImg {
    width: 12vw;
    height: 8vw;
    margin: 0 auto;
    overflow: auto; // 이건 맞는지 확인 필요
    border: 1px solid grey;
    box-shadow: 2px 2px 2px 1px rgb(180 180 180);
    border-radius: 10px;
    object-fit: cover;
    max-width: 120px;
    max-height: 80px;
    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    width: 80vw;
    height: 10vw;
  }
`

const NavContainer = styled.div`
  width: 40vw;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  /* height: 40vw; */

  @media screen and (max-width: 900px) {
    width: 80vw;
    margin: 0 auto;
    height: 60vw;
  }
`

const MapContainer = styled.div`
  display: flex;
  height: 30vw;
  border-radius: 10px;
  width: 40vw;
  max-width: 800px;
  z-index: 0;
  margin-bottom: 1rem;
  box-shadow: 2px 2px 2px 1px rgb(180 180 180);

  @media screen and (max-width: 900px) {
    width: 80vw;
    height: 50vw;
  }

  .wrap {
    position: absolute;
    left: 0;
    bottom: -6.5rem;
    width: 10rem;
    height: 6rem;
    margin-left: -80px;
    text-align: left;
    overflow: hidden;
    font-size: 1rem;
    line-height: 1.5;
  }
  .wrap .info {
    width: 10rem;
    border-radius: 10px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
  }
  .info .title {
    padding: 5px 0 0 10px;
    height: 2rem;
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-size: 1rem;
    font-weight: bold;
  }

  .imojiContianer{
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-evenly;
  }

  .info .close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: #888;
    width: 17px;
    height: 17px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
  .info .close:hover {cursor: pointer;}

`

const Forecast = styled.div`
  /* border: 1px solid black; */
  border-radius: 10px;
  height: 10vw;
  max-height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  box-shadow: 2px 2px 2px 1px rgb(180 180 180);
  background-color: #f9fafc;
  font-family: 'NanumSquare','Cafe24', arial;

  @media screen and (max-width: 650px) {
    height: 12vw;
  }

  .informBox {
    width: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;

    @media screen and (max-width: 650px) {
      padding-top: 0.2rem;
      font-size: 0.8rem;
    }
  }

  .infoContainer{
    padding-top: 0.4rem;
    max-width: 150px;
    font-size: 2rem;
    overflow: hidden;
    margin: 0 auto;
    

    @media screen and (max-width: 900px) {
      font-size: 1.5rem;
    }
    @media screen and (max-width: 470px) {
      font-size: 1rem;
      height: 10vw;
    }
  }

  #weatherImg {
    object-fit: cover;
    width: 4rem;
    height: 4rem;
  }
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%;

  @media screen and (max-width: 900px) {
    width: 80vw;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const ContentContainer = styled.div`
  margin-right: 1rem;
  width: 40vw;
  /* border: 1px solid black; */
  border-radius: 10px;
  padding: 1rem;
  max-width: 800px;
  box-shadow: 2px 2px 2px 1px rgb(180 180 180);
  background-color: #f9fafc;

  .contentText {
    white-space: pre-wrap;
  }

  .contentDesc {
    /* border: 1px solid black;
    border-radius: 10px;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem; */
    white-space: pre-line;
    background-color: #fdfdff;
}

  .contentToolbar {
    /* border: 1px solid black; */
    /* border-radius: 10px; */
    /* margin-left: 1rem; */
    /* margin-right: 1rem; */
    /* margin-bottom: 1rem; */
    /* padding: 1rem; */
  }

  @media screen and (max-width: 900px) {
    width: 80vw;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`;

const CommentListContainer = styled.div`
  box-shadow: 2px 2px 2px 1px rgb(180 180 180);
  background-color: #f9fafc;
  margin-left: 1rem;
  width: 40vw;
  /* border: 1px solid black; */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  max-width: 800px;

  #textinput {
    width: 32vw;
    height: 2rem;
    font-size: 1rem;
    margin-top: 1rem;
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid gray;
  }
  
  #textinput:focus {
    outline: none;
  }

  .writeComment {
    display: flex;
    justify-content: center;
    font-family: 'NanumSquare', 'Cafe24',arial;

    > button {
      width: 100px;
      height: 2rem;
      margin: 16px 0 0 1rem;
      font-family: 'NanumSquare', 'Cafe24',arial;
      border-radius: 8px;
      border: none;
      background-color: #88ccff;
      box-shadow: 2px 2px 2px 1px rgba(180, 180, 180);
      cursor: pointer;
    }

    > button:active {
      position: relative;
      top: 2px;
    }
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    margin: 0 auto;

    #textinput {
      width: 85%;
      height: 1.5rem;
      font-size: 1rem;
    }
  }
`;

export default function DetailPage() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(null);
  const [weather, setWeather] = useState(null);
  const [text, setText] = useState("");
  const [distance, setDistance] = useState([0, 0, false]);

  // 자외선 단계 구분(1,2 / 3-5 / 6,7 / 8~)
  const uviIndex = {
    0: '#008000', 1: '#008000', 2: '#008000',
    3: '#ffa500', 4: '#ffa500', 5: '#ffa500',
    6: '#FF0000', 7: '#FF0000',
    8: '#000000'
  }

  // 미세먼지 단계 구분(좋음, 보통, 나쁨, 매우나쁨)
  const aqiIndex = {
    1: ['#008000', '좋음'],
    2: ['#ffa500', '보통'],
    3: ['#FF0000', '나쁨'],
    4: ['#744700', '위험'],
    5: ['#000000', '💀']
  }

  // 날씨 색상구분
  const weatherIndex = {
    '01': ['#008000', '맑음'],
    '02': ['#008000', '흐림'],
    '03': ['#ffa500', '흐림'],
    '04': ['#ffa500', '흐림'],
    '09': ['#FF0000', '강우'],
    '10': ['#FF0000', '강우'],
    '11': ['#FF0000', '뇌우'],
    '13': ['#ffa500', '강설'],
    '50': ['#FF0000', '안개'],
  }

  const handleDistance = (data) => {
    setDistance(data)
  }

  const modComment = async ([id, text]) => {
    await axios.patch(
      `${process.env.REACT_APP_API_URL}/comment/${id}`,
      { comment: text }
    );

    const newComment = [...comment];
    newComment.map((e) => {
      if (e.id === id) e.comment = text;
    });

    setComment(newComment);
  };

  const delComment = async (id) => {
    const del = await axios.delete(`${process.env.REACT_APP_API_URL}/comment/${id}`)

    const comments = await axios.get(
      `${process.env.REACT_APP_API_URL}/comment/${window.location.href.split("/")[4]}`
    );
    
    setComment(comments.data.data);
  };

  const handleText = (value) => {
    if (value.length > 150) return alert("글자 수 초과입니다.");
    setText(value);
  };

  const handlePost = (id, value) => {
    setPost({
      ...post,
      [`${id}`]: value
    })
  };

  const sendComment = async () => {
    // 문자열 비었으면 전송X
    if (text.length === 0) return null;

    // 문자열 전송
    await axios.post(
      `${process.env.REACT_APP_API_URL}/comment/${
        window.location.href.split("/")[4]
      }`,
      { comment: text }
    );

    const comments = await axios.get(
      `${process.env.REACT_APP_API_URL}/comment/${window.location.href.split("/")[4]}`
    );

    setComment(comments.data.data);
    handleText("");
  };

  const favorite = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/like/${id}`)
      .then((result) => {
        handlePost('bookmark', !post.bookmark)
        console.log(result);
      })
      .catch((error) => {
        alert('err')
        console.log(error);
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${id}`)
      .then((result) => {
        alert("삭제되었습니다");
        navigate("/");
      })
      .catch((error) => {
        alert("오류가 발생했습니다.");
      });
  };

  useEffect(async () => {
    // 현재 페이지 주소 찾기(주소창에 직접 id입력하는 경우 대응)
    const targetId = document.location.href.split("/")[4];

    // axios로 포스트 및 댓글 데이터 획득
    const postData = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/${targetId}`
    );
    const comments = await axios.get(
      `${process.env.REACT_APP_API_URL}/comment/${targetId}`
    );

    setComment(comments.data.data);

    // 데이터 추출 및 state로 저장
    const result = postData.data.data;
    setPost(result);
    console.log(postData)

    // 날씨정보 받아오기
    // getWeather([result.lat, result.lng]);

    // 현재 위치를 받아 카카오지도 생성 및 날씨정보 수신
    navigator.geolocation.getCurrentPosition(
      (position) => {
        kakaoInit(
          [position.coords.latitude, position.coords.longitude],
          [result.lat, result.lng],
          true
        );    
      },
      (error) => {
        console.log("현재 위치 확인이 불가한 상황입니다. 목적지만 표시됩니다.");
        kakaoInit([result.lat, result.lng], [], false);
      }
    );
  }, []);

  // 카카오 지도 생성부터 폴리라인 생성까지 진행
  const kakaoInit = async ([lat, lng], [endLat, endLng], result) => {
    // 지도 생성
    const map = new kakao.maps.Map(document.getElementById("map"), {
      center: new kakao.maps.LatLng(lat, lng),
      level: 5,
    });

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 길찾기 경로 확인
    const now = await axios({
      method: "GET",
      url: `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${lng}&y=${lat}&output_coord=WCONGNAMUL`,
      headers: { Authorization: "KakaoAK c62c1cd6ebb77ae75a755cdc15bb59e1" },
      withCredentials: false,
    });

    const dest = await axios({
      method: "GET",
      url: `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${endLng}&y=${endLat}&output_coord=WCONGNAMUL`,
      headers: { Authorization: "KakaoAK c62c1cd6ebb77ae75a755cdc15bb59e1" },
      withCredentials: false,
    });

    const st = now.data.documents[0],
      nd = dest.data.documents[0];

    const landingLink = [
      `https://map.kakao.com/?map_type=TYPE_MAP&target=walk&rt=${st.x},${st.y},${nd.x},${nd.y}`,
      `https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=${st.x},${st.y},${nd.x},${nd.y}`,
      `https://map.kakao.com/?map_type=TYPE_MAP&target=bike&rt=${st.x},${st.y},${nd.x},${nd.y}`
    ]

    const marker = new kakao.maps.Marker({
      map: map, 
      position: new kakao.maps.LatLng(endLat, endLng),
      zIndex: 3
    });

    const content = document.createElement('div')

    content.innerHTML = 
    '<div class="wrap">' + 
    '    <div class="info">' + 
    '        <div class="title">' + 
    '            지도에서 보기' + 
    '        </div>' + 
    '        <div class="imojiContianer">' +
    `         <img class='landingImoji' src='/img/walk.png' onclick=window.open('${landingLink[0]}')></img> ` +
    `         <img class='landingImoji' src='/img/bike.png' onclick=window.open('${landingLink[2]}')></img> ` +
    `         <img class='landingImoji' src='/img/car.png' onclick=window.open('${landingLink[1]}')></img> ` +
    '        </div>' + 
    '    </div>' +    
    '</div>';

    const overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: new kakao.maps.LatLng(endLat, endLng),
      zIndex: 999
    });

    kakao.maps.event.addListener(marker, 'click', function() {
      overlay.setMap(map);
    });

    const closeOverlay = () => {
      overlay.setMap(null);
    }

    content.addEventListener('click', (e) => {
      e.preventDefault();
      closeOverlay()
    })

    if (!result) { // 지오로케이션 실패: 도착지에만 마커 생성
      // 마커 생성
      let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
      });
      // 마커를 지도에 표시
      marker.setMap(map);
    } else {
      const points = [
        // 출발 및 도착점 저장하는 배열
        {
          title: "현재위치",
          latlng: new kakao.maps.LatLng(lat, lng),
        },
        {
          title: "도착",
          latlng: new kakao.maps.LatLng(endLat, endLng),
        },
      ];

      // 지도 범위 재조정
      const bounds = new kakao.maps.LatLngBounds();
      bounds.extend(points[0].latlng);
      bounds.extend(points[1].latlng);
      map.setBounds(bounds);

      // 마커 이미지 임포트
      const markerImg =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (let i = 0; i < 1; i++) {
        // 마커 이미지 생성
        let markerImage = new kakao.maps.MarkerImage(
          markerImg,
          new kakao.maps.Size(24, 35)
        );

        new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: points[i].latlng, // 마커를 표시할 위치
          title: points[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
          zIndex: 1,
        });
      }

      const tmapBody = qs.stringify({
        // 지오로케이션 성공: 티맵 API로 경로 받아와서 처리
        // 티맵은 형식이 조금 달라서 stringify해줘야 함.
        appKey: process.env.REACT_APP_TMAP_KEY,
        startX: lng, // locPosition.La
        startY: lat, // locPosition.Ma
        endX: endLng,
        endY: endLat,
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        startName: "출발지",
        endName: "도착지",
      });

      // // 차량경로 수신
      // const carRoute = await axios.post(
      //   "https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
      //   tmapBody,
      //   {
      //     "Accept-Language": "ko",
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     Origin: "http://localhost:3000",
      //     withCredentials: false,
      //   }
      // );

      // let walkRoute
      // // 이동거리가 5km 이하면 도보경로를 수신
      // if (carRoute.data.features[0].properties.totalDistance <= 5000) {
      //   walkRoute = await axios.post(
      //     // TMAP API로 도보이동 경로 요청
      //     "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
      //     tmapBody,
      //     {
      //       "Accept-Language": "ko",
      //       "Content-Type": "application/x-www-form-urlencoded",
      //       Origin: "http://localhost:3000",
      //       withCredentials: false,
      //     }
      //   );
      // }

      // let tmapRoute
      // if (!walkRoute || walkRoute.statusText === 'No Content') { // 도보경로가 존재하지 않으면(수신하지 않았거나, 데이터가 존재하지 않는 경우)
      //   console.log('차량 경로를 안내합니다')
      //   tmapRoute = carRoute
      // } else {
      //   console.log('도보 경로를 안내합니다')
      //   tmapRoute = walkRoute
      // }

      // // setDistance로 총 거리와 시간 걸리는 시간을 저장
      // handleDistance([
      //   tmapRoute.data.features[0].properties.totalDistance, // m단위
      //   tmapRoute.data.features[0].properties.totalTime / 60, // 분 단위
      //   true
      // ]);

      // // console.log('이동경로', tmapRoute)

      // // 티맵 응답을 카카오맵이 처리가능한 형태로 저장
      // let routePoint = []; // 폴리라인 지점들 저장하는 배열
      // tmapRoute.data.features.map((e) => {
      //   if (typeof e.geometry.coordinates[0] === "number")
      //     routePoint.push(e.geometry.coordinates);
      //   else routePoint.push(...e.geometry.coordinates);
      // });
      // routePoint = routePoint.map((e) => new kakao.maps.LatLng(e[1], e[0]));

      // const polyline = new kakao.maps.Polyline({
      //   // 카카오맵 폴리라인 생성
      //   path: routePoint, // 선을 구성하는 좌표배열 입니다
      //   strokeWeight: 4, // 선의 두께 입니다
      //   strokeColor: "#ff0000", // 선의 색깔입니다
      //   strokeOpacity: 0.6, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      //   strokeStyle: "solid", // 선의 스타일입니다
      // });

      // polyline.setMap(map); // 지도에 라인 표시
    }
  };

  const getWeather = async ([lat, lng]) => {
    const weather = await axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=daily,alerts&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY1}&lang=kr`,
      withCredentials: false,
    });
    const weatherData = weather.data.hourly;

    const airPol = await axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_KEY2}&lang=kr`,
      withCredentials: false,
    });
    const air = airPol.data.list

    const result = weatherData.map((e) =>
      Object.assign(e, air[weatherData.indexOf(e)])
    );    

    setWeather(result);
  };

  const editPost = () => {
    navigate(`/edit/${window.location.href.split("/")[4]}`);
  };

  // 썸네일 클릭 시 이미지 위치 변경 > 차후 수정할 수 있음
  const changeImg = (idx) => {
    const tmp = [...post.image], target = post.image[idx+1]
    tmp.splice(idx+1, 1) // 해당 인덱스에서 제거
    tmp.unshift(target) // 타겟이미지를 맨 앞에 추가
    handlePost('image', tmp)
  }

  return (
    <DetailPageContainer>
      {post ? (
        <div>
          <Title>{post.title ? post.title : null}</Title>

          <PostContainer>
            <Dropdown>
              <div id="likeContainer">
                {
                post.bookmark
                ? <svg className="like" onClick={() => favorite(post.id)} aria-label="좋아요 취소" class="_8-yf5 " color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="60"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                : <svg className='like' onClick={() => favorite(post.id)} aria-label="좋아요" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="60"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
                }
              </div>
              <div>
                <ul id='nav'>
                  <li><img src='/img/dropdown.png' />
                    <ul>
                      <li><span onClick={editPost}>수정</span></li>
                      <li><span onClick={() => deletePost(post.id)}>삭제</span></li>
                      <li><span>신고</span></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </Dropdown>
            <TopContainer>
              <ImgContainer>
                <MainImg 
                  src={post.image[0]} 
                  onError={(e) => (e.target.src = `/img/gitHubLogo.png`)} 
                  style={{height: post.image.length === 1 ? /*1이면 확장 */'100%' : /*아니면 평소처럼 */null }}
                />
                {post && post.image.length === 1 ? 
                  null
                  : <SubImgContainer>
                    {post.image.length > 1 ?
                      post.image.slice(1).map((e, idx) => <img className='subImg' src={e} key={idx} onClick={() => changeImg(idx)} />)
                    : null}
                  </SubImgContainer>
                }
              </ImgContainer>

            <NavContainer>
                <MapContainer id="map" />
                {distance[2] && weather ? 
                <Forecast>
                    {weather[(distance[1] / 60).toFixed(0)] ?
                      <div className="informBox">
                        <div>날씨</div>
                        <div className='infoContainer' style={{color: weatherIndex[weather[(distance[1] / 60).toFixed(0)].weather[0].icon.slice(0, 2)][0]}}>
                          {weatherIndex[weather[(distance[1] / 60).toFixed(0)].weather[0].icon.slice(0, 2)][1]}
                        </div>
                      </div>
                      : 'ERR'
                    }
                    {weather ? 
                      <div className="informBox">
                        <div>거리({distance[0] > 1000 ? 'km' : 'm'})</div>
                        <div className='infoContainer'>
                        {distance[0] > 1000 ? (distance[0] / 1000).toFixed(1) : distance[0]}
                        </div>
                      </div>
                      : 'ERR'
                    }

                    {weather[(distance[1] / 60).toFixed(0)].rain ? (
                      <div className="informBox">
                        <div>강수량</div>
                        <div className='infoContainer'>
                        {weather[(distance[1] / 60).toFixed(0)].rain['1h'] + 'mm'}
                        </div>
                      </div>
                    ) : (
                      <div className="informBox">
                        <div>자외선</div>
                        <div className='infoContainer' style={{color: uviIndex[weather[(distance[1] / 60).toFixed(0)].uvi.toFixed(0)]}}>
                          {weather[(distance[1] / 60).toFixed(0)].uvi.toFixed(0)}
                        </div>
                      </div>
                    )}

                    {weather[(distance[1] / 60).toFixed(0)] ?
                      <div className="informBox">
                        <div>미세먼지</div>
                        <div className='infoContainer' style={{color: aqiIndex[weather[(distance[1] / 60).toFixed(0)].main.aqi][0]}}>
                          {/* {weather[(distance[1] / 60).toFixed(0)].main.aqi} */}
                          {aqiIndex[weather[(distance[1] / 60).toFixed(0)].main.aqi][1]}
                        </div>
                      </div>
                      : 'ERR'
                    }
                  </Forecast>
                  :
                  <Forecast>
                    <img src='/img/loading.svg' style={{width: '60px', 'justifyContent': 'center'}}/>
                  </Forecast>
                }
            </NavContainer>
          </TopContainer>

          <BottomContainer>
            <ContentContainer>
                <div className="contentDesc">{post.content ? post.content : null}</div>
            </ContentContainer>

            <CommentListContainer>
                {comment
                  ? comment.map((e) => (
                      <Comment
                        id={e.id}
                        comment={e}
                        key={comment.indexOf(e)}
                        modComment={modComment}
                        delComment={delComment}
                      />
                    ))
                  : "아직 댓글이 없습니다!"}

                  <div className='writeComment'>
                  <input
                    id="textinput"
                    value={text}
                    placeholder="댓글을 작성해주세요"
                    onChange={(e) => handleText(e.target.value)}
                  />
                  <button onClick={sendComment}>전송</button>
                </div>
            </CommentListContainer>
          </BottomContainer>
          </PostContainer>
        </div>
      ) : (
        <img className='loadingImg' src='/img/loading.svg' />
      )}
    </DetailPageContainer>
  );
}
