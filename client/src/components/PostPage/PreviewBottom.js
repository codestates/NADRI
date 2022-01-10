import React, { useState } from "react";
import styled from "styled-components";
import PreviewBottomItem from "./PreviewBottomItem";

const RestImgContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
`

export default function PreviewBottom({Img, onChange, setPreviewImg, setUploadImg}) {
  
  return (
    <RestImgContainer id="RestImgContainer">
      <PreviewBottomItem allImg={Img} img={[Img[0],Img[1]]} setPreviewImg={setPreviewImg} setUploadImg={setUploadImg} onChange={onChange}/>
      <PreviewBottomItem allImg={Img} img={[Img[1],Img[2]]} setPreviewImg={setPreviewImg} setUploadImg={setUploadImg} onChange={onChange}/>
      <PreviewBottomItem allImg={Img} img={[Img[2],Img[3]]} setPreviewImg={setPreviewImg} setUploadImg={setUploadImg} onChange={onChange}/>
    </RestImgContainer>
  )
}