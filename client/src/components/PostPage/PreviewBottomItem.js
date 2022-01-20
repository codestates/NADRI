import React from "react";
import styled from "styled-components";
import { useRef } from "react";

const PreviewImg = styled.div`
  width: 100%;
  height: 90%;
  // border: 1px solid black;
  box-shadow: 2px 2px 2px 1px rgb(180 180 180);
  border-radius: 10px;
  position: relative;

  img {
    display: none;
    width: 2.5rem;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    cursor: pointer;
  }
  background-image: url(/img/default-image.jpg);
  background-size: cover;
  ${(props) => {
    if(props.Img[0] && props.Img[1] === undefined) { // 자기 앞에 사진이 있고 자기 자리엔 사진이 없을 경우
      return (
        `
        transition: all 0.3s;
        img {
          display: block;
        }
        `
      )
    }
    else if(props.Img[0] && props.Img[1]) {
      let img;

    if(typeof props.Img[0] === 'string') {
      img = props.Img[1]
    }
    else if(typeof props.Img[0] === 'object') {
      img = props.Img[1][0]
    }
      return (
        `
        transition: all 0.3s;
        background-image: url(${img});
        background-size: contain;
        `
      )
    }
  }}
  background-repeat: no-repeat;
  background-position: center center;



  #inputBtn {
    display: none;
  }

  #inputIcon:active {
    border-radius: 50%;
    background-color: white;
  }

  #delBtn {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0.5rem;
    font-size: 2.5rem;
  }

  #inputBackground {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  @media (max-width: 767px) {

    #inputIcon {
      width: 25px;
      bottom: 5px;
      right: 5px;
    }

    #delBtn {
      right: 0px;
      font-size: 1.3rem;
    }
  }
`

export default function PreviewBottom ({allImg, img, picChange, removeImg}) {
  const photoInput = useRef();
  const handleClick = () => {
    photoInput.current.click();
  }

  return (
    <>
      {
        img[1] === undefined ?
        <PreviewImg Img={img} >
        <input id="inputBtn" ref={photoInput} type="file" accept="image/*" multiple onChange={picChange} />
        <input id="inputBtn" ref={photoInput} type="file" accept="image/*" multiple onChange={picChange} />
        <img id="inputIcon" src="/img/plus.svg" alt="" onClick={handleClick} />
        {
          img[0] ? <div id="inputBackground" onClick={handleClick}></div>
          : ''
        }
        </PreviewImg>
        :
        <PreviewImg Img={img}>
          <span id="delBtn" onClick={(e) => removeImg(e, img[1])}>&#10005;</span>
        </PreviewImg>
      }
    </>
  )
}