/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";
import Comment from "./../components/Comment";
import { useNavigate } from "react-router-dom";

const DetailPageContainer = styled.div`
  padding: 3rem 9vw;
  display: flex;
  height: 100%;
  /* flex-direction: column; */
  flex-wrap: wrap;
  justify-content: space-around;
  /* align-content: flex-start; */
`;

const fontsize = {
  Titlefontsize: "1.5em",
  // Titlefontweight:
};

const Title = styled.h2`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
  margin-top: 5%;
  padding: 1rem;
  color: black;
  font-size: ${fontsize.Titlefontsize};
  font-weight: bold;
  text-align: center;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 500px;
  /* width: 500; */
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
  /* box-shadow: 4px 4px 4px rgb(100, 100, 100); */
  /* transition: box-shadow 0.1s, transform 0.1s; */

  .mainImg {
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .imgThumbnail {
    border: 1px solid black;
    border-radius: 10px;
    padding: 1rem;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  flex-basis: 500px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;

  .contentDesc {
    border: 1px solid black;
    border-radius: 10px;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .contentToolbar {
    border: 1px solid black;
    border-radius: 10px;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
  }
`;

const MapContainer = styled.div`
  display: flex;
  flex-basis: 500px;
  border: 1px solid black;
  border-radius: 10px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
  height: 500px;
  z-index: 0;
`;

const CommentListContainer = styled.div`
  display: flex;
  flex-basis: 500px;
  border: 1px solid black;
  border-radius: 10px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;

  #textinput {
    width: 80%;
    height: 1.5em;
    border: 1px;
  }
`;

