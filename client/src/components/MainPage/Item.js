import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const StyledLink = styled(Link)`
  width: 100%;
  height: auto;

  @media (max-width: 992px) {
    width: 47%;
    height: 8em;
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 70%;
  }
`

const ItemContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 2rem;
  padding: 1rem;
  gap: 2rem;
  background-color: white;
  box-shadow: 4px 4px 4px 1px rgba(180, 180, 180);

  .imgContainer{
    transition: transform 0.2s linear;
    transform: scale(1);
  }

  &:hover {
    .imgContainer {
      transition: transform 0.2s linear;
      border: none;
      transform: scale(1.5);
    }
  }

  @media (max-width: 992px) {
    height: 100%;
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0;
    overflow: hidden;
  }
`

const ItemImg = styled.div`
  width: 7rem;
  height: 7rem;
  border: 1px solid black;
  border-radius: 5px;

  ${(props) => {
    return(`
      background-image: url(${props.img});
      background-repeat: no-repeat;
      background-position: center  center;
      background-size: contain;
    `)
  }}

  @media (max-width: 767px) {
    width: 100%;
    height: 150%;
    border: none;
    background-size: cover;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`

const ItemInfo = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  gap: 1rem;

  @media (max-width: 767px) {
    width: 100%;
    align-items: center;
  }

  .title {
    display: block;
    height: 2rem;
    // display: flex;
    // align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.2rem 0.2rem;
    z-index: 4;
    color: gray;

    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;/*글자를 한줄로 모아준다*/
    // display: -webkit-box;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;

    @media (max-width: 767px) {
      display: block;
      width: 300px;
      height: auto;
      border: none;
      text-align: center;
      font-size: 2rem;
      border-bottom: 2px solid rgb(206, 212, 218);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      padding-bottom: 1rem;
    }
  }

  .desc {
    width: 100%;
    height: 4rem;
    border-radius: 5px;
    border: 1px solid black;
    padding: 0.2rem 0.2rem;
    line-height: 1.2;
    color: gray;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    // display: -webkit-box;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;

    @media (max-width: 767px) {
      text-align: center;
      border:none;
      font-size: 1.5rem;
    }
  }
`

export default function Item ({point}) {
  return (
    <StyledLink to={`/detail/${point.id}`} state={point} id="LinkContainer">
      <ItemContainer id="ItemContainer">
        <ItemImg className="imgContainer" img={point.image[0]} onError={(e) => e.target.src = `/img/gitHubLogo.png`} ></ItemImg>

        <ItemInfo>
          <div className="title">{point ? point.title : null}</div>
          <div className="desc">{point ? point.content : null}</div>
        </ItemInfo>
      </ItemContainer>
      </StyledLink>
      
      
  )
}