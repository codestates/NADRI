import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const ItemContainer = styled.div`
  height: 10rem;
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 3rem;
  padding: 1rem;
  gap: 2rem;

  & {
    .imgContainer{
      transition: transform 0.2s linear;
      transform: scale(1);
    }
  }

  &:hover {
    
    .imgContainer {
      transition: transform 0.2s linear;
      border: none;
      transform: scale(1.4);
    }
  }
`

const ItemImg = styled.img`
  width: 7rem;
  height: 7rem;
  border: 1px solid black;
  border-radius: 5px;
  
  ${(props) => {
    return (
      `
      background-image: url(${props.img});
      background-size: cover;
      `
    )
  }}
`

const ItemInfo = styled.div`
  width: 20rem;
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 0.2rem 0.2rem;
  }

  .desc {
    height: 4rem;
    width: 100%;
    border-radius: 5px;
    border: 1px solid black;
    padding: 0.2rem 0.2rem;
    line-height: 1.2;

    white-space: nowrap;
    overflow: hidden;
    white-space: normal;
    
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`

export default function Item ({point}) {
  return (
    <div>
      <Link to={`/detail/${point.id}`} state={point}>
      <ItemContainer>
        <ItemImg className="imgContainer" src={point.image[0]} onError={(e) => e.target.src = `/img/gitHubLogo.png`} ></ItemImg>

        <ItemInfo>
          <div className="title">{point ? point.title : null}</div>
          <div className="desc">{point ? point.content : null}</div>
        </ItemInfo>
      </ItemContainer>
      </Link>
    </div>
  )
}