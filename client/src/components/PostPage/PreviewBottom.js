import React, { useState } from "react";
import styled from "styled-components";
import PreviewBottomItem from "./PreviewBottomItem";

const RestImgContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  gap: 1rem;
`

export default function PreviewBottom({Img, picChange, removeImg}) {
  
  return (
    <RestImgContainer id="RestImgContainer">
      <PreviewBottomItem allImg={Img} img={[Img[0],Img[1]]} picChange={picChange} removeImg={removeImg} />
      <PreviewBottomItem allImg={Img} img={[Img[1],Img[2]]} picChange={picChange} removeImg={removeImg} />
      <PreviewBottomItem allImg={Img} img={[Img[2],Img[3]]} picChange={picChange} removeImg={removeImg} />
    </RestImgContainer>
  )
}