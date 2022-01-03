import React from "react";
import styled from "styled-components";



const ItemContainer = styled.div`
  height: 10rem;
  display: flex;
  border: 1px solid black;
  margin-bottom: 3rem;
  padding: 1rem;
  gap: 2rem;
`

const ItemImg = styled.div`
  width: 8rem;
  border: 1px solid black;
  > img {
    display: block;
    width: 100%;
    height: auto;
  }
`

const ItemInfo = styled.div`
  width: 20rem;
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    border: 1px solid black;
    margin-bottom: 1rem;
    padding: 0.2rem 0.2rem;
  }

  .desc {
    height: 5rem;
    border: 1px solid black;
    padding: 0.2rem 0.2rem;
  }
`

export default function Item ({info}) {
  return (
    <div>
      <ItemContainer>
        <ItemImg>
          <img src={`${info.img}`}></img>
        </ItemImg>

        <ItemInfo>
          <div className="title">{info.spotTitle}</div>
          <div className="desc">{info.spotDesc}</div>
        </ItemInfo>
      </ItemContainer>
    </div>
  )
}