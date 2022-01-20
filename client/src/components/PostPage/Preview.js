import React, { Component } from "react";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

const PreviewImg = styled.div`
  width: 100%;
  height: 70%;
  // border: 1px solid black;
  box-shadow: 2px 2px 2px 1px rgb(180 180 180);
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  span {
    font-size: 1.5vw;
  }


  #delImg {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0.5rem;
    font-size: 2.5rem;
  }

  input[type='file'] {
    display: none;
  }
  
  background-image: url(/img/default-image.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  

  ${(props) => {
    let img;

    if(typeof props.Img[0] === 'string') {
      img = props.Img[0]
    }
    else if(typeof props.Img[0] === 'object') {
      img = props.Img[0][0]
    }
    
    if(props.Img[0] === undefined) {
      return(
      `
      span {
        font-size: 1.2vw;
        transition: font-size 0.3s;
      }
      &:hover {
        span {
          transition: font-size 0.3s;
          font-size: 1.5vw;
        }
      }
      &:active {
        span {
          transition: color 0.1s;
          color: white;
        }
      }
      `
      )
    } else {
      return (
        `
        cursor: grab;
        transition: all 0.3s;
        background-image: url(${img});
        background-size: contain;
        `
      )
    }
  }};

  input[type='file'] {
    display: none;
  }
`


export default function Preview ({Img, picChange, removeImg}) {
  const photoInput = useRef(null);
  const handleClick = () => {
    photoInput.current.click();
  }

  return (
    <>
    {
      Img[0] === undefined  ?
      <PreviewImg onClick={handleClick} Img={Img} >
        <span>클릭하여 사진을 추가해보세요!</span>
        <br />
        <span>최대 4장, 5mb까지 추가할 수 있습니다!</span>
        <input ref={photoInput} type="file" accept=".jpg, .jpeg, .png, .gif" multiple onChange={picChange} />
      </PreviewImg>
    :
      <PreviewImg Img={Img}><span id="delImg" onClick={(e) => removeImg(e, Img[0])}>&#10005;</span></PreviewImg>
    }
    </>
    
  )
}

