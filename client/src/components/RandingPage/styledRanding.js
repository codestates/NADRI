import React from "react";
import styled, {css, keyframes } from "styled-components";


export const RandingContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Section = styled.section`
  width: 100vw;
  height: ${(props) => {
    return(`
    ${props.initHeight}px
    `)
  }};
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
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
export const Section0_Right_Img = styled.div`
      width: 50%;
      height: 50%;
      border: 1px solid black;
      background-image: url(/img/default-image.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
`

export const Section1_Left_Img = styled.div`
    width: 50%;
    height: 50%;
    border: 1px solid black;
    background-image: url(/img/default-image.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    transition: all 1s;

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
`

export const Section2_Right_Img = styled.div`
  width: 50%;
  height: 50%;
  border: 1px solid black;
  background-image: url(/img/default-image.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  transition: all 1s;

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
`

export const Section3_Left_Img = styled.div`
  width: 50%;
  height: 50%;
  border: 1px solid black;
  background-image: url(/img/default-image.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  transition: all 1s;

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
`

export const Section_Right_Desc = styled.div`
  width: 50%;
  height: 50%;
  border: 1px solid black;
  p {
    font-size: 2vw;
  }
`

export const Section_Left_Desc = styled.div`
  border: 1px solid black;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20%;

  p {
    font-size: 2vw;
  }

  button {
    width: 20%;
    height: 10%;
    border: 1px solid black;
    border-radius: 20px;
    background-color: white;
    transition: all 1s;
  }

  button:hover {
    transition: all 1s;
    background-color: blue;
    color: white;
  }

  button:hover ~ img {
    animation-name: ${move_Bus};
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  img {
    width: 15%;
    height: auto;
    transform: translate(-100%);
  }
`