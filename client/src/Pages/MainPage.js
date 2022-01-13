/*global kakao */
import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
// import dummy from "../assets/dummy";
import Item from "../components/MainPage/Item";
import { Link } from "react-router-dom";
import axios from 'axios'
// import DetailPage from "./DetailPage";

const MainContainer = styled.div`
  height: 100%;
  padding: 3rem 9vw;
  display: flex;
  justify-content: space-between;

  #map {
    width: 45rem;
    height: 50rem;
    border-radius: 15px;
    z-index: 0;
  }

  .contentContainer {
    width: 45rem;
    height: 50rem;
    padding: 0 3rem 1rem;
  }

  @media screen and (max-width: 1380px) {
    display: flex;
    flex-direction: column;
    
    #map {
      width: 100%;
      height: 30rem;
      margin-bottom: 30px;
    }

    .contentContainer {
      width: 100%;
      padding: 0;
    }
  }
  
`

const ContentNav = styled.nav`
  border: 1px solid black;
  border-radius: 30px;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 0 2rem;
  margin-bottom: 3rem;
  cursor: grab;

  > select {
    height: 2rem;
    border-radius: 3px;
    background-color: white;
  }
`

const ItemContainer = styled.div`
  height: 44rem;
  border: 1px solid black;
  overflow: auto;
  padding: 1rem;
  border-radius: 10px;
  
  &::-webkit-scrollbar{
    width: 10px;
  }

  &::-webkit-scrollbar-thumb{
      height: 17%;
      background-color: #d3d3d3;
      border-radius: 10px;    
  }

  &::-webkit-scrollbar-track{
      background-color: rgba(0,0,0,0);
  }
`

export default function Main () {

  const [loc, setLoc] = useState({
    lat: 0,
    lng: 0,
    address: '',
  })

  const [points, setPoints] = useState([])
  const handlePoints = (data) => {
    setPoints(data)
  }

  const [curCategory, setCurCategory] = useState('가까운 지점')

  function categoryHandler (e) {
    // 1 -> 가까운 지점
    // 2 -> 추천순
    // 3 -> ??
    // 맘에 안드는 로직..
    if(e.target.value === '1') {
      setCurCategory('가까운 지점')
    }
    else if(e.target.value === '2') {
      setCurCategory('추천순')
    }
    else if( e.target.value === '3') {
      setCurCategory('???')
    }
  }

  useEffect(() => { // 나중에 curCategory에 따라 지도를 다시 불러오는 작업을 해줘야 할듯
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('위치 확인에 성공하였습니다.')
      kakaoInit([position.coords.latitude, position.coords.longitude], true)
    }, (error) => {
      console.log('현재 위치 확인이 불가한 상황입니다.')
      kakaoInit([37.5655493, 126.9777104], false)
    })
    // console.log(points)
  }, []);

  const kakaoInit = async ([lat, lng]) => {
    // 지도 생성
    const map = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(lat, lng),
      level: 7,
    });
    map.addControl(
      new kakao.maps.ZoomControl(),
      kakao.maps.ControlPosition.RIGHT
    );

    // 마커 생성
    let marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
    });
    // 마커를 지도에 표시
    marker.setMap(map);

    // 모든 게시글 정보를 수신해 거리순으로 정렬
    const postData = await axios.get(`${process.env.REACT_APP_API_URL}/post`)
    let sortTarget = [...postData.data.data]

    const startLatLng = new kakao.maps.LatLng(lat, lng)
    sortTarget.map(e => {
      const polyline = new kakao.maps.Polyline({
        path: [startLatLng, new kakao.maps.LatLng(e.lat, e.lng)]
      });
      e['distance'] = polyline.getLength()
    })

    sortTarget.sort((a, b) => {
      return a.distance - b.distance
    })

    handlePoints(sortTarget)

    const points = []
    postData.data.data.map(e => {
      const {title, lat, lng} = e
      points.push({title, latlng: new kakao.maps.LatLng(lat, lng)})
    })
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    const imageSize = new kakao.maps.Size(24, 35)
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)

    for (let i of points) {
      // console.log(i);
      const marker = new kakao.maps.Marker({
        map,
        position: i.latlng,
        // title: i.title,
        image: markerImage,
      });

      // 인포윈도우 추가하기
      // 마우스 오버될 때 표시할 인포윈도우
      // 여기 컴포넌트 들어가려나?
      const iwContent = `<div style="padding:5px;">${i.title.length > 10 ? i.title.slice(0, 9) + '...' : i.title }</div>`;
      const infowindow = new kakao.maps.InfoWindow({
        content : iwContent
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'mouseover', function() {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'mouseout', function() {
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          infowindow.close();
      });
    }
  }

  return (
    <MainContainer>
      <div id="map"></div>

      <div className="contentContainer">
        <ContentNav>
          <span>{curCategory}</span>
          <select onChange={(e) => categoryHandler(e)}>
            <option value={1}>가까운 지점</option>
            <option value={2}>추천순</option>
            <option value={3}>???</option>
          </select>
        </ContentNav>

        
          <ItemContainer>
          {points.length > 0 ? points.map((point) => <Item key={point.id} point={point}/>) : null}
          </ItemContainer>
      </div>
    </MainContainer>
  )
}