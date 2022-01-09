import React from "react";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

const PreviewImg = styled.div`
  width: 100%;
  height: 30rem;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
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
  
  background-image: url(default-image.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  ${(props) => {
    if(props.Img[0] === undefined) {
      return(
      `
      transition: font-size 0.3s;
      font-size: 1.5rem;
      &:hover {
        transition: all 0.3s;
        font-size: 2rem;
        opacity: 0.5;
      }
      &:active {
        color: white;
      }
      `
      )
    } else {
      return (
        `
        cursor: grab;
        transition: all 0.3s;
        background-image: url(${props.Img[0]});
        background-size: contain;
        `
      )
    }
  }};

  input[type='file'] {
    display: none;
  }
`


export default function Preview ({Img, onChange, setPreviewImg, setUploadImg}) {
  const photoInput = useRef(null);
  const handleClick = () => {
    photoInput.current.click();
  }

  const delImg = () => {
    let newImgArr = []
    for(let i = 0; i < Img.length; i++) {
      newImgArr.push(Img[i])
    }
    newImgArr.shift()
    setPreviewImg(newImgArr)
    setUploadImg(newImgArr)
  }

  return (
    <>
    {
      Img[0] === undefined  ?
      <PreviewImg onClick={handleClick} Img={Img}>
        <span>클릭하여 사진을 추가해보세요!</span>
        <br />
        <span>사진은 최대 4장까지 추가할 수 있습니다!</span>
        <input ref={photoInput} type="file" accept="image/*" multiple onChange={onChange} />
      </PreviewImg>
    :
      <PreviewImg Img={Img}><span id="delImg" onClick={delImg}>&#10005;</span></PreviewImg>
    }
    </>
    
  )
}

