/*global kakao */
import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import dummy from "../assets/dummy";
import Item from "../components/MainPage/Item";
import { Link } from "react-router-dom";
import axios from 'axios'

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

  // useEffect(() => {
  //   mkMarker()
  // }, [points])

  // const mkMarker = () => {
  //   console.log(points)
  //   const positions = []
  //   points.map(e => {

  //   })
  // }

  // 주소 받아오는 함수
  const geocoder = new kakao.maps.services.Geocoder();
  const setAddress = (locData) => {
    geocoder.coord2Address(
      locData.getLng(),
      locData.getLat(),
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setLoc({lat: locData.Ma, lng: locData.La, address: result[0].address.address_name});
        }
      }
    );
  };

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

    setAddress(new kakao.maps.LatLng(lat, lng))

    const postData = await axios.get(`${process.env.REACT_APP_API_URL}/post`)
    handlePoints(postData.data.data)

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
        title: i.title,
        image: markerImage,
      });

      // 인포윈도우 추가하기
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