import React from "react";
import styled, {css, keyframes } from "styled-components";


export const RandingContainer = styled.div`
  display: flex;
  flex-direction: column;

  section:nth-child(2) {
    background-color: #F2F2F2;
  }

  section:nth-child(4) {
    background-color: #F2F2F2;
  }

  @media (max-width: 992px) {
    & section:nth-child(3) {
      & >:first-child {
        height: auto;
      }
    }
  }
`

export const Section = styled.section`
  width: 100%;
  height: ${(props) => {
    return(`
    ${props.initHeight}px
    `)
  }};
  
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 992px) {
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    &:nth-child(3) {
      flex-direction: column-reverse;
      justify-content: space-round;
    }
  }
`

export const ImgSection = styled.section`
  width: 100%;
  height: ${(props) => {
    return(`
    ${props.initHeight}px;
    `)
  }};
`

const move_Bus = keyframes`
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(100%);
  }
`

const showImgRight = keyframes`
  0% {
    transform: translate(200px, -200px);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
`

const showImgLeft = keyframes`
  0% {
    transform: translate(-200px, -200px);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
`

const disappear = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(200px, -200px);
    opacity: 0;
  }
`
// -------------------------------------------------------------- //

export const Section1_Left_Img = styled.div`
    width: 40%;
    height: 80%;
    background-image: url(Oauth.gif);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    transition: all 1s;
    box-shadow: -2px 2px 2px 2px rgb(180 180 180);
    border-radius: 15px;

  ${(props) => {
    const {curSection, sectionHeight, scrollY, initHeight} = props // 처음 내려올 때 애니메이션 실행, curSection이 0이면 초기화
    // console.log(scrollY + initHeight)
    // console.log(sectionHeight - (initHeight / 2))
    // console.log(scrollY + initHeight <= sectionHeight - (initHeight / 2))
    if(curSection !== 0) {
      return(css`
      animation-name: ${showImgRight};
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
      `)
    }
  }};

  @media (max-width: 992px) {
    height: 50%
  }
`

export const Section2_Right_Img = styled.div`
  width: 40%;
  height: 80%;
  background-image: url(Oauth.gif);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  transition: all 1s;
  box-shadow: -2px 2px 2px 2px rgb(180 180 180);
  border-radius: 15px;

  ${(props) => {
  const {curSection} = props

  if(curSection !== 1) {
    return(css`
    animation-name: ${showImgLeft};
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    `)
  }
  }};

  @media (max-width: 992px) {
    height: 50%;
    
  }
`

export const Section3_Left_Img = styled.div`
  width: 40%;
  height: 80%;
  background-image: url(Oauth.gif);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  transition: all 1s;
  box-shadow: -2px 2px 2px 2px rgb(180 180 180);
  border-radius: 15px;

  ${(props) => {
    const {curSection} = props
    if(curSection !== 2) {
      return(css`
      animation-name: ${showImgRight};
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
      `)
    }
  }};

  @media (max-width: 992px) {
    height: 50%
  }
`

export const Section_Right_Desc = styled.div`
  width: 50%;
  // height: 50%;
  // border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 2vw;
  }
`

export const Section_Left_Desc = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10%;
  // border: 1px solid black;

  p {
    font-size: 2vw;
  }

  span {
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 3px;
  }

  .Btn {
    width: 15vw;
    height: 4.5vw;
    border-radius: 20px;
    background-color: #88ccff;
    cursor: pointer;
    border: none;
    box-shadow: 2px 2px 2px 1px rgb(180 180 180);
    font-size: 2vw;
    a {
      color: white;
    }
  }

  .Btn:hover ~ img {
    // animation-name: ${move_Bus};
    // animation-duration: 1s;
    // animation-timing-function: ease-in-out;
    // animation-iteration-count: infinite;
    // animation-direction: alternate;
    position: relative;
    left: 100%;
  }

  .Btn:active {
    position: relative;
    top: 2px;
  }

  img {
    width: 15%;
    height: auto;
    transform: translate(-100%);
    transition: all 1.5s ease;
    position: relative;
    left: 0;
  }
`

export const LastImg = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => {
    return (`
      ${props.img}
    `)
  }});
  margin: 0 auto;
  width: 100%;
  height: 100%;
  ${(props) => {
    const {scrollY, initHeight, sectionHeight} = props
    // console.log(((scrollY-(sectionHeight[2]))/initHeight))
    if(scrollY >= sectionHeight[2]) { // 마지막 section에 왔을 때 효과 실행

      return (`
        width: ${((scrollY-(sectionHeight[2]))/initHeight)*100}%;
        height: ${((scrollY-(sectionHeight[2]))/initHeight)*100}%;
      `)
    }
  }};

  ${(props) => {
    const {scrollY, initHeight, sectionHeight} = props
    
    if(scrollY >= sectionHeight[4]) {
      return (`
        display: none;
      `)
    }

    if(scrollY >= sectionHeight[3]) {
      return (`
        width: 100%;
        height: 100%;
        position: fixed;
        bottom: 0;
      `)
    }
  }}
`

export const FinalImg = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url('/img/풍경.png');
  position: relative;

  ${(props) => {
    const {scrollY, initHeight, sectionHeight} = props

    if(scrollY >= sectionHeight[5]) {
      return (`
        position: fixed;
        top: 25%;
        left: 25%;
        width: 80%;
        height: 80%;
        display: none;
      `)
    }

    if(scrollY >= sectionHeight[4]) {
      // console.log((((scrollY-sectionHeight[4])/initHeight*0.5)*100)/2)
      return (`
        position: fixed;
        top: ${(((scrollY-sectionHeight[4])/initHeight*0.3)*100)/2}%; // 하 진짜 어지럽네
        left: ${(((scrollY-sectionHeight[4])/initHeight*0.3)*100)/2}%;
        width: ${100-(((scrollY-sectionHeight[4])/initHeight)*0.3)*100}%;
        height: ${100-(((scrollY-sectionHeight[4])/initHeight)*0.3)*100}%;
      `)
    }
  }}
`

export const TrickImg = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url('/img/풍경.png');
  ${(props) => {
    const {scrollY, initHeight, sectionHeight} = props
    if(scrollY >= sectionHeight[5]) {

      return(`
        width: 70%;
        height: 70%;
        display: block;
      `)
    }
  }}
`

export const TrickSection = styled.section`
  width: 100%;
  height: ${(props) => {
    return(`
    ${props.initHeight}px
    `)
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LastSection = styled.section`
  width: 100%;
  height: ${(props) => {
    return(`
    ${props.initHeight}px
    `)
  }};
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;

  button {
    width: 15vw;
    height: 4.5vw;
    font-size: 2vw;
    border-radius: 20px;
    background-color: #88ccff;
    cursor: pointer;
    border: none;
    color: white;
    box-shadow: 2px 2px 2px 1px rgb(180 180 180);
    a {
      color: white;
    }
  }

  button:hover ~ img {
    animation-name: ${move_Bus};
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  button:active {
    position: relative;
    top: 2px;
  }
`