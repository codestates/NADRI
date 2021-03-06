/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import Comment from "./../components/Comment";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { loginModal } from '../redux/actions';

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
  word-break:break-all;
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
  /* height: 600px; */
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  /* background: white; */
  height: 40vw;
  @media screen and (max-width: 900px) {
    margin: 0 auto;
    width: 80vw;
    height: 60vw;
    margin-bottom: 1rem;
    height: 100%;
  }
`

const MainImg = styled.img`
  display: flex;
  height: 30vw; // 16:9 ????????? 22.5
  max-width: 40vw;
  background: white;
  
  object-fit: cover;
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
    overflow: auto; // ?????? ????????? ?????? ??????
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
  margin-bottom: 3rem;
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
  height: 100%;

  .contentText {
   
  }

  .contentDesc {
    /* border: 1px solid black;
    border-radius: 10px;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem; */
    /* white-space: pre-line; */
    background-color: #fdfdff;
    word-break:break-all;
    line-height: 2;
    letter-spacing: 0.5px;
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
    outline: 1px solid #ff7400;
    border: 0;
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
  const curUserInfo = useSelector(state => state.getUserInfo);
  const LoginModalState = useSelector(state => state.loginReducer);
  const curAuthState = useSelector(state => state.changeAuthState);
  const dispatch = useDispatch()

  // ????????? ?????? ??????(1,2 / 3-5 / 6,7 / 8~)
  const uviIndex = {
    0: '#008000', 1: '#008000', 2: '#008000',
    3: '#ffa500', 4: '#ffa500', 5: '#ffa500',
    6: '#FF0000', 7: '#FF0000',
    8: '#000000'
  }

  // ???????????? ?????? ??????(??????, ??????, ??????, ????????????)
  const aqiIndex = {
    1: ['#008000', '??????'],
    2: ['#ffa500', '??????'],
    3: ['#FF0000', '??????'],
    4: ['#744700', '??????'],
    5: ['#000000', '????']
  }

  // ?????? ????????????
  const weatherIndex = {
    '01': ['#008000', '??????'],
    '02': ['#008000', '??????'],
    '03': ['#ffa500', '??????'],
    '04': ['#ffa500', '??????'],
    '09': ['#FF0000', '??????'],
    '10': ['#FF0000', '??????'],
    '11': ['#FF0000', '??????'],
    '13': ['#ffa500', '??????'],
    '50': ['#FF0000', '??????'],
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
    if (value.length > 150) return alert("?????? ??? ???????????????.");
    setText(value);
  };

  const handlePost = (id, value) => {
    setPost({
      ...post,
      [`${id}`]: value
    })
  };

  const sendComment = async () => {
    // ????????? ???????????? ??????X
    if (text.length === 0) return null;

    // ????????? ??????
    axios.post(
      `${process.env.REACT_APP_API_URL}/comment/${
        window.location.href.split("/")[4]
      }`,
      { comment: text }
    )
    .then(result => {
      axios.get(
        `${process.env.REACT_APP_API_URL}/comment/${window.location.href.split("/")[4]}`
      )
      .then(result => {
        setComment(result.data.data);
        handleText("");
      })
    })
    .catch(err => {
      // alert('?????? ??????????????? ?????????!')
      dispatch(loginModal(LoginModalState))
    })
  };

  const favorite = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/like/${id}`)
      .then((result) => {
        handlePost('bookmark', !post.bookmark)
        // console.log(result);
      })
      .catch((error) => {
        // alert('?????? ??????????????? ?????????!')
        dispatch(loginModal(LoginModalState))
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${id}`)
      .then((result) => {
        // alert("?????????????????????");
        navigate("/");
      })
      .catch((error) => {
        alert("????????? ??????????????????.");
      });
  };

  useEffect(async () => {
    // console.log('DETAILINIT', curUserInfo)
    // ?????? ????????? ?????? ??????(???????????? ?????? id???????????? ?????? ??????)
    const targetId = document.location.href.split("/")[4];

    // axios??? ????????? ??? ?????? ????????? ??????
    const postData = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/${targetId}`
    );
    const comments = await axios.get(
      `${process.env.REACT_APP_API_URL}/comment/${targetId}`
    );

    setComment(comments.data.data);

    // ????????? ?????? ??? state??? ??????
    const result = postData.data.data;
    setPost(result);
    // console.log(postData)

    // ???????????? ????????????
    getWeather([result.lat, result.lng]);

    // ?????? ????????? ?????? ??????????????? ?????? ??? ???????????? ??????
    navigator.geolocation.getCurrentPosition(
      (position) => {
        kakaoInit(
          [position.coords.latitude, position.coords.longitude],
          [Number(result.lat), Number(result.lng)],
          true
        );    
      },
      (error) => {
        console.log("?????? ?????? ????????? ????????? ???????????????. ???????????? ???????????????.");
        kakaoInit([Number(result.lat), Number(result.lng)], [], false);
      }
    );
  }, []);

  // ????????? ?????? ???????????? ???????????? ???????????? ??????
  const kakaoInit = async ([lat, lng], [endLat, endLng], result) => {
    // ?????? ??????
    const map = new kakao.maps.Map(document.getElementById("map"), {
      center: new kakao.maps.LatLng(lat, lng),
      level: 5,
    });

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // ????????? ?????? ??????
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
    '            ???????????? ??????' + 
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

    if (!result) { // ?????????????????? ??????: ??????????????? ?????? ??????
      // ?????? ??????
      let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lng),
      });
      // ????????? ????????? ??????
      marker.setMap(map);
    } else {
      const points = [
        // ?????? ??? ????????? ???????????? ??????
        {
          title: "????????????",
          latlng: new kakao.maps.LatLng(lat, lng),
        },
        {
          title: "??????",
          latlng: new kakao.maps.LatLng(endLat, endLng),
        },
      ];

      // ?????? ?????? ?????????
      const bounds = new kakao.maps.LatLngBounds();
      bounds.extend(points[0].latlng);
      bounds.extend(points[1].latlng);
      map.setBounds(bounds);

      // ?????? ????????? ?????????
      const markerImg =
        "https://t1.daumcdn.net/mapjsapi/images/2x/marker.png";

      for (let i = 0; i < 1; i++) {
        // ?????? ????????? ??????
        let markerImage = new kakao.maps.MarkerImage(
          markerImg,
          new kakao.maps.Size(29, 42)
        );

        new kakao.maps.Marker({
          map: map, // ????????? ????????? ??????
          position: points[i].latlng, // ????????? ????????? ??????
          title: points[i].title, // ????????? ?????????, ????????? ???????????? ????????? ???????????? ???????????????
          image: markerImage, // ?????? ?????????
          zIndex: 1,
        });
      }

      const carBody = qs.stringify({
        // ?????????????????? ??????: ?????? API??? ?????? ???????????? ??????
        // ????????? ????????? ?????? ????????? stringify????????? ???.
        appKey: process.env.REACT_APP_TMAP_KEY1,
        startX: lng, // locPosition.La
        startY: lat, // locPosition.Ma
        endX: endLng,
        endY: endLat,
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        startName: "?????????",
        endName: "?????????",
      });

      const walkBody = qs.stringify({
        // ?????????????????? ??????: ?????? API??? ?????? ???????????? ??????
        // ????????? ????????? ?????? ????????? stringify????????? ???.
        appKey: process.env.REACT_APP_TMAP_KEY1,
        startX: lng, // locPosition.La
        startY: lat, // locPosition.Ma
        endX: endLng,
        endY: endLat,
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        startName: "?????????",
        endName: "?????????",
      });

      // ???????????? ??????
      const carRoute = await axios.post(
        "https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
        carBody,
        {
          "Accept-Language": "ko",
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: "https://www.nadri.ml",
          withCredentials: false,
        }
      );

      let walkRoute
      // ??????????????? 5km ????????? ??????????????? ??????
      if (carRoute.data.features[0].properties.totalDistance <= 5000) {
        walkRoute = await axios.post(
          // TMAP API??? ???????????? ?????? ??????
          "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
          walkBody,
          {
            "Accept-Language": "ko",
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "https://www.nadri.ml",
            withCredentials: false,
          }
        );
      }

      let tmapRoute
      if (!walkRoute || walkRoute.statusText === 'No Content') { // ??????????????? ???????????? ?????????(???????????? ????????????, ???????????? ???????????? ?????? ??????)
        // console.log('?????? ????????? ???????????????')
        tmapRoute = carRoute
      } else {
        // console.log('?????? ????????? ???????????????')
        tmapRoute = walkRoute
      }

      // setDistance??? ??? ????????? ?????? ????????? ????????? ??????
      handleDistance([
        tmapRoute.data.features[0].properties.totalDistance, // m??????
        tmapRoute.data.features[0].properties.totalTime / 60, // ??? ??????
        true
      ]);

      // console.log('????????????', tmapRoute)

      // ?????? ????????? ??????????????? ??????????????? ????????? ??????
      let routePoint = []; // ???????????? ????????? ???????????? ??????
      tmapRoute.data.features.map((e) => {
        if (typeof e.geometry.coordinates[0] === "number")
          routePoint.push(e.geometry.coordinates);
        else routePoint.push(...e.geometry.coordinates);
      });
      routePoint = routePoint.map((e) => new kakao.maps.LatLng(e[1], e[0]));

      const polyline = new kakao.maps.Polyline({
        // ???????????? ???????????? ??????
        path: routePoint, // ?????? ???????????? ???????????? ?????????
        strokeWeight: 4, // ?????? ?????? ?????????
        strokeColor: "#ff0000", // ?????? ???????????????
        strokeOpacity: 0.6, // ?????? ???????????? ????????? 1?????? 0 ????????? ????????? 0??? ??????????????? ???????????????
        strokeStyle: "solid", // ?????? ??????????????????
      });

      polyline.setMap(map); // ????????? ?????? ??????
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
      url: `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_KEY2}&lang=kr`,
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

  // ????????? ?????? ??? ????????? ?????? ?????? > ?????? ????????? ??? ??????
  const changeImg = (idx) => {
    const tmp = [...post.image], target = post.image[idx+1]
    tmp.splice(idx+1, 1) // ?????? ??????????????? ??????
    tmp.unshift(target) // ?????????????????? ??? ?????? ??????
    handlePost('image', tmp)
  }

  const report = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/post/report`,
    {url: window.location.href}
    )
    .then(result => {
      alert('????????? ?????????????????????.')
    })
    .catch(err => {
      alert('?????? ??? ????????? ??????????????????.')
    })
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
                ? <svg className="like" onClick={() => favorite(post.id)} aria-label="????????? ??????" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="60"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                : <svg className='like' onClick={() => favorite(post.id)} aria-label="?????????" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="60"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
                }
              </div>
              <div>
                <ul id='nav'>
                  <li><img src='/img/dropdown.png' />
                    <ul> 
                      {curAuthState && curUserInfo.admin ||curAuthState && curUserInfo.id === post.userId ? <li><span onClick={editPost}>??????</span></li> : null}
                      {curAuthState && curUserInfo.admin ||curAuthState && curUserInfo.id === post.userId ? <li><span onClick={() => deletePost(post.id)}>??????</span></li> : null}
                      <li><span onClick={report}>??????</span></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </Dropdown>
            <TopContainer>
              <ImgContainer>
                <MainImg 
                  src={post.image[0]} 
                  onError={(e) => (e.target.src = `/img/default-image.svg`)} 
                  style={{height: post.image.length === 1 ? /*1?????? ?????? */'100%' : /*????????? ???????????? */null }}
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
                        <div>??????</div>
                        <div className='infoContainer' style={{color: weatherIndex[weather[(distance[1] / 60).toFixed(0)].weather[0].icon.slice(0, 2)][0]}}>
                          {weatherIndex[weather[(distance[1] / 60).toFixed(0)].weather[0].icon.slice(0, 2)][1]}
                        </div>
                      </div>
                      : 'ERR'
                    }
                    {weather ? 
                      <div className="informBox">
                        <div>??????({distance[0] > 1000 ? 'km' : 'm'})</div>
                        <div className='infoContainer'>
                        {distance[0] > 1000 ? (distance[0] / 1000).toFixed(1) : distance[0]}
                        </div>
                      </div>
                      : 'ERR'
                    }

                    {weather[(distance[1] / 60).toFixed(0)].rain ? (
                      <div className="informBox">
                        <div>??????(mm)</div>
                        <div className='infoContainer'>
                        {weather[(distance[1] / 60).toFixed(0)].rain['1h']}
                        </div>
                      </div>
                    ) : (
                      <div className="informBox">
                        <div>?????????</div>
                        <div className='infoContainer' style={{color: uviIndex[weather[(distance[1] / 60).toFixed(0)].uvi.toFixed(0)]}}>
                          {weather[(distance[1] / 60).toFixed(0)].uvi.toFixed(0)}
                        </div>
                      </div>
                    )}

                    {weather[(distance[1] / 60).toFixed(0)] ?
                      <div className="informBox">
                        <div>????????????</div>
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
                  : "?????? ????????? ????????????!"}

                  <div className='writeComment'>
                  <input
                    id="textinput"
                    value={text}
                    placeholder={Object.keys(curUserInfo).length ? "????????? ????????? ?????????" : '?????? ????????? ??? ?????????'}
                    onChange={(e) => handleText(e.target.value)}
                  />
                  <button onClick={sendComment}>??????</button>
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
