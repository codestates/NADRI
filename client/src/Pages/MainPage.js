import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import dummy from "../assets/dummy";
import Item from "../components/MainPage/Item";
import { Link } from "react-router-dom";

const options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  level: 3, //지도의 레벨(확대, 축소 정도)
};

const MainContainer = styled.div`
  padding: 3rem 9vw;
  display: flex;
  justify-content: space-between;

  .map {
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
  const container = useRef(null);

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
    new window.kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
    return () => {};
  }, []);

  return (
    <MainContainer>
      <div className="map" ref={container}></div>

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
          {dummy.map((info,idx) => <Item key={idx} info={info}/>)}
          </ItemContainer>
        
      </div>
    </MainContainer>
  )
}