export default function DetailPage() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState([]);
  const [loc, setLoc] = useState(null);
  const [weather, setWeather] = useState(null);
  const [text, setText] = useState("");

  const handleText = (value) => {
    setText(value);
  };

  const handlePost = (data) => {
    setPost(data);
  };

  const sendComment = async () => {
    // 문자열 비었으면 전송X
    if (text.length === 0) return null;

    // 전송후 받은 데이터를 comment에 추가
    const newComment = await axios.post(
      `${process.env.REACT_APP_API_URL}/comment/${
        window.location.href.split("/")[4]
      }`,
      { comment: text }
    );
    setComment([...comment, newComment.data.data]);
    handleText("");
  };

  const favorite = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/like/${id}`)
      .then((result) => {
        alert("처리 완료");
        console.log(result);
      })
      .catch((error) => {
        alert("오류 발생");
        console.log(error);
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/post/${id}`)
      .then((result) => {
        console.log(result);
        alert("삭제되었습니다");
        navigate("/");
      });
    // .then(error => {
    //   console.log(error)
    //   alert('오류 발생')
    // })
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
    console.log(comments)
    setComment(comments.data.data);

    // 데이터 추출 및 state로 저장
    const result = postData.data.data;
    handlePost(result);

    // 현재 위치를 받아 카카오지도 생성 및 날씨정보 수신
    navigator.geolocation.getCurrentPosition(
      (position) => {
        kakaoInit(
          [position.coords.latitude, position.coords.longitude],
          [result.lat, result.lng],
          true
        );
        setLoc([position.coords.latitude, position.coords.longitude]);
        // 날씨정보 받아오기
        getWeather([result.lat, result.lng]);
      },
      (error) => {
        console.log("현재 위치 확인이 불가한 상황입니다. 목적지만 표시됩니다.");
        kakaoInit([result.lat, result.lng], [], false);
        // 날씨정보 받아오기
        getWeather([result.lat, result.lng]);
      }
    );
  }, []);

  // 카카오 지도 생성부터 폴리라인 생성까지 진행하는 함수
  const kakaoInit = async ([lat, lng], [endLat, endLng], result) => {
    // 지도 생성
    const map = new kakao.maps.Map(document.getElementById("map"), {
      center: new kakao.maps.LatLng(lat, lng),
      level: 5,
    });

    // 지도 컨트롤러 추가
    map.addControl(
      new kakao.maps.ZoomControl(),
      kakao.maps.ControlPosition.RIGHT
    );

    if (!result) {
      // 지오로케이션이 실패한 경우 도착지에만 마커 생성
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
          title: "방문하실 장소",
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

      for (let i = 0; i < points.length; i++) {
        // 마커 생성
        // 마커 이미지를 생성합니다
        let markerImage = new kakao.maps.MarkerImage(
          markerImg,
          new kakao.maps.Size(24, 35)
        );

        new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: points[i].latlng, // 마커를 표시할 위치
          title: points[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
      }

      const tmapBody = qs.stringify({
        // 지오로케이션 성공: 티맵 API로 경로 받아와서 처리
        // 티맵은 형식이 조금 달라서 stringify해줘야 함.
        appKey: "l7xxa7d78cec498847918ee4bfadf4851cc9",
        startX: lng, // locPosition.La
        startY: lat, // locPosition.Ma
        endX: endLng,
        endY: endLat,
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        startName: "출발지",
        endName: "도착지",
      });

      // 이동경로 획득 함수, 정보 어떻게 보여줄지 생각해보기
      let tmapRoute = await axios.post(
        // TMAP API로 도보이동 경로 요청
        "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
        tmapBody,
        {
          "Accept-Language": "ko",
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: "http://localhost:3000",
          withCredentials: false,
        }
      );

      console.log(tmapRoute);

      if (tmapRoute.statusText === "No Content") {
        // 도보이동 경로를 찾을 수 없는 경우, 차량경로를 제공
        tmapRoute = await axios.post(
          "https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result",
          tmapBody,
          {
            "Accept-Language": "ko",
            "Content-Type": "application/x-www-form-urlencoded",
            Origin: "http://localhost:3000",
            withCredentials: false,
          }
        );
        console.log("도보이동 경로를 찾을 수 없어 차량 경로를 안내합니다.");
      }

      // 티맵 응답을 카카오맵이 처리가능한 형태로 저장
      let routePoint = []; // 폴리라인 지점들 저장하는 배열
      tmapRoute.data.features.map((e) => {
        if (typeof e.geometry.coordinates[0] === "number")
          routePoint.push(e.geometry.coordinates);
        else routePoint.push(...e.geometry.coordinates);
      });
      routePoint = routePoint.map((e) => new kakao.maps.LatLng(e[1], e[0]));

      const polyline = new kakao.maps.Polyline({
        // 카카오맵 폴리라인 생성
        path: routePoint, // 선을 구성하는 좌표배열 입니다
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#FFAE00", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "solid", // 선의 스타일입니다
      });

      polyline.setMap(map); // 지도에 라인 표시
    }
  };

  // 날씨위젯 넣기( CORS 오류 픽스해야 함: withCredential 오류라는데 false로 줘도 안됨 )
  const getWeather = async ([endLat, endLng]) => {
    // 요청 보낼때 http or https를 안 붙이면 현재 주소가 baseUrl로 붙는다... 이건 몰랐네
    // 반대로 요청 url 앞에 뭘 붙이려면 baseUrl: ~~ 형식으로 작성해 요청하면 됨.
    const weather = await axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${endLat}&lon=${endLng}&exclude=daily,alerts&units=metric&appid=46ef901de3b2efd51f01cc77ce74f69b&lang=kr`,
      withCredentials: false,
    });
    const weatherData = weather.data.hourly.slice(0, 3);

    // fetch(
    //   `https://api.openweathermap.org/data/2.5/onecall?lat=${endLat}&lon=${endLng}&exclude=daily,alerts&units=metric&appid=46ef901de3b2efd51f01cc77ce74f69b&lang=kr`,
    //   {credentials: 'omit',})
    //   .then((response)=>{
    //     return response.text();
    //   }).then((data)=>{
    //     console.log(data);
    //   }).catch(err=>{
    //     console.log(err);
    //   }) // 와우 리을리?

    const airPol = await axios({
      method: "GET",
      url: `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${endLat}&lon=${endLng}&appid=46ef901de3b2efd51f01cc77ce74f69b&lang=kr`,
      withCredentials: false,
    });
    const air = airPol.data.list.slice(0, 3);

    const result = weatherData.map((e) =>
      Object.assign(e, air[weatherData.indexOf(e)])
    );
    setWeather(result);
  };

  // 웹서비스로 넘겨주기
  const goKakoMap = async (lat, lng, by) => {
    const now = await axios({
      method: "GET",
      url: `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${loc[1]}&y=${loc[0]}&output_coord=WCONGNAMUL`,
      headers: { Authorization: "KakaoAK c62c1cd6ebb77ae75a755cdc15bb59e1" },
      withCredentials: false,
    });

    const dest = await axios({
      method: "GET",
      url: `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${lng}&y=${lat}&output_coord=WCONGNAMUL`,
      headers: { Authorization: "KakaoAK c62c1cd6ebb77ae75a755cdc15bb59e1" },
      withCredentials: false,
    });

    const st = now.data.documents[0],
      nd = dest.data.documents[0];

    return `https://map.kakao.com/?map_type=TYPE_MAP&target=${by}&rt=${st.x},${st.y},${nd.x},${nd.y}`;
  };

  const editPost = () => {
    navigate(`/edit/${window.location.href.split("/")[4]}`)
  } 

  return (
    <DetailPageContainer>
      {post ? (
        <div>
          <Title>{post.title ? post.title : null}</Title>
          <ImgContainer>
            <img
              className="mainImg"
              src={post.image[0] ? post.image[0] : null} onError={(e) => e.target.src = `/img/gitHubLogo.png`}
            ></img>
            {post.image && post.image.length > 1 ? (
              <div className="imgThumbnail">
                {/* 이미지 썸네일 공간 */}
                {post.image && post.image[1]
                  ? post.image
                      .slice(1)
                      .map((e) => <img src={e} key={Math.random()} />)
                  : null}
              </div>
            ) : null}
          </ImgContainer>

          <ContentContainer>
            <div className="contentDesc">
              {post.content ? post.content : null}
            </div>
            <div className="contentToolbar">
              <span>
                <button
                  onClick={() => {
                    goKakoMap(post.lat, post.lng, "walk").then((data) =>
                      window.open(data)
                    );
                  }}
                >
                  도보 길찾기
                </button>
              </span>
              <span>
                <button
                  onClick={() => {
                    goKakoMap(post.lat, post.lng, "car").then((data) =>
                      window.open(data)
                    );
                  }}
                >
                  차량 길찾기
                </button>
              </span>
              <span>
                <button
                  onClick={() => {
                    goKakoMap(post.lat, post.lng, "bike").then((data) =>
                      window.open(data)
                    );
                  }}
                >
                  자전거 길찾기
                </button>
              </span>
              <span>
                <button onClick={() => deletePost(post.id)}>삭제</button>
              </span>
              <span>
                <button onClick={editPost}>수정</button>
              </span>
              <span>
                <button onClick={() => favorite(post.id)}>즐겨찾기</button>
              </span>
              <span>
                <button onClick={() => console.log(weather)}>신고</button>
              </span>
            </div>
          </ContentContainer>

          <MapContainer id="map"></MapContainer>

          <CommentListContainer>
            <div>
              <input
                id="textinput"
                value={text}
                placeholder="댓글을 작성해주세요"
                onChange={(e) => handleText(e.target.value)}
              />
              <button onClick={sendComment}>전송</button>
            </div>
            {comment
              ? comment.map((e) => (
                  <Comment comment={e} key={comment.indexOf(e)} />
                ))
              : null}
          </CommentListContainer>
          <button onClick={() => console.log(comment, weather)}>웃음벨</button>
        </div>
      ) : (
        "저런!"
      )}
    </DetailPageContainer>
  );
}