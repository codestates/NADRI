import React from "react";
import styled, { keyframes } from "styled-components";

const move_Bus = keyframes`
  0% {
    transform: translate(-100%);
  }
  100% {
    transform: translate(100%);
  }
`

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

export const Section_Right_Img = styled.div`
  width: 50%;
  height: 50%;
  border: 1px solid black;
  background-image: url(/img/default-image.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

export const Section_Left_Img = styled.div`
      width: 50%;
      height: 50%;
      border: 1px solid black;
      background-image: url(/img/default-image.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      transform: translate(100px, -200px);
      transition: all 1s;
      opacity: 0;
  ${(props) => {
    const {curSection} = props
    if(curSection === 1) {
      return(`
      width: 50%;
      height: 50%;
      border: 1px solid black;
      background-image: url(/img/default-image.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      transform: translate(0, 0);
      transition: all 1s;
      opacity: 1;
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