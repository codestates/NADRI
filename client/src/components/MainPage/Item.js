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
  /* border: 1px solid black; */
  border-radius: 10px;
  margin-bottom: 2rem;
  padding: 1rem;
  gap: 2rem;
  background-color: #fdfdff;
  box-shadow: 4px 4px 4px 1px rgba(180, 180, 180);

  /* .imgContainer{
    transition: transform 0.2s linear;
    transform: scale(1);
  } */

  /* &:hover {
    .imgContainer {
      transition: transform 0.2s linear;
      border: none;
      transform: scale(1.5);
    }
  } */

  @media (max-width: 992px) {
    height: 9rem;
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 0;
    overflow: hidden;
    height: 100%;
  }

  /* .imgBox {
    width: 7rem;
  } */
`

const ItemImg = styled.div`
  width: 7rem;
  height: 7rem;
  /* border: 1px solid black; */
  border-radius: 5px;

  transition: transform 0.2s linear;
  transform: scale(1);

  :hover {
    transition: transform 0.2s linear;
      border: none;
      transform: scale(1.5);
  }

  .img {
    width: 100%;
    height: 100%;
  }
  /* ${(props) => {
    return(`
      background-image: url(${props.img});
      background-repeat: no-repeat;
      background-position: center  center;
      background-size: contain;
    `)
  }} */

  @media (max-width: 767px) {
    width: 100%;
    height: 25vh;
    border: none;
    background-size: cover;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    .img {
    width: 95%;
    height: 95%;
  }
  }
`

const ItemInfo = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 767px) {
    width: 100%;
    align-items: center;
    margin-bottom: 0.5rem;
    gap: 0;
    height: auto;
  }

  .title {
    /* display: block; */
    height: 2rem;
    // display: flex;
    // align-items: center;
    /* border: 1px solid black; */
    border-radius: 5px;
    padding: 0.2rem 0.2rem;
    z-index: 4;
    color: black;
    width:100%;
    
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;

    /* white-space: nowrap;글자를 한줄로 모아준다 */
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-weight: bold;

    @media (max-width: 767px) {
      /* display: block; */
      width: 50vw;
      height: auto;
      border: none;
      text-align: center;
      font-size: 1.2rem;
      border-bottom: 2px solid rgb(206, 212, 218);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      padding-bottom: 0.2rem;
      line-height: 1.7;
    }
  }

  .desc {
    width: 100%;
    height: 4rem;
    border-radius: 5px;
    /* border: 1px solid black; */
    padding: 0.2rem 0.2rem;
    line-height: 1.3;
    color: black;

    /* white-space: nowrap; */
    overflow: hidden;
    text-overflow: ellipsis;
    
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    @media (max-width: 992px) {
      line-height: 1.1;
    }

    @media (max-width: 767px) {
      text-align: center;
      border:none;
      font-size: 1rem;
      width: 50vw;
      padding: 0.5rem;
      line-height: 1.2;
    }
  }

  .likes {
    display: flex;
    align-items: center;

    span {
      color: black;
    }
  }
`

export default function Item ({point}) {
  return (
    <StyledLink to={`/detail/${point.id}`} state={point} id="LinkContainer">
      <ItemContainer id="ItemContainer">
        {/* <div className="imgBox"> */}
        <ItemImg className="imgContainer">
        <img className="img" src={point.image[0]} onError={(e) => e.target.src = `/img/gitHubLogo.png`} />
        </ItemImg>
        {/* <ItemImg className="imgContainer" img={point.image[0]} onError={(e) => e.target.src = `/img/gitHubLogo.png`} /> */}
        {/* </div> */}

        <ItemInfo>
          <div className="title">{point ? point.title : null}</div>
          <div className="desc">{point ? point.content : null}</div>
          
          <div className="likes">
            <svg aria-label="좋아요 취소" color="#ed4956" fill="#ed4956" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
            &#xa0;
            <span>{point ? point.likes : null}</span>
          </div>
          
        </ItemInfo>
      </ItemContainer>
      </StyledLink>
      
      
  )
}